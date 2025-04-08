import { useSearchStateStore } from "../stores/searchStateStore";

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
