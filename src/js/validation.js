import { titleInput, dateInput } from "./getValues.js";
const titleError = document.getElementById("title-error");
const dateError = document.getElementById("date-error");
function setInvalid(el, invalid) {
    if (invalid) {
        el.classList.remove("border-slate-300");
        el.classList.add("border-red-500");
    }
    else {
        el.classList.remove("border-red-500");
        el.classList.add("border-slate-300");
    }
}
export function validateTitle() {
    const isValid = titleInput.value.trim().length >= 3;
    titleError.classList.toggle("hidden", isValid);
    setInvalid(titleInput, !isValid);
    return isValid;
}
export function validateDate() {
    if (!dateInput.value) {
        dateError.classList.add("hidden");
        setInvalid(dateInput, false);
        return true;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(0, 0, 0, 0);
    const isValid = selectedDate.getTime() >= today.getTime();
    dateError.classList.toggle("hidden", isValid);
    setInvalid(dateInput, !isValid);
    return isValid;
}
export function validateForm() {
    const isTitleValid = validateTitle();
    const isDateValid = validateDate();
    return isTitleValid && isDateValid;
}
export function resetValidation() {
    titleError.classList.add("hidden");
    dateError.classList.add("hidden");
    setInvalid(titleInput, false);
    setInvalid(dateInput, false);
}
