import { Link, useParams } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSurvey } from "../serverCalls";
import { Survey } from "shared/types";
import { ActionIcons } from "../assets/Icons";
import { useVoteStore } from "../stores/voteStateStore";

const StarRating = ({
  rating,
  onRate,
  isSubmitting,
}: {
  rating: number;
  onRate: (rating: number) => void;
  isSubmitting: boolean;
}) => {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Rate this domain">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          disabled={isSubmitting}
          className="text-3xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
          role="radio"
          aria-checked={star === rating}
          aria-label={`${star} stars`}
          tabIndex={0}
        >
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
};

export const SurveyPage = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const { voteQueue, failedVotes, isSubmitting, addVote } = useVoteStore();

  // Memoize shuffled domains to prevent unnecessary re-shuffling
  const shuffledDomains = useMemo(() => {
    if (!survey) return [];
    return [...survey.results.map((r) => r.domain)].sort(
      () => Math.random() - 0.5
    );
  }, [survey]);

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
        const errorMessage =
          err instanceof Error
            ? `Failed to load survey: ${err.message}`
            : "Failed to load survey. Please try again later.";
        setError(errorMessage);
        console.error("Error fetching survey:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  const handleVote = async (rating: number) => {
    if (!surveyId || !shuffledDomains[currentIndex]) return;

    const vote = {
      surveyId,
      domain: shuffledDomains[currentIndex],
      rating,
    };

    // Add vote to queue using the store
    addVote(vote);

    // Move to next domain immediately
    if (currentIndex < shuffledDomains.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setHasVoted(true);
    }
  };

  const handleVoteAgain = () => {
    setCurrentIndex(0);
    setHasVoted(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
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
          aria-label="Try loading the survey again"
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
            aria-label="Vote on the domains again"
          >
            {ActionIcons.back}
            Vote Again
          </button>
          <Link
            to={`/survey/${surveyId}/results`}
            className="pill-button primary-action-button flex items-center gap-2"
            aria-label="View survey results"
          >
            See Results
            {ActionIcons.enter}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[100dvh] space-y-6 px-4 py-8">
      <div className="flex justify-between items-center">
        <h2>Help choose a domain name!</h2>
        <div className="text-gray-500" aria-live="polite">
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
          <div className="text-3xl font-bold text-center break-all text-base-content">
            {shuffledDomains[currentIndex]}
          </div>
          <p className="text-gray-500 text-center">
            How do you rate this domain?
          </p>
          <StarRating
            rating={0}
            onRate={handleVote}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      </AnimatePresence>
      {voteQueue.length > 0 && (
        <div className="text-sm text-gray-500">
          Submitting {voteQueue.length} vote{voteQueue.length !== 1 ? 's' : ''}...
        </div>
      )}
      {failedVotes.length > 0 && (
        <div className="text-sm text-red-500">
          {failedVotes.length} vote{failedVotes.length !== 1 ? 's' : ''} failed to submit
        </div>
      )}
    </div>
  );
};
