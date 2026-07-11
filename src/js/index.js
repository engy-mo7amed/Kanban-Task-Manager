import { displayBox } from "./displaybox.js";
import { displayProgress } from "./displayProgress.js";
import { addBox } from "./getValues.js";
import { closeOverlay, displayOverlay } from "./overlay.js";
import "./actions.js";
import { displayComplete } from "./displayComplete.js";
import { validateForm } from "./validation.js";
(function () {
    displayOverlay();
    displayBox();
    displayProgress();
    displayComplete();
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const isEditMode = !document
            .getElementById("saveBtn")
            ?.classList.contains("hidden");
        if (isEditMode)
            return;
        if (!validateForm())
            return;
        closeOverlay();
        addBox();
        displayBox();
        displayProgress();
        displayComplete();
        Toastify({
            text: "Task added successfully!",
            duration: 2500,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #059669, #10b981)",
            },
        }).showToast();
    });
    setInterval(() => {
        displayBox();
        displayProgress();
        displayComplete();
    }, 60000);
    const descriptionArea = document.getElementById("description");
    const textareaCountSpan = document.getElementById("textareaCount");
    function updateCharCount() {
        if (descriptionArea && textareaCountSpan) {
            const currentLength = descriptionArea.value.length;
            textareaCountSpan.textContent = currentLength.toString();
        }
    }
    descriptionArea?.addEventListener("input", updateCharCount);
})();
