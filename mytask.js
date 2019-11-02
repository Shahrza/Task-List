const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filterTask = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");
const ul = document.querySelector(".list-group");

loadEvents();

function loadEvents() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  ul.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filterTask.addEventListener("keyup", filterList);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.className = "list-group-item m-2";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item float-right";
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);
    ul.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
    const li = document.querySelector("li");
    li.remove();
  }

  const li = document.createElement("li");
  li.className = "list-group-item m-2";
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement("a");
  link.className = "delete-item float-right";
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  li.appendChild(link);
  ul.appendChild(li);
  storeLS(taskInput.value);
  taskInput.value = "";
  e.preventDefault();
}

function storeLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeLS(e.target.parentElement.parentElement);
  }
}

function removeLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function clearTasks(e) {
  // Solution 1
  //taskList.innerHTML = "";
  // Solution 2 better
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  clearTasksLS();
}

function clearTasksLS() {
  localStorage.clear();
}

// FILTER
function filterList(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
