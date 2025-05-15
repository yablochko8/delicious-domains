import { Survey } from "shared/types";
import { dbClient } from "./dbClient";

// export const sampleSurvey: Survey = {
//   surveyId: "HWX912",
//   results: [
//     {
//       domain: "google.com",
//       averageRating: 2.5,
//       voteCount: 3,
//     },
//     {
//       domain: "facebook.com",
//       averageRating: 0,
//       voteCount: 0,
//     },
//   ],
// };

/** Creates a pretty survey id that serves as a public slug*/
const getUniqueSurveyId = (length: number = 5) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const charsLength = chars.length;
  const result = [];
  const randomValues = new Uint8Array(length);

  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    const index = randomValues[i] % charsLength;
    result.push(chars.charAt(index));
  }

  return result.join("");
};

/** Creates a new survey id, adds  */
export const createSurvey = async (domains: string[]): Promise<Survey> => {
  const publicId = getUniqueSurveyId();
  console.log({ surveyId: publicId });

  const dbSurvey = await dbClient.domainSurvey.create({
    data: {
      publicId,
      domains,
    },
  });

  const newSurvey = {
    surveyId: dbSurvey.publicId,
    results: domains.map((domain) => ({
      domain,
      averageRating: 0,
      voteCount: 0,
    })),
  };

  return newSurvey;
};
