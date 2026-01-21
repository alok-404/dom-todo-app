let input = document.querySelector(".input-box #todoInput");
let btn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let ul = document.querySelector(".app #todoList");

 let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

btn.addEventListener("click",function(){
  let newTodo = input.value.trim();
  if(newTodo === "") return;

  let todoObj = {
    text: newTodo,
    completed: false
  }
  allTodos.push(todoObj)
  localStorage.setItem("todos", JSON.stringify(allTodos));

createTodoUI(todoObj);

  input.value = ""
})
allTodos.forEach(todoObj => {
  createTodoUI(todoObj);
});

function createTodoUI(todoObj){
  let list = document.createElement("li");

  if (todoObj.completed) {
    list.classList.add("done");
  }

  let p = document.createElement("p");
  p.textContent = todoObj.text;
  list.appendChild(p);

  let dltbtn = document.createElement("span");
  dltbtn.textContent = "🗑️";
  dltbtn.classList.add("delete-btn");
  list.appendChild(dltbtn);

  ul.appendChild(list);

// delete task
  dltbtn.addEventListener("click", function (e) {
    e.stopPropagation();

    allTodos = allTodos.filter(t => t !== todoObj);
    localStorage.setItem("todos", JSON.stringify(allTodos));

    list.remove();
  });

  // toggle complete
  list.addEventListener("click", function () {
    todoObj.completed = !todoObj.completed;
    list.classList.toggle("done");

    localStorage.setItem("todos", JSON.stringify(allTodos));
  });
}