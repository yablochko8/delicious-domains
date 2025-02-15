import express from "express";
import cors from "cors";
import { getDomainLongList } from "./processors/getDomainLongList";
import { checkDomainAvailable } from "./processors/checkDomainAvailable";
import { validTlds } from "./tlds";

export const PORT = 4101;

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
    userInput.preferredTlds
  );

  // Limit the number of domains to process
  const MAX_DOMAINS = 50;
  const domainsToCheck = domains.slice(0, MAX_DOMAINS);

  const validDomains = [];
  for (const domain of domainsToCheck) {
    try {
      const isAvailable = await checkDomainAvailable(domain);
      if (isAvailable) {
        validDomains.push(domain);
      }
    } catch (error) {
      console.error(`Error checking domain ${domain}:`, error);
      continue;
    }
  }
  res.json({
    domains: validDomains,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
