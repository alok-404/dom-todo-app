let input = document.querySelector(".input-box #todoInput");
let btn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let ul = document.querySelector(".app #todoList");
let editbox = document.querySelector(".editbox");
let editInput = document.querySelector("#editInput");
let OKBtn = document.querySelector("#OKBtn");
let errorLine = document.querySelector(".errorLine");
let EmptyErrorLine = document.querySelector(".EmptyErrorLine");

let allBtn = document.querySelector("#allBtn");
let completedBtn = document.querySelector("#completedBtn");
let pendingBtn = document.querySelector("#pendingBtn");

let searchInput = document.querySelector("#searchInput");
let CloseBtn = document.querySelector("#CloseBtn");

let editingId = null;

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

/* ---------- ADD TODO ---------- */
btn.addEventListener("click", function () {
  let newTodo = input.value.trim();

  if (newTodo === "") {
    EmptyErrorLine.style.display = "block";
    errorLine.style.display = "none";
    return;
  } else if (newTodo.length <= 3) {
    EmptyErrorLine.style.display = "none";
    errorLine.style.display = "block";
    return;
  }

  EmptyErrorLine.style.display = "none";
  errorLine.style.display = "none";

  let todoObj = {
    id: Math.random().toFixed(5),
    text: newTodo,
    completed: false,
  };

  allTodos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(allTodos));
  renderTodos(allTodos);

  input.value = "";
});

//initial reader
renderTodos(allTodos);

//create todo
function createTodoUI(todoObj) {
  let list = document.createElement("li");

  if (todoObj.completed) {
    list.classList.add("done");
  }

  let p = document.createElement("p");
  p.textContent = todoObj.text;
  list.appendChild(p);

  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todoDiv");
  list.appendChild(todoDiv);

  let editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit-btn");
  todoDiv.appendChild(editBtn);

  let dltbtn = document.createElement("span");
  dltbtn.textContent = "🗑️";
  dltbtn.classList.add("delete-btn");
  todoDiv.appendChild(dltbtn);

  ul.appendChild(list);

  // delete task
  dltbtn.addEventListener("click", function (e) {
    e.stopPropagation();
    allTodos = allTodos.filter((t) => t !== todoObj);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodos(allTodos);
  });

  // toggle complete
  list.addEventListener("click", function () {
    todoObj.completed = !todoObj.completed;
    localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodos(allTodos);
  });

  editBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    editbox.style.display = "block";
    editingId = todoObj.id;
    editInput.value = todoObj.text;
  });
}

//save
OKBtn.addEventListener("click", function () {
  if (editingId === null) return;

  let editedtodo = editInput.value.trim();
  let findTodo = allTodos.find((t) => t.id === editingId);
  findTodo.text = editedtodo;

  localStorage.setItem("todos", JSON.stringify(allTodos));
  renderTodos(allTodos);

  editbox.style.display = "none";
  editingId = null;
});

//close edit
CloseBtn.addEventListener("click", function () {
  editbox.style.display = "none";
  editingId = null;
});
//search
searchInput.addEventListener("input", function () {
  let query = searchInput.value.toLowerCase().trim();
  let filtered = allTodos.filter((t) =>
    t.text.toLowerCase().includes(query)
  );
  renderTodos(filtered);
});

/*  FILTER btn*/

function renderTodos(todosArray) {
  ul.innerHTML = "";
  todosArray.forEach((todoObj) => {
    createTodoUI(todoObj);
  });
}

function setActive(activeBtn) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

allBtn.addEventListener("click", function () {
  setActive(this);
  renderTodos(allTodos);
});

completedBtn.addEventListener("click", function () {
  setActive(this);
  let completedTodos = allTodos.filter((t) => t.completed === true);
  renderTodos(completedTodos);
});

pendingBtn.addEventListener("click", function () {
  setActive(this);
  let pendingTodos = allTodos.filter((t) => t.completed === false);
  renderTodos(pendingTodos);
});
