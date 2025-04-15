import { useDisplayStateStore } from "../stores/displayStateStore";
import { useSearchStateStore } from "../stores/searchStateStore";

export const AddDomainsButton = ({
  onClick,
  isLoading,
  isDisabled,
}: {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}) => {
  const { longlist } = useSearchStateStore();


  const cta = longlist.length > 0 ? "generate more" : "generate domain ideas";
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : cta}
    </button>
  );
};

export const VibeButton = ({
  vibe,
  onClick,
}: {
  vibe: string;
  onClick: (vibe: string) => void;
}) => {
  return (
    <button
      className="btn btn-xs btn-outline btn-info"
      onClick={() => onClick(vibe)}
    >
      {vibe}
    </button>
  );
};

export const ClearAllButton = () => {
  const { clearAll } = useSearchStateStore();

  const handleClick = () => {
    clearAll();
    window.scrollTo(0, 0);
  };
  return (
    <button className="btn btn-outline" onClick={handleClick}>
      start again
    </button>
  );
};

export const RefineInputsButton = () => {
  const { isRefining, setIsRefining } = useDisplayStateStore();

  const handleClick = () => {
    setIsRefining(!isRefining);
    // window.scrollTo(0, 0);
  };

  const handleMobileClick = () => {
    setIsRefining(!isRefining);
    const refineModal = document.getElementById(
      `refine-modal`
    ) as HTMLDialogElement;
    if (refineModal) {
      refineModal.showModal();
    }
  };

  return (
    <>
      <button className="btn btn-outline hidden md:block" onClick={handleClick}>
        edit inputs
      </button>
      <button className="btn btn-outline md:hidden" onClick={handleMobileClick}>
        edit inputs
      </button>
    </>
  );
};


export const ExportSavedButton = () => {
  const { liked } = useSearchStateStore();
  const handleExport = () => {
    if (liked.length === 0) return;

    const likedDomainsText = liked.join('\n');
    navigator.clipboard.writeText(likedDomainsText)
      .then(() => {
        alert('Liked domains copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy domains to clipboard:', err);
        alert('Failed to copy domains to clipboard. Please try again.');
      });
  };
  return (
    <button className="btn btn-secondary" onClick={handleExport}>export</button>
  );
};

