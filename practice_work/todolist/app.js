// selecter
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Func
function addTodo(e){
    e.preventDefault()
    // div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // c-btn
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('completed-btn')
    todoDiv.appendChild(completedBtn)
    // localStorage
    saveLocal(todoInput.value)
    // t-btn
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add('trash-btn')
    todoDiv.appendChild(trashBtn)
    // div -> li
    todoList.appendChild(todoDiv)
    // clear
    todoInput.value = ''
}

function deleteCheck(e){
    const item = e.target
    const todo = item.parentElement
    if (item.classList[0] === 'trash-btn') {
        todo.classList.add('fall')
        removeLocal(todo)
        todo.addEventListener('transitionend',todo.remove)
    }
    if (item.classList[0] === 'completed-btn') {
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                (todo.classList.contains('completed')) 
                    ? todo.style.display = 'flex'
                    : todo.style.display = 'none'
                break
            case 'uncompleted':
                (!todo.classList.contains('completed')) 
                    ? todo.style.display = 'flex'
                    : todo.style.display = 'none'
                break
        }
    })
}

function saveLocal(todo) {
    let todos
    (localStorage.getItem('todos') === null) 
        ? todos = []
        : todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo)
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos
    (localStorage.getItem('todos') === null) 
        ? todos = []
        : todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => {
        // div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        // c-btn
        const completedBtn = document.createElement('button')
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        completedBtn.classList.add('completed-btn')
        todoDiv.appendChild(completedBtn)
        // t-btn
        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
        trashBtn.classList.add('trash-btn')
        todoDiv.appendChild(trashBtn)
        // div -> li
        todoList.appendChild(todoDiv)
    })
}

function removeLocal(todo) {
    let todos
    (localStorage.getItem('todos') === null) 
        ? todos = []
        : todos = JSON.parse(localStorage.getItem('todos'))
    console.log(todo.children) 
    const todoIdx = todos.indexOf(todo.children[0].innerText)
    todos.splice(todoIdx, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
