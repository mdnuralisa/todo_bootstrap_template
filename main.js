// fetchalltodo item using get index API

const JWTtoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5rZWxhc3Byb2dyYW1taW5nLmNvbS50ZXN0Iiwic3ViIjoiMTIyNDAwYmItZjQ3OS01ZDRlLWE3NzAtMDg4ZTE5OTgwMjBmIiwiaWF0IjoxNzA5ODIwNTMzLCJleHAiOjE3MDk5OTMzMzMsIm5hbWUiOiJ0ZXN0aW5nIn0.JMuwWZyVDtnAVOsSnFMeUa0uyf53-Nf6bGP6sfsljBE'

// `Bearer ${JWTtoken}`

const fetchAllTodo = () => {
    fetch("https://api.kelasprogramming.com/todo",{
        headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5rZWxhc3Byb2dyYW1taW5nLmNvbS50ZXN0Iiwic3ViIjoiMTIyNDAwYmItZjQ3OS01ZDRlLWE3NzAtMDg4ZTE5OTgwMjBmIiwiaWF0IjoxNzA5ODIwNTMzLCJleHAiOjE3MDk5OTMzMzMsIm5hbWUiOiJ0ZXN0aW5nIn0.JMuwWZyVDtnAVOsSnFMeUa0uyf53-Nf6bGP6sfsljBE"
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