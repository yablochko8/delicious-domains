import { ActionIcons } from "../assets/Icons";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { useSearchStateStore } from "../stores/searchStateStore";
import { openModal } from "../utils/openModal";
import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { useExport } from "../hooks/useExport";
import { trackEventSafe } from "../utils/plausible";
import { CREATE_SURVEY_MODAL_ID } from "../modals/CreateSurveyModal";
import { useLocation } from "react-router";
import React from "react";

export const AddDomainsButton = ({
  isPrimary = true,
}: {
  isPrimary?: boolean;
}) => {
  const { isLoading, generateDomains, isDisabled } = useDomainGeneration();
  const { domains } = useSearchStateStore();
  const cta = domains.length > 0 ? "Generate More" : "Generate";

  return (
    <button
      className={`pill-button ${isPrimary ? "primary-action-button" : "secondary-action-button"
        }`}
      onClick={generateDomains}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <div className="flex flex-row gap-2 items-center">
            {ActionIcons.generate}
            {cta}
          </div>
        </>
      )}
    </button>
  );
};

export const ClearAllButton = () => {
  const { clearAll } = useSearchStateStore();

  const handleClick = () => {
    trackEventSafe("ClickRestart");
    clearAll();
    window.scrollTo(0, 0);
  };

  // Currently this is only displayed on the About modal
  const cta = "New Domain Search";

  return (
    <button
      className="pill-button primary-action-button"
      onClick={handleClick}
      title={cta}
    >
      {ActionIcons.startAgain}
      {cta}
    </button>
  );
};

export const EditInputsButtonRevised = () => {
  const { isRefining, setIsRefining } = useDisplayStateStore();

  const handleClickShared = () => {
    trackEventSafe("ClickEdit");
    setIsRefining(!isRefining);
  };
  const handleClickDesktop = () => {
    handleClickShared();
    // Scroll the main content area to the top
    // TODO: Make this more robust and not dependent on a tailwind class
    window.scrollTo(0, 0);
  };

  const handleClickMobile = () => {
    handleClickShared();
    openModal(`refine-modal`);
  };

  const cta = "Edit Inputs";

  const sharedStyles = "pill-button secondary-action-button";
  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex">
        <button
          className={`${sharedStyles}`}
          onClick={handleClickDesktop}
          title={cta}
        >
          {ActionIcons.editInputs}
          {cta}
        </button>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <button
          className={`${sharedStyles}`}
          onClick={handleClickMobile}
          title={cta}
        >
          {ActionIcons.editInputs}
          {cta}
        </button>
      </div>
    </>
  );
};

export const ExportSavedButton = () => {
  const { handleDesktopExport, handleMobileExport } = useExport();

  const sharedStyles = "pill-button secondary-action-button";

  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex">
        <button
          className={`${sharedStyles}`}
          onClick={handleDesktopExport}
          title="Copy to clipboard"
        >
          {ActionIcons.export}
          Export
        </button>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <button
          className={`${sharedStyles} md:hidden`}
          onClick={handleMobileExport}
          title="Share"
        >
          {ActionIcons.share} Export
        </button>
      </div>
    </>
  );
};
export const CreateSurveyButton = () => {
  const handleClick = () => {
    trackEventSafe("CreateSurveyStart");
    openModal(CREATE_SURVEY_MODAL_ID);
  };
  return (
    <button className="pill-button primary-action-button" onClick={handleClick}>
      {ActionIcons.export} Create Survey
    </button>
  );
};

export const EnterButton = () => {
  const { isLoading, generateDomains, isDisabled } = useDomainGeneration();

  return (
    <button
      aria-label="Submit"
      className="circle-button primary-action-button"
      onClick={generateDomains}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>{ActionIcons.enter}</>
      )}
    </button>
  );
};


/** Shares the current page as a link  */
export const ShareSurveyButton = () => {
  const { pathname } = useLocation();
  const url = `${window.location.origin}${pathname}`;
  const [copied, setCopied] = React.useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      trackEventSafe("ClickShareSurvey");
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      className="pill-button secondary-action-button"
      onClick={handleClick}
      title={copied ? "Copied!" : "Copy link to clipboard"}
    >
      {ActionIcons.share} {copied ? "Copied!" : "Share Survey"}
    </button>
  );
};