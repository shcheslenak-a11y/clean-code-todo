//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const createTaskButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const formTaskElement = function (taskString) {
  const taskItem = document.createElement("li");

  //input (checkbox)
  const statusCheckBox = document.createElement("input"); //checkbx
  //label
  const taskDescription = document.createElement("label"); //label
  //input (text)
  const editDescriptionInput = document.createElement("input"); //text
  //button.edit
  const switchEditModeButton = document.createElement("button"); //edit button

  //button.delete
  const taskDeleteButton = document.createElement("button"); //delete button
  const taskDeleteButtonImg = document.createElement("img"); //delete button image

  taskDescription.innerText = taskString;
  taskDescription.className = "task";

  //Each elements, needs appending
  statusCheckBox.type = "checkbox";
  editDescriptionInput.type = "text";
  editDescriptionInput.className = "task";

  switchEditModeButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  switchEditModeButton.className = "edit";

  taskDeleteButton.className = "delete";
  taskDeleteButtonImg.src = "./remove.svg";
  taskDeleteButton.appendChild(taskDeleteButtonImg);

  //and appending.
  taskItem.appendChild(statusCheckBox);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(editDescriptionInput);
  taskItem.appendChild(switchEditModeButton);
  taskItem.appendChild(taskDeleteButton);
  return taskItem;
};

const createTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = formTaskElement(newTaskInput.value);

  //Append taskItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editDescriptionInput = taskItem.querySelector("input[type=text]");
  const taskDescription = taskItem.querySelector("label");
  const switchEditModeButton = taskItem.querySelector(".edit");
  const isInEditMode = taskItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isInEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    taskDescription.innerText = editDescriptionInput.value;
    switchEditModeButton.innerText = "Edit";
  } else {
    editDescriptionInput.value = taskDescription.innerText;
    switchEditModeButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskHolder = taskItem.parentNode;
  //Remove the parent list item from the ul.
  taskHolder.removeChild(taskItem);
};

//change task status
const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  const isCompleted = ul.id == "completed-tasks"; // current status
  const newHolder = isCompleted ? incompleteTaskHolder : completedTasksHolder; // opposite status holder
  newHolder.appendChild(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
createTaskButton.addEventListener("click", createTask);

const bindTaskEvents = function (taskItem) {
  //select ListItems children
  const statusCheckBox = taskItem.querySelector("input[type=checkbox]");
  const switchEditModeButton = taskItem.querySelector("button.edit");
  const taskDeleteButton = taskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  switchEditModeButton.onclick = editTask;
  //Bind deleteTask to delete button.
  taskDeleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  statusCheckBox.onchange = toggleTaskStatus;
};

//cycle over incompleteTaskHolder ul list items
//for each list item

for (const task of incompleteTaskHolder.children) bindTaskEvents(task);
for (const task of completedTasksHolder.children) bindTaskEvents(task);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
