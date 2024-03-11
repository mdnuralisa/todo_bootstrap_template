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
            `<div id ="item" class="pt-1 d-flex justify-content-between">
            ${todo.details}
            <div class="d-flex" >
              <button class="btn btn-${todo.completed == 1 ? 'success' : 'warning'} me-1">${todo.completed == 1 ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'}</button>
              <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" onclick = 'selectTodo(${JSON.stringify(todo)})' ><i class="bi bi-pencil"></i></button>
              <button class='btn btn-danger'><i class="bi bi-trash" onclick = 'deleteTodo(${JSON.stringify(todo)})'></i></button>
            </div>
          </div>`
        ))
        document.getElementById('todoList').innerHTML = todoList.join('')
    })
    .catch((err) => {
        alert('Please login or register.')
    })
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

// when click edit button will use show for specific id using show API get method

let selectedTodo =''
const selectTodo = (todo) => {
    console.log(todo)
    selectedTodo = todo

    fetch(`https://api.kelasprogramming.com/todo/${selectedTodo.id}`,{
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${JWTtoken}`
        },
    })
    .then(res => res.json())
    .then(body =>{
        document.getElementById('todoUpdate').value = selectedTodo.details;
        document.getElementById('checkBox').checked = selectedTodo.completed == 1
    })
    .catch(err => {debugger})
}

let isChecked = false;
const checkedBox =() => {document.addEventListener('DOMContentLoaded', function() {
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

// update todolist using update API Put method

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

// delete item using delete API
let deleteId =''
const deleteTodo = (todo) => {
    console.log(todo)
    deleteId = todo

    fetch(`https://api.kelasprogramming.com/todo/${deleteId.id}`,{
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${JWTtoken}`
        },
    })
    .then(res => res.json())
    .then(body =>{
        document.getElementById('item').innerHTML = ''
        fetchAllTodo();
    })
    .catch(err => {debugger})
}

//logout button on Navbar on success login
if(JWTtoken) {
    // If token is present, show logout button and hide login and register links
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('registerLink').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
} else {
    // If token is not present, hide logout button and show login and register links
    document.getElementById('loginLink').style.display = 'block';
    document.getElementById('registerLink').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
}

// Assuming you have a logout functionality, you can attach an event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear token from local storage or perform logout logic
    localStorage.removeItem('todoJWTtoken');
    localStorage.removeItem('todoRefreshToken');
    // Redirect user to login page or perform necessary actions
    window.location.href = './sign-in.html';
});

        // Add event listener to the Todo List link
        document.getElementById('todoListLink').addEventListener('click', function(event) {
            // Check if token is present
            if (!JWTtoken) {
                // If token is not present, prevent default action (navigation) and show alert message
                event.preventDefault();
                alert('Please login or register.');
            }
        });

fetchAllTodo();
checkedBox();