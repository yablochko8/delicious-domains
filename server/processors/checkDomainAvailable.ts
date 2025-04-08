// Example response:
// {"status":[{"domain":"fmoaceioacmedafdoajcdioa.com","zone":"com","status":"undelegated inactive"}]}
// All statuses: https://domainr.com/docs/api/v2/status

import { DomainAssessment } from "shared/types";
import { validTlds } from "../tlds";

export const getDomainStatusParallel = async (
  domains: string[],
  delayMs: number = 100
): Promise<DomainAssessment[]> => {
  const resultsPromise = await Promise.allSettled(
    domains.map(async (domain, index) => {
      // Add a small delay for each request
      await new Promise((resolve) => setTimeout(resolve, index * delayMs));
      try {
        const status = await getDomainStatus(domain);
        return status;
      } catch (error) {
        return {
          domain,
          isPossible: false,
          isAvailable: false,
          isCheap: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    })
  );

  const results = resultsPromise
    .map((resultPromise) => {
      if (resultPromise.status === "fulfilled") {
        return resultPromise.value;
      }
      return {
        domain: "something.com",
        isPossible: false,
        isAvailable: false,
        isCheap: false,
        error:
          resultPromise.reason instanceof Error
            ? resultPromise.reason.message
            : "Unknown error",
      };
    })
    .filter(Boolean);

  return results;
};

export const getDomainStatus = async (
  domain: string
): Promise<DomainAssessment> => {
  console.log("Checking domain availability for:", domain);

  const tld = domain.split(".")[1];

  const defaultResult: DomainAssessment = {
    domain,
    isPossible: true,
    isAvailable: false,
    isCheap: false,
    status: "Unknown",
  };

  if (!validTlds.includes(tld.toUpperCase())) {
    return {
      ...defaultResult,
      isPossible: false,
      status: "Custom status: TLD not included on long list.",
    };
  }

  const url = `https://domainr.p.rapidapi.com/v2/status?domain=${domain}`;
  const apiKey = process.env.DOMAINR_RAPIDAPI_KEY || "API_KEY_NOT_FOUND";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "domainr.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const domainrStatus = data.status[0].status;

    const impossibleTags = [
      "unknown",
      "disallowed",
      "reserved",
      "dpml",
      "invalid",
      "suffix",
      "zone",
      "tld",
    ];
    const impossibleTagFound = impossibleTags.some((tag) =>
      domainrStatus.includes(tag)
    );

    // if domainrStatus includes "inactive" then it SHOULD BE available for registration
    const inactiveTagFound = domainrStatus.includes("inactive");

    // Some registries sell a subset of their domains as "premium" e.g. with special tiered pricing.
    // Anything referencing an aftermarket implies the same.
    const premiumTags = [
      "premium",
      "marketed",
      "priced",
      "parked",
      "transferable",
    ];
    const premiumTagFound = premiumTags.some((tag) =>
      domainrStatus.includes(tag)
    );

    return {
      ...defaultResult,
      isPossible: !impossibleTagFound,
      isAvailable: inactiveTagFound,
      isCheap: !premiumTagFound,
      status: `Domainr status: ${domainrStatus}`,
    };
  } catch (error) {
    return {
      ...defaultResult,
      isPossible: false,
      status: "Custom status: Error fetching domain status.",
    };
  }
};
