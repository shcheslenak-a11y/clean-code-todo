//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const createTaskButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //ul of #completed-tasks

//New task list item
const formTaskElement = function (taskString) {
  const taskItem = document.createElement("li");

  const statusCheckBox = document.createElement("input");
  const taskDescription = document.createElement("label");
  const editDescriptionInput = document.createElement("input");
  const switchEditModeButton = document.createElement("button");
  const taskDeleteButton = document.createElement("button");
  const taskDeleteButtonImg = document.createElement("img");

  taskDescription.innerText = taskString;
  taskDescription.className = "task";

  statusCheckBox.type = "checkbox";
  editDescriptionInput.type = "text";
  editDescriptionInput.className = "task";

  switchEditModeButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  switchEditModeButton.className = "edit";

  taskDeleteButton.className = "delete";
  taskDeleteButtonImg.src = "./remove.svg";
  taskDeleteButton.appendChild(taskDeleteButtonImg);

  taskItem.appendChild(statusCheckBox);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(editDescriptionInput);
  taskItem.appendChild(switchEditModeButton);
  taskItem.appendChild(taskDeleteButton);
  return taskItem;
};

const createTask = function () {
  if (!newTaskInput.value) return; //prevent creation of empty tasks.
  const taskItem = formTaskElement(newTaskInput.value);

  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editDescriptionInput = taskItem.querySelector("input[type=text]");
  const taskDescription = taskItem.querySelector("label");
  const switchEditModeButton = taskItem.querySelector(".edit");
  const isInEditMode = taskItem.classList.contains("editMode");

  if (isInEditMode) {
    taskDescription.innerText = editDescriptionInput.value; //Save edited description for show
    switchEditModeButton.innerText = "Edit";
  } else {
    editDescriptionInput.value = taskDescription.innerText; //Get current description for modification
    switchEditModeButton.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskHolder = taskItem.parentNode;
  taskHolder.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  const isCompleted = ul.id == "completed-tasks"; // current status
  const newHolder = isCompleted ? incompleteTaskHolder : completedTasksHolder; // opposite status holder
  newHolder.appendChild(taskItem);
};

createTaskButton.addEventListener("click", createTask);

const bindTaskEvents = function (taskItem) {
  const statusCheckBox = taskItem.querySelector("input[type=checkbox]");
  const switchEditModeButton = taskItem.querySelector("button.edit");
  const taskDeleteButton = taskItem.querySelector("button.delete");

  switchEditModeButton.onclick = editTask;
  taskDeleteButton.onclick = deleteTask;
  statusCheckBox.onchange = toggleTaskStatus;
};

//cycle over existing tasks
for (const task of incompleteTaskHolder.children) bindTaskEvents(task);
for (const task of completedTasksHolder.children) bindTaskEvents(task);

// Issues with usability don't get seen until they are in front of a human tester.
