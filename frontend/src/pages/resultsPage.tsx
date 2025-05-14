import { Link, useParams } from "react-router";

export const ResultsPage = () => {
  const { surveyId } = useParams();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-4 px-4">
      <h1>Results</h1>
      <h2>{surveyId}</h2>
      <div>
        <button>
          <Link
            className="pill-button primary-action-button"
            to={`/survey/${surveyId}`}
          >
            Back
          </Link>
        </button>
      </div>
    </div>
  );
};
