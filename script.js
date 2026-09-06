let tasks = [];

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");

const filters = document.querySelectorAll(".filter");
const clearCompleted = document.querySelector("#clearCompleted");

let currentFilter = "all";


// Add Task
addBtn.addEventListener("click", addTask);


// Add task using Enter key
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Add Task Function
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });

    }


    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `
            <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <span class="task-text">
                ${task.text}
            </span>

            <button 
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                ✕
            </button>
        `;

        taskList.appendChild(li);

    });


    updateTaskCount();
}


// Complete / Uncomplete Task
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    displayTasks();
}


// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}


// Filter Tasks
filters.forEach(function(button) {

    button.addEventListener("click", function() {

        filters.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();

    });

});


// Clear Completed
clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();

});


// Task Counter
function updateTaskCount() {

    const activeTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    taskCount.textContent = `${activeTasks.length} task(s) remaining`;
}


// Initial Display
displayTasks();
