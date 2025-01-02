const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todoName-input');
const todoListUL = document.getElementById('todo-list');

//store todo items
let allTodos = getTodos();
updateTodoList();

//Everytime a new todo is submitted, prevent refresh and add todo
todoForm.addEventListener('submit',function(e){
  e.preventDefault();
  addTodo();
})

//Creates todo object, adds to todoObject array, saves array 
function addTodo(){
  const todoName = todoInput.value.trim();
  if(todoName.length > 0){
    const todoObject = {
      name : todoName,
      completed : false
    }
    allTodos.push(todoObject);
    updateTodoList();
    todoInput.value = "";
    saveTodos();
  }
}

//Loops through todo array, creates list item and appends it to list
function updateTodoList(){
  todoListUL.innerHTML = "";
  allTodos.forEach((todo,todoIndex)=>{
    todoItem=createTodoItem(todo,todoIndex);
    todoListUL.append(todoItem);
  })
}

//creates html for list item
function createTodoItem(todo,todoIndex){
  const todoId = "todo-"+todoIndex
  const todoLI = document.createElement("li");
  const todoName = todo.name;
  todoLI.className = "todo-listItem";
  todoLI.innerHTML = `
    <div class="todoHeader-listItem">
      <input type="checkbox" id="${todoId}">
      <label for="${todoId}" class="custom-checkbox">
          <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
          </svg>
      </label>
      <label id="todoText-${todoIndex}" class="todo-text">
          ${todoName}
      </label>
      <button class="deleteTodo-button" id="delete-${todoIndex}">
          <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
      </button>
    </div>
    <div class="todoBody-listItem">
        <textarea id="todoDescription-input" placeholder="Enter description of todo item:" autocomplete="off"></textarea>
        <h4 class="boldSmall-text">Contact Information</h4>
        <input id="todoContact-input" type="text" placeholder="Enter Contact Name" autocomplete="off">
        <input id="todoContact-input" type="text" placeholder="Enter Contact email" autocomplete="off">
        <input id="todoContact-input" type="text" placeholder="Enter Contact phone" autocomplete="off">
    </div>
  `

  //Add event listener to delete button
  const deleteTodoButton = todoLI.querySelector(".deleteTodo-button");
  const handleDeleteClick = () =>{
    deleteTodoItem(todoIndex);
  }
  deleteTodoButton.addEventListener("click",handleDeleteClick);
  deleteTodoButton.eventListener = handleDeleteClick;

  //Add event listener to todo label text
  const todoTextLabel = todoLI.querySelector("Label.todo-text");
  const handleLabelClick = () => {
    todoTextLabel.parentNode.parentNode.classList.toggle("active");
  };
  todoTextLabel.addEventListener("click", handleLabelClick);
  todoTextLabel.eventListener = handleLabelClick;

  //Update the completed field of todo item according to checkbox status
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change",()=>{
    allTodos[todoIndex].completed=checkbox.checked;
    saveTodos();
  })
  checkbox.checked = todo.completed;
  return todoLI;
}
//filters out item at todoIndex from todo array, saves array and remakes list
function deleteTodoItem(todoIndex){
  removeLabelTodoTextEventListener(todoIndex);
  removeDeleteButtonEventListener(todoIndex);
  allTodos = allTodos.filter((_, i )=> i !==todoIndex);
  saveTodos();
  updateTodoList();
}
//saves array in local storage
function saveTodos(){
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos",todosJson);
}
//returns array of todos from local storage
function getTodos(){
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

//Remove abel todo text event listener
function removeLabelTodoTextEventListener(todoIndex) {
  const label = document.querySelector(`label[id='todoText-${todoIndex}']`);
  if (label && label.eventListener) {
      console.log("removing");
      label.removeEventListener('click', label.eventListener);
  }
}

//Remove delete button event listener
function removeDeleteButtonEventListener(todoIndex) {
  const button = document.querySelector(`button[id='delete-${todoIndex}']`);
  if (button && button.eventListener) {
      button.removeEventListener('click', button.eventListener);
  }
}

