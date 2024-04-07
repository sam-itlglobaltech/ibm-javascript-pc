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
    // clear the existing content within the task list element by setting its
    // innerHTML to an empty string
    taskList.innerHTML = "";
    // creates a list item li for each task
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        // it constructs HTML content for each task by assigning it to 
        // li.innerHTML which includes a checkbox, a label displaying the 
        // task text and corresponding IDs
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>`;
        // it sets up an event listener for each checkbox within the task list
        // <li> element. When the checkbox state changes, it triggers the 
        // toggleTask() function.
            li.querySelector("input").addEventListener("change", () => toggleTask(index));
        // This appends the newly created list item containing the task details in
        // the To-Do List interface
            taskList.appendChild(li);
    });
}

// This function toggles the completion status of a specific task in the tasks array
// based on the provided index. If the task is selected, then it will mark that
// particular task as completed and call the clear completed tasks
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// This filter the task array, to retrieve the tasks that are not marked as completed
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

// These event listeners listen for clicks after clicking the Add Task and Clear Completed
// buttons
addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Calls the displayTasks function to display the entered task after clicking the 
// Add Task button
displayTasks();

