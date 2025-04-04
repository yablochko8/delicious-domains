// Example response:
// {"status":[{"domain":"fmoaceioacmedafdoajcdioa.com","zone":"com","status":"undelegated inactive","summary":"inactive"}]}
// All statuses: https://domainr.com/docs/api/v2/status

import { validTlds } from "../tlds";

export const checkDomainsAvailableParallel = async (
  domains: string[],
  delayMs: number = 100
): Promise<string[]> => {
  const results = await Promise.all(
    domains.map(async (domain, index) => {
      // Add a small delay for each request
      await new Promise((resolve) => setTimeout(resolve, index * delayMs));
      return checkDomainAvailable(domain);
    })
  );

  // Just return the domains that are available
  return domains.filter((domain, index) => results[index]);
};

export const checkDomainAvailable = async (
  domain: string
): Promise<boolean> => {
  console.log("Checking domain availability for:", domain);
  const tld = domain.split(".")[1];
  if (!validTlds.includes(tld.toUpperCase())) {
    return false;
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
  console.log(apiKey);
  console.log(url);
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    // If the status is "undelegated inactive", then the domain is available
    const data = JSON.parse(result);
    const status = data.status[0].status;
    return status === "undelegated inactive";
  } catch (error) {
    console.error(error);
    return false;
  }
};

// await checkDomainAvailable("google.com");

// await checkDomainAvailable("fmoaceioacmedafdoajcdioa.com");
