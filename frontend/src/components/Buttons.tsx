import { ActionIcons } from "../assets/Icons";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { useSearchStateStore } from "../stores/searchStateStore";
import { openModal } from "../utils/openModal";
import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { useExport } from "../hooks/useExport";

export const AddDomainsButton = () => {
  const { isLoading, generateDomains, isDisabled } = useDomainGeneration();
  const { longlist } = useSearchStateStore();
  const cta = longlist.length > 0 ? "add more ideas" : "generate domain ideas";

  return (
    <button
      className="btn btn-primary"
      onClick={generateDomains}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <span className="loading loading-spinner"></span> :
        <>
          <div className="flex flex-row w-full justify-between gap-2 items-center">
            <div className="text-xl">{ActionIcons.generate}</div>
            {cta}
          </div>
        </>
      }
    </button>
  );
};


export const ClearAllButton = () => {
  const { clearAll } = useSearchStateStore();

  const handleClick = () => {
    clearAll();
    window.scrollTo(0, 0);
  };

  const cta = "start again";

  return (
    <>
      {/* Desktop version */}
      <button
        className="btn btn-outline hidden md:block"
        onClick={handleClick}
        title={cta}>
        {cta}
      </button>

      {/* Mobile version */}
      <button
        className="btn btn-outline btn-square md:hidden text-2xl"
        onClick={handleClick}
        title={cta}>
        {ActionIcons.startAgain}
      </button>
    </>
  );
};

export const EditInputsButton = () => {
  const { isRefining, setIsRefining } = useDisplayStateStore();

  const handleClick = () => {
    setIsRefining(!isRefining);
    // Scroll the main content area to the top
    // TODO: Make this more robust and not dependent on a tailwind class
    document.querySelector('.overflow-y-auto')?.scrollTo(0, 0);
  };

  const handleClickMobile = () => {
    setIsRefining(!isRefining);
    openModal(`refine-modal`);
  };

  const cta = "edit inputs";
  return (
    <>
      {/* Desktop version */}
      <button
        className="btn btn-outline hidden md:block"
        onClick={handleClick}
        title={cta}>
        {cta}
      </button>

      {/* Mobile version */}
      <button
        className="btn btn-outline btn-square md:hidden text-2xl"
        onClick={handleClickMobile}
        title={cta}>
        {ActionIcons.editInputs}
      </button>
    </>
  );
};

export const ExportSavedButton = () => {
  const { handleDesktopExport, handleMobileExport } = useExport();
  return (
    <>
      {/* Desktop version */}
      <button
        className="btn btn-secondary hidden md:block"
        onClick={handleDesktopExport}
        title="Copy to clipboard">
        <div className="flex flex-row w-full justify-between gap-2 items-center">
          <div className="text-xl">{ActionIcons.export}</div>
          export
        </div>
      </button>

      {/* Mobile version */}
      <button
        className="btn btn-outline btn-square md:hidden text-2xl"
        onClick={handleMobileExport}
        title="Share">
        {ActionIcons.share}
      </button>
    </>
  );
};


export const AboutButton = () => {
  const handleClick = () => {
    openModal(`what-is-this-modal`);
  }
  return (
    <button className="btn btn-shadow btn-circle text-xl" onClick={handleClick}>
      {ActionIcons.about}
    </button>
  );
};