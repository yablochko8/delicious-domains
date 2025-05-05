import { useSearchStateStore } from "../stores/searchStateStore";
import { WEBSITE_NAME } from "../config";
import { AboutButton } from "./Buttons";
import { trackEventSafe } from "../utils/plausible";

export const TopNav = () => {
  const { clearAll } = useSearchStateStore();

  const handleRestartClick = () => {
    trackEventSafe("ClickRestart");
    clearAll();
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-row justify-between p-4">
      <div
        className="subtle-topnav cursor-pointer"
        onClick={handleRestartClick}
      >
        {WEBSITE_NAME}
      </div>
      <AboutButton />
    </div>
  );
};
