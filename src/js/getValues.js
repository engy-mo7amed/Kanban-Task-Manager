export const titleInput = document.getElementById("title");
export const priorityInput = document.getElementById("priority");
export const dateInput = document.getElementById("date");
export const descriptionInput = document.getElementById("description");
const storedData = localStorage.getItem("listContainer");
export let list = storedData ? JSON.parse(storedData) : [];
export function addBox() {
    const values = {
        id: Date.now(),
        title: titleInput.value.trim(),
        priority: priorityInput.value.trim(),
        date: dateInput.value.trim(),
        description: descriptionInput.value.trim(),
        createdAt: Date.now(),
        status: "todo",
    };
    list.push(values);
    localStorage.setItem("listContainer", JSON.stringify(list));
    clearForm();
}
export function clearForm() {
    titleInput.value = "";
    priorityInput.value = "Medium";
    dateInput.value = "";
    descriptionInput.value = "";
}
