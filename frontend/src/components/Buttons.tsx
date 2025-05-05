import { ActionIcons } from "../assets/Icons";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { useSearchStateStore } from "../stores/searchStateStore";
import { openModal } from "../utils/openModal";
import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { useExport } from "../hooks/useExport";
import { trackEventSafe } from "../utils/plausible";

export const AddDomainsButton = () => {
  const { isLoading, generateDomains, isDisabled } = useDomainGeneration();
  const { longlist } = useSearchStateStore();
  const cta = longlist.length > 0 ? "Generate More" : "Generate";

  return (
    <button
      className="pill-button primary-action-button"
      onClick={generateDomains}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <div className="flex flex-row w-full justify-between gap-2 items-center">
            <div className="text-xl">{ActionIcons.generate}</div>
            {cta}
          </div>
        </>
      )}
    </button>
  );
};

export const ClearAllButtonRevised = () => {
  const { clearAll } = useSearchStateStore();

  const handleClick = () => {
    trackEventSafe("ClickRestart");
    clearAll();
    window.scrollTo(0, 0);
  };

  const cta = "Start Again";

  return (
    <button
      className="pill-button secondary-action-button"
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

  const sharedStyles = "btn btn-secondary btn-sm rounded-xl";

  return (
    <>
      {/* Desktop version */}
      <button
        className={`${sharedStyles} hidden md:flex`}
        onClick={handleDesktopExport}
        title="Copy to clipboard"
      >
        <div className="flex flex-row w-full justify-between gap-2 items-center">
          <div className="text-xl">{ActionIcons.export}</div>
          Export
        </div>
      </button>

      {/* Mobile version */}
      <button
        className={`${sharedStyles} md:hidden`}
        onClick={handleMobileExport}
        title="Share"
      >
        {ActionIcons.share} Export
      </button>
    </>
  );
};

export const AboutButton = () => {
  const handleClick = () => {
    trackEventSafe("ClickAbout");
    openModal(`about-modal`);
  };
  return (
    <button className="subtle-topnav cursor-pointer " onClick={handleClick}>
      About
    </button>
  );
};

export const EnterButton = () => {
  const { isLoading, generateDomains, isDisabled } = useDomainGeneration();

  return (
    <button
      aria-label="Submit"
      className="btn btn-circle h-7 w-7 text-sm bg-[#B5C7FE] text-white border shadow-none border-none"
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
