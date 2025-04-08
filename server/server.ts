import express from "express";
import cors from "cors";
import { getDomainLongList } from "./processors/getDomainLongList";
import {
  getDomainStatus,
  getDomainStatusParallel,
} from "./processors/checkDomainAvailable";
import { validTlds } from "./tlds";
import { addScoresToDomain } from "processors/assessDomain";

export const PORT = 4101;

const MAX_DOMAINS = 10;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/heartbeat", async (_req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/limits", async (_req, res) => {
  console.log("/limits GET endpoint called.");
  res.json({ maxDomains: MAX_DOMAINS });
});

app.get("/tlds/all", async (_req, res) => {
  res.json({ tlds: validTlds });
});

/**
 * @deprecated
 */
app.post("/find-domains", async (req, res) => {
  const userInput = req.body.userInput;
  console.log("User input:", userInput);
  const domains = await getDomainLongList(
    userInput.purpose,
    userInput.vibe,
    userInput.shortlist,
    userInput.theme,
    userInput.model,
    MAX_DOMAINS,
    userInput.preferredTlds,
    userInput.feedback
  );

  // Limit the number of domains to process
  const domainsToCheck = domains.slice(0, MAX_DOMAINS);

  const domainsBeforeScores = await getDomainStatusParallel(domainsToCheck);
  const domainsAfterScores = await Promise.all(
    domainsBeforeScores.map((domain) => addScoresToDomain(domain))
  );

  res.json({
    domainAssessments: domainsAfterScores,
  });
});

app.post("/domain-longlist", async (req, res) => {
  const userInput = req.body.userInput;
  console.log("User input:", userInput);
  const domains = await getDomainLongList(
    userInput.purpose,
    userInput.vibe,
    userInput.shortlist,
    userInput.theme,
    userInput.model,
    MAX_DOMAINS,
    userInput.preferredTlds,
    userInput.feedback
  );

  res.json({ domains });
});

app.post("/domain-assessment", async (req, res) => {
  const domain = req.body.domain;
  console.log("Domain:", domain);
  const domainWithStatus = await getDomainStatus(domain);
  const domainAssessment = await addScoresToDomain(domainWithStatus);
  res.json({ domainAssessment });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
