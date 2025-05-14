import { SurveyVoteRequest } from "shared/types";

export const postSurveyVote = async (
  vote: SurveyVoteRequest
): Promise<boolean> => {
  console.log(vote);
  return true;
};
