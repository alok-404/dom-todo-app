const inputBox = document.querySelector("#input-box");
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const errorLine = document.querySelector(".errorLine");
const EmptyErrorLine = document.querySelector(".EmptyErrorLine");
const todoList = document.querySelector("#todoList");
const editBox = document.querySelector(".editbox");
const editInput = document.querySelector("#editInput");
const CloseBtn = document.querySelector("#CloseBtn");
const searchInput = document.querySelector("#searchInput");

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos(allTodos);

let editingTextId = null;
function setItemsInLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

addBtn.addEventListener("click", function () {
  let todo = todoInput.value.trim();

  if (todo === "") {
    EmptyErrorLine.style.display = "block";
    errorLine.style.display = "none";
    return;
  } else if (todo.length <= 3) {
    errorLine.style.display = "block";
    EmptyErrorLine.style.display = "none";
    return;
  }

  errorLine.style.display = "none";
  EmptyErrorLine.style.display = "none";

  let todoObj = {
    id: Date.now(),
    text: todo,
    completed: false,
  };

  allTodos.push(todoObj);
  setItemsInLocalStorage();

  createTodoElement(todoObj);
  todoInput.value = "";
});

function createTodoElement(todoObj) {

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

  todoList.appendChild(list);

  //for deleting todo

  dltbtn.addEventListener("click", function (e) {
    e.stopPropagation();
    allTodos = allTodos.filter((t) => t.id !== todoObj.id);
    setItemsInLocalStorage();
    list.remove();
  });

  // toggle complete
  list.addEventListener("click", function () {
    todoObj.completed = !todoObj.completed;
    localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodos(allTodos);
  });

  //edit button
  editBtn.addEventListener("click", function (e) {
    e.stopImmediatePropagation()
    editingTextId = todoObj.id;
    editInput.value = todoObj.text;
    editBox.style.display = "block";
    // renderTodos(allTodos);
  });


}
OKBtn.addEventListener("click", function () {
  let editTodo = editInput.value.trim();
  if (editTodo === "" || editTodo.length < 3) {
    alert("Todo must be at least 3 characters long");
    return;
  }

  let targetedTodo = allTodos.find((t) => t.id === editingTextId);

  if (!targetedTodo) {
    console.error("Edit target not found. State is corrupted.");
    return;
  }

  targetedTodo.text = editTodo;
  setItemsInLocalStorage();

  renderTodos(allTodos);

  setActive(allBtn);
  currentFilter = "all";

  editBox.style.display = "none";
  editingTextId = null;
});

  //close edit
  CloseBtn.addEventListener("click", function () {
    editBox.style.display = "none";
    editingTextId = null;
  });

//filterTodo
searchInput.addEventListener("input", function () {
  let query = searchInput.value.toLowerCase().trim();

  let filtered = allTodos.filter((t) => t.text.toLowerCase().includes(query));

  renderTodos(filtered);
});

//render todos
function renderTodos(todosArray) {
  todoList.innerHTML = "";
  todosArray.forEach((t) => {
    createTodoElement(t);
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
