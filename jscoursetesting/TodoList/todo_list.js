// Declaring a variable named taskInput that retrieves the HTML element
// with the ID taskInput. The value entered by the users is assigned to
// the variable taskInput
const taskInput = document.getElementById("taskInput");

// This fetches the button element responsible for adding tasks
const addTaskBtn = document.getElementById("addTaskBtn");

// This retrieves the unordered list elements where tasks are displayed
const taskList = document.getElementById("taskList");

// This access the button that clears the completed tasks
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Declaring an empty array with the variable named tasks
let tasks = [];

// This function assigns the value of the taskInput html element entered by
// the user, to the variable taskText and trimming any trailing whitespace
function addTask() {
    const taskText = taskInput.value.trim();
    // This if block checks first that the content is not an empty string
    // to create a new task object if it is not empty.
    // Then it pushes the value to the array, representing the ToDo list
    // then it clears the input for the next task entry
    // and finally it displays the entered ToDo tasks
    if (taskText !== "") {
        tasks.push({ text: taskText});
        taskInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>`;
        li.querySelector("input").addEventListener("change", () => toggleTask(index));
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

displayTasks();

