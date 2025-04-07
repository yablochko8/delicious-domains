import express from "express";
import cors from "cors";
import { getDomainLongList } from "./processors/getDomainLongList";
import { getDomainStatusParallel } from "./processors/checkDomainAvailable";
import { validTlds } from "./tlds";
import { addScoresToDomain } from "processors/assessDomain";

export const PORT = 4101;

const MAX_DOMAINS = 20;

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
    userInput.preferredTlds
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
