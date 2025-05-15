import Plausible from "plausible-tracker";

const { trackEvent } = Plausible();

type PlausibleEvent =
  | "ClickGenerate"
  | "ClickAbout"
  | "ClickRestart"
  | "ClickEdit"
  | "ClickReject"
  | "ClickLike"
  | "ClickRegister"
  | "ClickExport"
  | "CreateSurveyStart"
  | "CreateSurveyComplete";

// Define a mapping from event name to its props (if any)
type PlausibleEventProps = {
  ClickGenerate: undefined;
  ClickAbout: undefined;
  ClickRestart: undefined;
  ClickEdit: undefined;
  ClickReject: { domain: string };
  ClickLike: { domain: string };
  ClickRegister: { domain: string };
  ClickExport: { domainCount: number };
  CreateSurveyStart: undefined;
  CreateSurveyComplete: undefined;
};

// Utility function to trigger events (type-safe)
export const trackEventSafe = <K extends PlausibleEvent>(
  event: K,
  props?: PlausibleEventProps[K]
) => {
  trackEvent(event, props ? { props } : undefined);
};
