document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => addTaskToDOM(task));
}


function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value;
    
    if(!taskText){
        alert("Can't add empty task!");
        return;
    }

    addTaskToDOM(taskText)

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks))
    textInput.value = "";
}


function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <span>
        <span class="edit btn btn-primary" onclick="editTask(this)" ><i class="fa-solid fa-pen-to-square"></i></span>
        <span class="delete btn btn-danger" onclick="deleteTask(this)" ><i class="fa-solid fa-trash"></i></span>
        </span>
        `
    ul.appendChild(li);
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


function editTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;
    let oldTask = taskText;

    let editedTask = prompt("Edit task", taskText);
    li.firstElementChild.innerText = editedTask;

    let oldList = JSON.parse(localStorage.getItem("tasks")) || [];
    let newList = [];
    oldList.forEach(task => {
        if(task == oldTask){
            newList.push(editedTask);
        }        
        else{
            newList.push(task);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(newList))
}