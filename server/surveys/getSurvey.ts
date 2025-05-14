import { sampleSurvey } from "dbCreators/createSurvey";
import { Survey } from "shared/types";

export const getSurvey = async (surveyId: string): Promise<Survey> => {
  // TODO insert logic here
  console.log(surveyId);
  return sampleSurvey;
};
