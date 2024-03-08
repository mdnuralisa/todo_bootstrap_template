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
              <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" ><i class="bi bi-pencil"></i></button>
              <button class='btn btn-danger'><i class="bi bi-trash"></i></button>
            </div>
          </div>`
        ))
        document.getElementById('todoList').innerHTML = todoList.join('')
    })
    .catch((err) => {debugger})
}

fetchAllTodo()