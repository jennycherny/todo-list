const userTasks = document.querySelector('.user-tasks');
const inputForm = document.querySelector('#input-block');
const userInput = document.querySelector('.user-input');

let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

inputForm.addEventListener('submit', addTask);
userTasks.addEventListener('click', deleteTask);
userTasks.addEventListener('click', favoritesTask);
userTasks.addEventListener('click', doneTask);

function addTask(e) {
    e.preventDefault();
    const taskText = userInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
        favorites: false,
    };

    tasks.push(newTask)
    saveToLocalStorage();

    renderTask(newTask);

    e.target.reset(userInput); 
    userInput.focus();
}

function deleteTask(e) {
    if(e.target.dataset.action !== 'delete') return;

    const parentNode = e.target.closest('.user-task');

    const id = Number(parentNode.id);

    // const index = tasks.findIndex((task) => task.id === id);

    // tasks.splice(index, 1)

    tasks = tasks.filter((task) => task.id !== id)

    saveToLocalStorage();

    console.log(tasks);

    parentNode.remove();
}

function favoritesTask(e) {
    if(e.target.dataset.action === 'favorites') {
        const parentNode = e.target.closest('.user-task');

        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id)

        task.favorites = !task.favorites

        saveToLocalStorage()

        const taskTitle = parentNode.querySelector('.user-text');
        taskTitle.classList.toggle('user-text--favorites');
    }
}

function doneTask(e) {
    if(e.target.dataset.action === 'done') {
        const parentNode = e.target.closest('.user-task');

        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id)

        task.done = !task.done

        saveToLocalStorage()

        const taskTitle = parentNode.querySelector('.user-text');
        taskTitle.classList.toggle('user-text--done');
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClassDone = task.done ? "user-text user-text--done" : "user-text";
    const cssClassFavorites = task.favorites ? "user-text user-text--favorites" : "user-text";

    const taskHTML = `<div class="user-task" id="${task.id}">
    <div class="container">
    <div class="checkbox-wrapper-12">
        <div class="cbx">
        <input id="cbx-12" data-action="done" type="checkbox"/>
        <label for="cbx-12">
        </label>
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
        </div>
    </div>
  <span class="${cssClassDone, cssClassFavorites}">${task.text}</span>  
        <button id="star-button" type="button" data-action="favorites">
            <img  class="star-img" src="/public/icons/star.svg" alt="important" data-action="favorites">
        </button>                  
        <button id="trash-button" type="button" data-action="delete">
            <img  id="trash-img" src="/public/icons/trash.svg" alt="trash" data-action="delete">
        </button>
    </div>
    </div>`;

userTasks.insertAdjacentHTML('afterbegin', taskHTML);
}
