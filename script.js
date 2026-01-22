let input = document.querySelector(".input-box #todoInput");
let btn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let ul = document.querySelector(".app #todoList");
let editbox = document.querySelector(".editbox");
let editInput = document.querySelector("#editInput");
let OKBtn = document.querySelector("#OKBtn");

let editingId = null;

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

btn.addEventListener("click", function () {
  let newTodo = input.value.trim();
  if (newTodo === "") return;

  let todoObj = {
    id: Math.random().toFixed(5),
    text: newTodo,
    completed: false,
  };
  allTodos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(allTodos));

  createTodoUI(todoObj);

  input.value = "";
});
allTodos.forEach((todoObj) => {
  createTodoUI(todoObj);
});

function createTodoUI(todoObj) {
  let list = document.createElement("li");

  if (todoObj.completed) {
    list.classList.add("done");
  }

  let p = document.createElement("p");
  p.textContent = todoObj.text;
  list.appendChild(p);

  let todoDiv = document.createElement("div")
  todoDiv.classList.add("todoDiv")

  list.appendChild(todoDiv)


  let editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit-btn");
  todoDiv.appendChild(editBtn);

  let dltbtn = document.createElement("span");
  dltbtn.textContent = "🗑️";
  dltbtn.classList.add("delete-btn");

  todoDiv.appendChild(dltbtn)


  ul.appendChild(list);

  // delete task
  dltbtn.addEventListener("click", function (e) {
    e.stopPropagation();

    allTodos = allTodos.filter((t) => t !== todoObj);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    list.remove();
  });

  // toggle complete
  list.addEventListener("click", function () {
    todoObj.completed = !todoObj.completed;
    list.classList.toggle("done");
    localStorage.setItem("todos", JSON.stringify(allTodos));
  });

  editBtn.addEventListener("click", function (e) {
    
     e.stopPropagation();
     editbox.style.display = "block";
    editingId = todoObj.id;
    editInput.value = todoObj.text;

    

  });

  OKBtn.addEventListener("click", function () {
      if (editingId === null) return;
      let editedtodo = editInput.value.trim();
      let findTodo = allTodos.find((t) => t.id === editingId);
      findTodo.text = editedtodo;

      p.textContent = todoObj.text;
    editbox.style.display = "none";

    localStorage.setItem("todos", JSON.stringify(allTodos))

    });
}

//for filterlet searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", function () {
  let query = searchInput.value.toLowerCase().trim();

  ul.innerHTML = "";


  let filtered = allTodos.filter((t) =>
    t.text.toLowerCase().includes(query)
  );

  filtered.forEach((todoObj) => {
    createTodoUI(todoObj);
  });
});

let CloseBtn = document.querySelector("#CloseBtn");
CloseBtn.addEventListener("click",function(){
    editbox.style.display = "none";
})