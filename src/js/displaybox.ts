import { list } from "./getValues.js";

const ToDo = document.getElementById("ToDo") as HTMLElement;

function formatTimeAgo(createdAt: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - createdAt) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

function getDueStatus(date: string): string {
  const today = new Date();
  const taskDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);
  const diffTime = taskDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  if (diffDays === 0) return "overdue";
  else if (diffDays <= 2) return "dueSoon";
  return "";
}

export function displayBox() {
  const todoList = list.filter((item) => item.status === "todo");

  if (todoList.length === 0) {
    ToDo.innerHTML = `
      <div class="py-12 flex flex-col items-center justify-center text-slate-400">
          <i class="fa-solid fa-folder-open text-4xl mb-3 opacity-50"></i>
          <p class="text-sm">No tasks yet</p>
          <p class="text-xs mt-1">Click + to add one</p>
      </div>`;
    return;
  }

  let box = "";
  for (let i = 0; i < todoList.length; i++) {
    const item = todoList[i];
    const status = getDueStatus(item.date);
    let formattedDate = "";
    if (item.date) {
      const taskDate = new Date(item.date);
      formattedDate = taskDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    const timeAgoText = formatTimeAgo(item.createdAt);

    box += `
    <div
              class="group relative w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 my-2"
            >
              <div
                class="absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <button onclick="setBox(${item.id})"
                  class="w-7 h-7 rounded-md hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-pencil text-xs"></i>
                </button>
                <button onclick="deleteBox(${item.id})"
                  class="w-7 h-7 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>

              <div
                class="flex items-center gap-2 text-slate-400 text-sm font-medium"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>#00${i + 1}</span>
              </div>

              <div class="mt-3">
                <h3 class="text-slate-950 font-semibold tracking-wide pr-16">
                  ${item.title}
                </h3>
                <p class="text-slate-500 text-sm mt-1">${item.description ? item.description : ""}</p>
              </div>

              <div class="flex flex-wrap gap-2 mt-4">
                ${
                  item.priority === "High"
                    ? `
                    <span class="inline-flex items-center gap-1.5 bg-red-50 text-red-600 font-semibold text-[10px] uppercase px-3 py-1.5 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    High Priority
                    </span>
                    `
                    : ""
                }
                ${
                  item.priority === "Medium"
                    ? `
                <span
                  class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 font-semibold text-[10px] uppercase px-3 py-1.5 rounded-full"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Medium
                </span>`
                    : ""
                }
                ${
                  item.priority === "Low"
                    ? `
                <span
                  class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 font-semibold text-[10px] uppercase px-3 py-1.5 rounded-full"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Low
                </span> `
                    : ""
                }
                 ${
                   status === "dueSoon"
                     ? `<span class="inline-flex items-center bg-orange-50 text-orange-600 text-[10px] font-semibold uppercase px-3 py-1.5 rounded-full">
                            Due Soon</span> `
                     : status === "overdue"
                       ? `<span class="inline-flex items-center bg-red-50 text-red-600 text-[10px] font-semibold uppercase px-3 py-1.5 rounded-full">
                            <i class="fa-solid fa-triangle-exclamation"></i> Overdue </span>`
                       : ""
                 } </div>

              <div class="flex items-center gap-4 mt-4 text-xs">
                ${
                  formattedDate
                    ? `<div class="flex items-center gap-1.5 text-orange-500">
                  <i class="fa-regular fa-calendar"></i>
                  <span>${formattedDate}</span>
                </div>`
                    : ""
                }
                <div class="flex items-center gap-1.5 text-slate-400">
                  <i class="fa-regular fa-clock"></i>
                  <span>${timeAgoText}</span>
                </div>
              </div>

              <hr class="border-slate-100 my-4" />

              <div class="flex flex-wrap gap-2">
                <button onclick="moveToProgress(${item.id})"
                  class="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 hover:scale-110 ease-in text-amber-800 font-semibold px-3 py-2 rounded-lg transition-all text-[11px]"
                >
                  <i class="fa-solid fa-play"></i>
                  Start
                </button>
                <button onclick="moveToComplete(${item.id})"
                  class="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 hover:scale-110 ease-in text-emerald-800 font-semibold px-3 py-2 rounded-lg transition-all text-[11px]"
                    >
                    <i class="fa-solid fa-check"></i>
                      Complete
                </button>
              </div>
            </div>
        `;
  }
  ToDo.innerHTML = box;
}
