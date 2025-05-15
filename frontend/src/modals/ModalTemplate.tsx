import { ClearAllButton } from "../components/Buttons";

export const ModalTemplate = ({
  id,
  children,
  showFeedbackButton = false,
  showClearAllButton = false,
}: {
  id: string;
  children: React.ReactNode;
  showFeedbackButton?: boolean;
  showClearAllButton?: boolean;
}) => {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-neutral-content">
        {children}
        <div className="modal-action justify-center">
          <form method="dialog">
            <div className="flex flex-row gap-2">
              {/* if there is a button in form, it will close the modal */}
              {showClearAllButton && <ClearAllButton />}
              <button className="pill-button tertiary-action-button">
                Back
              </button>
              {showFeedbackButton && (
                <a
                  className="pill-button tertiary-action-button"
                  href="https://airtable.com/appsNMKNh2267ygc4/shrvsd0gMivg4DbBN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Feedback"
                >
                  Feedback Form
                </a>
              )}
            </div>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};
