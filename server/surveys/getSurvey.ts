import { Survey } from "shared/types";
import { dbClient } from "../dbCreators/dbClient";

const calcSurvey = (rawData: {
  publicId: string;
  votes: { domain: string; rating: number }[];
}): Survey => {
  // First, group votes by domain and calculate totals
  const domainStats = rawData.votes.reduce((acc, vote) => {
    if (!acc[vote.domain]) {
      acc[vote.domain] = { totalRating: 0, voteCount: 0 };
    }
    acc[vote.domain].totalRating += vote.rating;
    acc[vote.domain].voteCount += 1;
    return acc;
  }, {} as Record<string, { totalRating: number; voteCount: number }>);

  // Convert to the expected Survey format
  const results = Object.entries(domainStats).map(([domain, stats]) => ({
    domain,
    averageRating:
      stats.voteCount > 0 ? stats.totalRating / stats.voteCount : 0,
    voteCount: stats.voteCount,
  }));

  return {
    surveyId: rawData.publicId,
    results,
  };
};

export const getSurvey = async (surveyId: string): Promise<Survey> => {
  const dbSurveyRawData = await dbClient.domainSurvey.findUnique({
    where: {
      publicId: surveyId,
    },
    include: {
      votes: true,
    },
  });

  if (!dbSurveyRawData) {
    throw new Error("Survey not found");
  }

  const survey = calcSurvey(dbSurveyRawData);
  return survey;
};
