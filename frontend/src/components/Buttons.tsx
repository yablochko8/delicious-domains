import { ActionIcons } from "../assets/Icons";
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
    <>
      <button className="btn btn-outline hidden md:block" onClick={handleClick}>
        start again
      </button>
      <button className="btn btn-outline btn-square md:hidden text-2xl" onClick={handleClick}>
        {ActionIcons.startAgain}
      </button>
    </>
  );
};

export const RefineInputsButton = () => {
  const { isRefining, setIsRefining } = useDisplayStateStore();

  const handleClick = () => {
    setIsRefining(!isRefining);
    // window.scrollTo(0, 0);
  };

  const handleClickMobile = () => {
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
      <button className="btn btn-outline btn-square md:hidden text-2xl" onClick={handleClickMobile}>
        {ActionIcons.editInputs}
      </button>
    </>
  );
};


export const ExportSavedButton = () => {
  const { liked } = useSearchStateStore();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Liked domains copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy domains to clipboard:', err);
        alert('Failed to copy domains to clipboard. Please try again.');
      });
  };

  const handleClickDesktop = () => {
    if (liked.length === 0) return;
    const likedDomainsText = liked.join('\n');
    copyToClipboard(likedDomainsText);
  };

  const handleClickMobile = () => {
    if (liked.length === 0) return;
    const likedDomainsText = liked.join('\n');

    if (navigator.share) {
      navigator.share({
        title: 'My Liked Domains',
        text: likedDomainsText
      })
        .catch(err => {
          console.error('Error sharing domains:', err);
          // Fallback to clipboard if sharing fails
          navigator.clipboard.writeText(likedDomainsText)
            .then(() => {
              alert('Liked domains copied to clipboard!');
            })
            .catch(clipErr => {
              console.error('Failed to copy domains to clipboard:', clipErr);
              alert('Failed to share domains. Please try again.');
            });
        });
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard(likedDomainsText);
    }
  };

  return (
    <>
      <button className="btn btn-secondary hidden md:block" onClick={handleClickDesktop} title="Copy to clipboard">
        copy
      </button>
      <button className="btn btn-outline btn-square md:hidden text-2xl" onClick={handleClickMobile} title="Share">
        {ActionIcons.share}
      </button>
    </>
  );
};

