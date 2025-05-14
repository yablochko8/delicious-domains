const CreateSurveyModalContents = () => {
  return (
    <div>
      <h1>Create Survey</h1>
    </div>
  );
};

export const CreateSurveyModal = () => {
  return (
    <dialog id={`about-modal`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-neutral-content">
        <CreateSurveyModalContents />
        <div className="modal-action justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="pill-button tertiary-action-button">back</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};
