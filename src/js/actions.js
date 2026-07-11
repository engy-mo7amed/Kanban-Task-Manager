import { clearForm, dateInput, descriptionInput, list, priorityInput, titleInput, } from "./getValues.js";
import { closeOverlay, openOverlay } from "./overlay.js";
import { displayBox } from "./displaybox.js";
import { displayProgress } from "./displayProgress.js";
import { displayComplete } from "./displayComplete.js";
import { validateForm, resetValidation } from "./validation.js";
function refreshAll() {
    displayBox();
    displayProgress();
    displayComplete();
}
/////////////////delete ////////////////
function deleteBox(id) {
    const index = list.findIndex((item) => item.id === id);
    if (index === -1)
        return;
    list.splice(index, 1);
    localStorage.setItem("listContainer", JSON.stringify(list));
    refreshAll();
}
window.deleteBox = deleteBox;
///////////////set& update Box//////////////////
let currentId;
function setBox(id) {
    const item = list.find((item) => item.id === id);
    if (!item)
        return;
    currentId = id;
    openOverlay();
    resetValidation();
    titleInput.value = item.title;
    priorityInput.value = item.priority;
    dateInput.value = item.date;
    descriptionInput.value = item.description;
    document.getElementById("saveBtn")?.classList.replace("hidden", "flex");
    document.getElementById("submitBtn")?.classList.replace("flex", "hidden");
}
window.setBox = setBox;
function updateBox() {
    const index = list.findIndex((item) => item.id === currentId);
    if (index === -1)
        return;
    const values = {
        id: currentId,
        title: titleInput.value.trim(),
        priority: priorityInput.value.trim(),
        date: dateInput.value.trim(),
        description: descriptionInput.value.trim(),
        createdAt: list[index].createdAt,
        status: list[index].status,
    };
    list.splice(index, 1, values);
    localStorage.setItem("listContainer", JSON.stringify(list));
    refreshAll();
    clearForm();
    document.getElementById("saveBtn")?.classList.replace("flex", "hidden");
    document.getElementById("submitBtn")?.classList.replace("hidden", "flex");
    Toastify({
        text: "Task updated successfully!",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #059669, #10b981)",
        },
    }).showToast();
}
window.updateBox = updateBox;
///////////////move between columns//////////////////
function moveToProgress(id) {
    const item = list.find((item) => item.id === id);
    if (!item)
        return;
    item.status = "progress";
    localStorage.setItem("listContainer", JSON.stringify(list));
    refreshAll();
}
window.moveToProgress = moveToProgress;
function moveToTodo(id) {
    const item = list.find((item) => item.id === id);
    if (!item)
        return;
    item.status = "todo";
    localStorage.setItem("listContainer", JSON.stringify(list));
    refreshAll();
}
window.moveToTodo = moveToTodo;
function moveToComplete(id) {
    const item = list.find((item) => item.id === id);
    if (!item)
        return;
    item.status = "complete";
    localStorage.setItem("listContainer", JSON.stringify(list));
    refreshAll();
}
window.moveToComplete = moveToComplete;
document.getElementById("saveBtn")?.addEventListener("click", () => {
    if (!validateForm())
        return;
    updateBox();
    resetValidation();
    closeOverlay();
});
