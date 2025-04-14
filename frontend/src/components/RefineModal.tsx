import { InputForm } from "./InputForm";

export const RefineModal = () => {
    return (
        <dialog
            id={`refine-modal`}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box">
                <InputForm />
                <div className="modal-action justify-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Back</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Add</button>
            </form>
        </dialog>
    );
};
