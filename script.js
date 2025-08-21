// Load tasks from localStorage on page load
window.onload = function () {
    loadTasks();

    // Add Enter key functionality
    const input = document.getElementById("taskInput");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
};

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }
    renderTask(text);
    input.value = "";
    saveTasks();
}

function renderTask(text, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onchange = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    const span = document.createElement("span");
    span.textContent = text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const newText = prompt("Edit task:", span.textContent);
        if (newText && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveTasks();
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);
}
