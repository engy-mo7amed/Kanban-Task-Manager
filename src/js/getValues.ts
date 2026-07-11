export const titleInput = document.getElementById("title") as HTMLInputElement;
export const priorityInput = document.getElementById(
  "priority",
) as HTMLSelectElement;
export const dateInput = document.getElementById("date") as HTMLInputElement;
export const descriptionInput = document.getElementById(
  "description",
) as HTMLTextAreaElement;

export interface Value {
  id: number;
  title: string;
  priority: string;
  date: string;
  description: string;
  createdAt: number;
  status: "todo" | "progress" | "complete";
}
const storedData = localStorage.getItem("listContainer");
export let list: Value[] = storedData ? JSON.parse(storedData) : [];

export function addBox(): void {
  const values: Value = {
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

export function clearForm(): void {
  titleInput.value = "";
  priorityInput.value = "Medium";
  dateInput.value = "";
  descriptionInput.value = "";
}
