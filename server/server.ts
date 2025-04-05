import express from "express";
import cors from "cors";
import { getDomainLongList } from "./processors/getDomainLongList";
import {
  checkDomainAvailable,
  checkDomainsAvailableParallel,
} from "./processors/checkDomainAvailable";
import { validTlds } from "./tlds";

export const PORT = 4101;

const MAX_DOMAINS_PER_CALL = 5;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/heartbeat", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/tlds/all", async (req, res) => {
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
    MAX_DOMAINS_PER_CALL,
    userInput.preferredTlds
  );

  // Limit the number of domains to process
  const MAX_DOMAINS = 50;
  const domainsToCheck = domains.slice(0, MAX_DOMAINS);

  const validDomains = await checkDomainsAvailableParallel(domainsToCheck);
  res.json({
    domains: validDomains,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
