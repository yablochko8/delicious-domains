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

/** Not used in app, useful for debugging */
app.get("/heartbeat", async (_req, res) => {
  console.log("GET /heartbeat endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.post("/domain-longlist", async (req, res) => {
  const userInput = req.body.userInput;
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
  const domainWithStatus = await getDomainStatus(domain);
  const domainAssessment = await addScoresToDomain(domainWithStatus);
  res.json({ domainAssessment });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
