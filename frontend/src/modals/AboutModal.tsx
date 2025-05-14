import {
  ABOUT_TEXT_A,
  ABOUT_TEXT_B,
  ABOUT_TEXT_C,
} from "../components/HomepageInfo";
import { Socials } from "../components/Socials";
import { ModalTemplate } from "./ModalTemplate";

export const ABOUT_MODAL_ID = "about-modal";

export const AboutModal = () => {
  return (
    <ModalTemplate id={ABOUT_MODAL_ID}>
      <div className="flex flex-col gap-4 text-sm text-justify text-about">
        <p className="text-lg font-bold text-left">{ABOUT_TEXT_A}</p>
        <p>{ABOUT_TEXT_B}</p>
        <p>{ABOUT_TEXT_C}</p>

        <div className="flex flex-col gap-2 text-xs">
          <div className="flex flex-row gap-2 border-t pt-2 border-neutral/40 items-center text-sm">
            Get in touch with the site creator:
            <Socials />
          </div>
          <div className="flex flex-row items-center text-sm">
            or...
            <a
              href="https://airtable.com/appsNMKNh2267ygc4/shrvsd0gMivg4DbBN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Feedback"
            >
              send anonymous feedback
            </a>
            .
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
