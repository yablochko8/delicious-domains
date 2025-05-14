import { useSearchStateStore } from "../stores/searchStateStore";
import { WEBSITE_NAME } from "../config";
import { trackEventSafe } from "../utils/plausible";
import { openModal } from "../utils/openModal";
import { useInputStateStore } from "../stores/inputStateStore";
import { useNavigate } from "react-router";
import { ABOUT_MODAL_ID } from "../modals/AboutModal";

const AboutButton = () => {
  const handleClick = () => {
    trackEventSafe("ClickAbout");
    openModal(ABOUT_MODAL_ID);
  };
  return (
    <button
      className="subtle-topnav cursor-pointer hover:bg-gray-100/20 rounded-md p-2"
      onClick={handleClick}
    >
      About
    </button>
  );
};

export const TopNav = () => {
  const { clearAll } = useSearchStateStore();
  const { clearAllInputs } = useInputStateStore();
  const navigate = useNavigate();
  const handleRestartClick = () => {
    trackEventSafe("ClickRestart");
    clearAll();
    clearAllInputs();
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between p-4">
      <div
        className="flex flex-row items-center gap-2 subtle-topnav cursor-pointer hover:bg-gray-100/20 rounded-md p-2"
        onClick={handleRestartClick}
      >
        <img src="/logo-transparent.png" alt="logo" className="w-6 h-6" />
        {WEBSITE_NAME}
      </div>
      <AboutButton />
    </div>
  );
};
