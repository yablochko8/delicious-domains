import Plausible from "plausible-tracker";

// const plausible = Plausible({
//   domain: "dreamy.domains",
// });

const { trackEvent } = Plausible();

type PlausibleEvent =
  | "ClickGenerate"
  | "ClickAbout"
  | "ClickRestart"
  | "ClickEdit"
  | "ClickReject"
  | "ClickLike"
  | "ClickRegister";

// Define a mapping from event name to its props (if any)
type PlausibleEventProps = {
  ClickGenerate: undefined;
  ClickAbout: undefined;
  ClickRestart: undefined;
  ClickEdit: undefined;
  ClickReject: { domain: string };
  ClickLike: { domain: string };
  ClickRegister: { domain: string };
};

// Utility function to trigger events (type-safe)
export const trackEventSafe = <K extends PlausibleEvent>(
  event: K,
  props?: PlausibleEventProps[K]
) => {
  trackEvent(event, props ? { props } : undefined);
};
