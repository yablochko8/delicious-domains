import { Link, useParams } from "react-router";

export const SurveyPage = () => {
  const { surveyId } = useParams();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-4 px-4">
      <h1>Help me choose a domain name!</h1>
      <h2>{surveyId}</h2>
      <div>
        <button>
          <Link
            className="pill-button primary-action-button"
            to={`/survey/${surveyId}/results`}
          >
            Results
          </Link>
        </button>
      </div>
    </div>
  );
};
