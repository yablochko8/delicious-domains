export const ModalTemplate = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-neutral-content">
        {children}
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
