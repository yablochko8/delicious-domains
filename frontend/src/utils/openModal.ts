export const openModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};

export const closeModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};
