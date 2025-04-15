import { WhatIsThisContents } from "./WhatIsThis";


export const WhatIsThisModal = () => {
    return (
        <dialog
            id={`what-is-this-modal`}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box">
                <WhatIsThisContents />
                <div className="modal-action justify-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline">back</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Add</button>
            </form>
        </dialog>
    );
};
