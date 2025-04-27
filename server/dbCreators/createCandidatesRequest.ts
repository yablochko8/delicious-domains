import { CandidatesRequest } from "shared/types";
import { dbClient } from "./dbClient";

export const createCandidatesRequest = async (
  candidatesRequest: CandidatesRequest
) => {
  const newCandidatesRequest = await dbClient.candidatesRequest.create({
    data: candidatesRequest,
  });
  return newCandidatesRequest;
};
