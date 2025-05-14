import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSurvey } from "../serverCalls";
import { Survey } from "shared/types";
import { ActionIcons } from "../assets/Icons";

export const ResultsPage = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!surveyId) {
        setError("Survey ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await getSurvey(surveyId);
        setSurvey(result);
      } catch (err) {
        setError("Failed to load survey results. Please try again later.");
        console.error("Error fetching survey:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="pill-button primary-action-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center">
        <p className="text-gray-600">No survey results found.</p>
      </div>
    );
  }

  // Sort results by average rating in descending order
  const sortedResults = [...survey.results].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-6 px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Survey Results</h1>
        <Link
          className="pill-button secondary-action-button flex items-center gap-2"
          to={`/survey/${surveyId}`}
        >
          {ActionIcons.enter}
          Back to Survey
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {sortedResults.map((result, index) => (
            <div
              key={result.domain}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-500 w-8">
                  #{index + 1}
                </span>
                <span className="text-lg font-medium">{result.domain}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <span className="font-semibold">
                    {result.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Votes:</span>
                  <span className="font-semibold">{result.voteCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Survey ID: {survey.surveyId}
      </div>
    </div>
  );
};
