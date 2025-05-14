import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSurvey, postSurveyVote } from "../serverCalls";
import { Survey, SurveyVoteRequest } from "shared/types";
import { ActionIcons } from "../assets/Icons";

const StarRating = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (rating: number) => void;
}) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className="text-3xl transition-transform hover:scale-110"
        >
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
};

export const SurveyPage = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledDomains, setShuffledDomains] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

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
        // Shuffle domains
        const domains = result.results.map((r) => r.domain);
        setShuffledDomains(domains.sort(() => Math.random() - 0.5));
      } catch (err) {
        setError("Failed to load survey. Please try again later.");
        console.error("Error fetching survey:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleVote = async (rating: number) => {
    if (!surveyId || !shuffledDomains[currentIndex]) return;

    try {
      const vote: SurveyVoteRequest = {
        surveyId,
        domain: shuffledDomains[currentIndex],
        rating,
      };

      await postSurveyVote(vote);

      if (currentIndex < shuffledDomains.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setHasVoted(true);
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      setError("Failed to submit vote. Please try again.");
    }
  };

  const handleVoteAgain = () => {
    setShuffledDomains((prev) => prev.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setHasVoted(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading survey...</p>
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

  if (hasVoted) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center space-y-6">
        <h1 className="text-2xl font-bold text-center">Thanks for voting!</h1>
        <div className="flex gap-4">
          <button
            onClick={handleVoteAgain}
            className="pill-button secondary-action-button flex items-center gap-2"
          >
            {ActionIcons.enter}
            Vote Again
          </button>
          <Link
            to={`/survey/${surveyId}/results`}
            className="pill-button primary-action-button flex items-center gap-2"
          >
            {ActionIcons.enter}
            See Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-6 px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Help me choose a domain name!</h1>
        <div className="text-gray-500">
          {currentIndex + 1} of {shuffledDomains.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-center break-all">
            {shuffledDomains[currentIndex]}
          </h2>
          <p className="text-gray-500 text-center">
            How do you rate this domain?
          </p>
          <StarRating rating={0} onRate={handleVote} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
