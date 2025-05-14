import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createSurvey } from "../serverCalls";
import { ActionIcons } from "../assets/Icons";
import { ModalTemplate } from "./ModalTemplate";

const MAX_OPTIONS = 10;
export const CREATE_SURVEY_MODAL_ID = "create-survey-modal";

export const CreateSurveyModal = () => {
  const navigate = useNavigate();
  const [domains, setDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  // Load liked domains from localStorage or your state management
  useEffect(() => {
    const likedDomains = JSON.parse(
      localStorage.getItem("likedDomains") || "[]"
    );
    setDomains(likedDomains);
  }, []);

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;

    if (domains.length >= MAX_OPTIONS) {
      setError(`Maximum ${MAX_OPTIONS} options allowed`);
      return;
    }

    if (domains.includes(newDomain.trim())) {
      setError("This domain is already in the list");
      return;
    }

    setDomains((prev) => [...prev, newDomain.trim()]);
    setNewDomain("");
    setError(null);
  };

  const handleRemoveDomain = (domainToRemove: string) => {
    setDomains((prev) => prev.filter((d) => d !== domainToRemove));
  };

  const handleSubmit = async () => {
    if (domains.length === 0) {
      setError("Please add at least one domain");
      return;
    }

    if (!hasAcceptedDisclaimer) {
      setError("Please accept the disclaimer");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const survey = await createSurvey(domains);
      navigate(`/survey/${survey.surveyId}`);
    } catch (err) {
      setError("Failed to create survey. Please try again.");
      console.error("Error creating survey:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalTemplate id={CREATE_SURVEY_MODAL_ID}>
      <div className="flex flex-col space-y-6 p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Create Survey</h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddDomain()}
              placeholder="Add a domain (e.g., example.com)"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting || domains.length >= MAX_OPTIONS}
            />
            <button
              onClick={handleAddDomain}
              disabled={isSubmitting || domains.length >= MAX_OPTIONS}
              className="pill-button primary-action-button"
            >
              Add
            </button>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="space-y-2">
            {domains.map((domain) => (
              <div
                key={domain}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{domain}</span>
                <button
                  onClick={() => handleRemoveDomain(domain)}
                  disabled={isSubmitting}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${domain}`}
                >
                  {ActionIcons.reject}
                </button>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-500">
            {domains.length} of {MAX_OPTIONS} options
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h2 className="font-semibold">Important Information</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              These domains are not reserved, only share the survey link with
              people you trust.
            </li>
            <li>Respondents will be able to see the survey results.</li>
            <li>Surveys are accessible for 7 days.</li>
          </ul>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasAcceptedDisclaimer}
              onChange={(e) => setHasAcceptedDisclaimer(e.target.checked)}
              className="rounded focus:ring-primary"
            />
            <span className="text-sm">
              I understand and agree to these terms
            </span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || domains.length === 0 || !hasAcceptedDisclaimer
          }
          className="pill-button primary-action-button w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating Survey...
            </>
          ) : (
            <>
              {ActionIcons.enter}
              Create Survey
            </>
          )}
        </button>
      </div>
    </ModalTemplate>
  );
};
