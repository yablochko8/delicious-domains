import express from "express";
import cors from "cors";
import { getDomainCandidates } from "./processors/getDomainCandidates";
import {
  getDomainAssessment,
  turnAssessmentIntoWithStatus,
} from "./processors/checkDomainAvailable";
import { addScoresToDomain } from "./processors/assessDomain";
import { CandidatesRequest, SurveyVoteRequest } from "shared/types";
import { createCandidatesRequest } from "dbCreators/createCandidatesRequest";
import { createSurvey } from "./dbCreators/createSurvey";
import { postSurveyVote } from "./surveys/postSurveyVote";
import { getSurvey } from "./surveys/getSurvey";

export const PORT = 4101;

const MAX_DOMAINS = 15;

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
  const domainWithStatus = await getDomainAssessment(domain);
  const domainAssessment = await addScoresToDomain(domainWithStatus);
  res.json({ domainAssessment });
});

app.post("/domain-with-status", async (req, res) => {
  const domain = req.body.domain;
  const domainAssessmentOnly = await getDomainAssessment(domain);
  const domainAssessmentWithScores = await addScoresToDomain(
    domainAssessmentOnly
  );
  const domainWithStatus = turnAssessmentIntoWithStatus(
    domainAssessmentWithScores
  );
  res.json({ domainWithStatus });
});

app.post("/survey-create", async (req, res) => {
  const { options } = req.body as { options: string[] };
  const survey = await createSurvey(options);
  res.json({ survey });
});

app.post("/survey-vote", async (req, res) => {
  const vote = req.body as SurveyVoteRequest;
  const success = await postSurveyVote(vote);
  res.json({ success });
});

app.get("/survey/:surveyId", async (req, res) => {
  const { surveyId } = req.params;
  console.log("GET /survey/:surveyId endpoint called for surveyId", surveyId);
  const survey = await getSurvey(surveyId);
  console.log("Survey fetched successfully:", survey);
  res.json({ survey });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
