const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList')
const TODOS_LS = 'toDos';
let toDos = [];

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => {
            showToDos(toDo.name);
        });
    }
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function delToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}

function showToDos(text) {
    console.log(text);
    const li = document.createElement('li');
    const delBtn = document.querySelector('#check');
    if (li) {
        delBtn.style.display = '';
    }
    delBtn.onclick = function(event) {
        const isChecked = delBtn.checked;
        if (isChecked) {
            delBtn.addEventListener('click', delToDo);
        }
    }
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    // delBtn.innerHTML = '❌';
    // delBtn.addEventListener('click', delToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObject = {
        name: text,
        id: newId
    }
    toDos.push(toDoObject);
    saveToDos();
}

function submitHandler(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    showToDos(currentValue);
    toDoInput.value = "";
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', submitHandler);
}

init();