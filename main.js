// fetchalltodo item using get index API

const JWTtoken = localStorage.getItem('todoJWTtoken')

const fetchAllTodo = () => {
    fetch("https://api.kelasprogramming.com/todo",{
        headers: {
            "Authorization": `Bearer ${JWTtoken}`
        }
    })
    .then((response)=> response.json())
    .then((body)=>{
        const todoList = body.entry.map((todo) => (
            `<div class="pt-1 d-flex justify-content-between">
            ${todo.details}
            <div class="d-flex" >
              <button class="btn btn-${todo.completed == 1 ? 'success' : 'warning'} me-1">${todo.completed == 1 ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'}</button>
              <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" onclick = 'selectTodo(${JSON.stringify(todo)})' ><i class="bi bi-pencil"></i></button>
              <button class='btn btn-danger'><i class="bi bi-trash"></i></button>
            </div>
          </div>`
        ))
        document.getElementById('todoList').innerHTML = todoList.join('')
    })
    .catch((err) => {debugger})
}

// add new todo using create API post method

const newTodo = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputValue = document.getElementById('todoInput').value;

    fetch('https://api.kelasprogramming.com/todo',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${JWTtoken}`
        },
        body: JSON.stringify({
            "details": inputValue
        })
    })
    .then(res => res.json())
    .then(body =>{
        fetchAllTodo()
        document.getElementById('todoInput').value = ''
    })
    .catch(err => {debugger})
}

// update todolist using update API Put method

let selectedTodo =''
const selectTodo = (todo) => {
    console.log(todo)
    selectedTodo = todo
}

let isChecked = false;
const checked =() => {document.addEventListener('DOMContentLoaded', function() {
    const checkBox = document.getElementById('checkBox');
    const incompleteLabel = document.querySelector('.Incomplete');
    const completedLabel = document.querySelector('.Completed');
    
    checkBox.addEventListener('change', function() {
      isChecked = checkBox.checked;
      if (isChecked) {
        incompleteLabel.style.display = 'none';
        completedLabel.style.display = 'block';
      } else {
        incompleteLabel.style.display = 'block';
        completedLabel.style.display = 'none';
      }
      console.log(isChecked)
    });
  })
  }

const onSaveChanges = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputValue = document.getElementById('todoUpdate').value
    fetch(`https://api.kelasprogramming.com/todo/${selectedTodo.id}`,{
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${JWTtoken}`
        },
        body: JSON.stringify({
            "details": inputValue,
            "completed": isChecked ? 1 : 0
        })
    })
    .then(res => res.json())
    .then(body =>{
        fetchAllTodo()
        document.getElementById('todoUpdate').value = ''
        document.getElementById('closeModal').click()
    })
}

fetchAllTodo();
checked();