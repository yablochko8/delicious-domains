import { Survey } from "shared/types";

export const sampleSurvey: Survey = {
  surveyId: "HWX912",
  results: [
    {
      domain: "google.com",
      averageRating: 2.5,
      voteCount: 3,
    },
    {
      domain: "facebook.com",
      averageRating: 0,
      voteCount: 0,
    },
  ],
};

/** Creates a new survey id, adds  */
export const createSurvey = async (domains: string[]): Promise<Survey> => {
  // TODO insert logic here
  console.log(domains);
  return sampleSurvey;
};
