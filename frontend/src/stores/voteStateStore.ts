import { create } from "zustand";
import { SurveyVoteRequest } from "shared/types";
import { postSurveyVote } from "../serverCalls";

export type VoteState = {
  voteQueue: SurveyVoteRequest[];
  failedVotes: SurveyVoteRequest[];
  isSubmitting: boolean;
  error: string | null;
  addVote: (vote: SurveyVoteRequest) => void;
  processQueue: () => Promise<void>;
  retryFailedVote: (vote: SurveyVoteRequest) => void;
  clearError: () => void;
};

export const useVoteStore = create<VoteState>((set, get) => ({
  // Initial state
  voteQueue: [],
  failedVotes: [],
  isSubmitting: false,
  error: null,

  // Actions
  addVote: (vote: SurveyVoteRequest) => {
    set((state) => ({
      voteQueue: [...state.voteQueue, vote],
    }));
    // Trigger queue processing
    get().processQueue();
  },

  processQueue: async () => {
    const state = get();
    if (state.voteQueue.length === 0 || state.isSubmitting) return;

    try {
      set({ isSubmitting: true, error: null });
      const currentVote = state.voteQueue[0];

      await postSurveyVote(currentVote);

      // Remove the processed vote from the queue
      set((state) => ({
        voteQueue: state.voteQueue.slice(1),
        isSubmitting: false,
      }));

      // Process next vote if any
      if (get().voteQueue.length > 0) {
        get().processQueue();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit vote";
      console.error("Error submitting vote:", err);

      // Move failed vote to failedVotes array
      set((state) => ({
        failedVotes: [...state.failedVotes, state.voteQueue[0]],
        voteQueue: state.voteQueue.slice(1),
        isSubmitting: false,
        error: errorMessage,
      }));
    }
  },

  retryFailedVote: (vote: SurveyVoteRequest) => {
    set((state) => ({
      failedVotes: state.failedVotes.filter((v) => v !== vote),
      voteQueue: [...state.voteQueue, vote],
    }));
    get().processQueue();
  },

  clearError: () => set({ error: null }),
}));
