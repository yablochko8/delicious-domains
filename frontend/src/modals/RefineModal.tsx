import { InputForm } from "../components/InputForm";
import { AddDomainsButton } from "../components/Buttons";

export const RefineModal = () => {
  return (
    <dialog id={`refine-modal`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <InputForm whiteBackground={true} />
        <div className="modal-action justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <AddDomainsButton />
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};
