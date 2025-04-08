import { useSearchStateStore } from "../stores/searchStateStore";

export const AddDomainsButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => {
  const { longlist } = useSearchStateStore();

  const cta = longlist.length > 0 ? "add more domains" : "see domain ideas";
  return (
    <button
      className="btn btn-primary w-[200px]"
      onClick={onClick}
      disabled={isLoading}
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
    <button className="btn btn-outline btn-info" onClick={handleClick}>
      Clear All
    </button>
  );
};
