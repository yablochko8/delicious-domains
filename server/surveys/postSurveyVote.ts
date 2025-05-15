import { SurveyVoteRequest } from "shared/types";
import { dbClient } from "../dbCreators/dbClient";

const addVoteToDb = async (vote: SurveyVoteRequest) => {
  await dbClient.domainSurvey.update({
    where: { publicId: vote.surveyId },
    data: { votes: { create: { domain: vote.domain, rating: vote.rating } } },
  });
};

export const postSurveyVote = async (
  vote: SurveyVoteRequest
): Promise<boolean> => {
  await addVoteToDb(vote);
  return true;
};
