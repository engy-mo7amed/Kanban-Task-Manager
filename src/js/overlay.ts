const overlay = document.getElementById("overlay") as HTMLDivElement;
export const closeOverlay = (): void => {
  overlay.classList.replace("flex", "hidden");
};

export const openOverlay = (): void => {
  overlay.classList.replace("hidden", "flex");
};

export function displayOverlay(): void {
  const closeBtn = document.getElementById("closeBtn") as HTMLButtonElement;
  const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
  const addBtn = document.getElementById("addBtn") as HTMLButtonElement;

  addBtn.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", closeOverlay);
  cancelBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e: MouseEvent): void => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
}
