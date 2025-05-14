import { useLocation } from "react-router";
import {
  ABOUT_TEXT_A,
  ABOUT_TEXT_B,
  ABOUT_TEXT_C,
} from "../components/HomepageInfo";
import { Socials } from "../components/Socials";
import { ModalTemplate } from "./ModalTemplate";

export const ABOUT_MODAL_ID = "about-modal";

export const AboutModal = () => {
  const { pathname } = useLocation();
  const isOnSurveyPage = pathname.startsWith("/survey/");

  return (
    <ModalTemplate
      id={ABOUT_MODAL_ID}
      showFeedbackButton={true}
      showClearAllButton={isOnSurveyPage}
    >
      <div className="flex flex-col gap-4 text-sm text-justify text-about">
        <p className="text-lg font-bold text-left">{ABOUT_TEXT_A}</p>
        <p>{ABOUT_TEXT_B}</p>
        <p>{ABOUT_TEXT_C}</p>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex flex-row gap-2 border-t pt-2 border-neutral/40 items-center text-sm">
            Get in touch with the site creator:
            <Socials />
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
