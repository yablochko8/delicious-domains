import express from "express";
import cors from "cors";
import { getDomainCandidates } from "./processors/getDomainCandidates";
import { getDomainStatus } from "./processors/checkDomainAvailable";
import { addScoresToDomain } from "./processors/assessDomain";
import { CandidatesRequest } from "shared/types";
import { createCandidatesRequest } from "dbCreators/createCandidatesRequest";

export const PORT = 4101;

const MAX_DOMAINS = 5;

const app = express();

app.use(express.json());
app.use(cors());

/** Not used in app, useful for debugging */
app.get("/heartbeat", async (_req, res) => {
  console.log("GET /heartbeat endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.post("/domain-candidates", async (req, res) => {
  const userInput: CandidatesRequest = req.body.userInput;
  const domains = await getDomainCandidates({
    ...userInput,
    targetQuantity: MAX_DOMAINS,
  });

  // Do NOT await this, fire and forget
  createCandidatesRequest(userInput).catch((err) => {
    console.error("Failed to create candidates request:", err);
  });

  res.json({ domains });
});

app.post("/domain-assessment", async (req, res) => {
  const domain = req.body.domain;
  const domainWithStatus = await getDomainStatus(domain);
  const domainAssessment = await addScoresToDomain(domainWithStatus);
  res.json({ domainAssessment });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
