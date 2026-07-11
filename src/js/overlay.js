const overlay = document.getElementById("overlay");
export const closeOverlay = () => {
    overlay.classList.replace("flex", "hidden");
};
export const openOverlay = () => {
    overlay.classList.replace("hidden", "flex");
};
export function displayOverlay() {
    const closeBtn = document.getElementById("closeBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const addBtn = document.getElementById("addBtn");
    addBtn.addEventListener("click", openOverlay);
    closeBtn.addEventListener("click", closeOverlay);
    cancelBtn.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });
}
