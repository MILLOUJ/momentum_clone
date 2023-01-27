const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greetings = document.querySelector('.js-greetings');
const USER_LS = 'currentUserName';
const APPEAR_CN = 'appear';

function saveUserName(text) {
localStorage.setItem(USER_LS, text);
}

function submitHandler(event) {
    event.preventDefault();
    const inputValue = input.value;
    showGreeting(inputValue);
    saveUserName(inputValue);
}

function showGreeting(text) {
    greetings.innerText = `Hi, ${text}.`;
    greetings.classList.add(APPEAR_CN);
    form.classList.remove(APPEAR_CN);
}

function askForUsername() {
    form.classList.add(APPEAR_CN);
    form.addEventListener('submit', submitHandler);
}

function loadUserName() {
    const currentUserName = localStorage.getItem(USER_LS);
    if (currentUserName === null) {
        askForUsername();
    } else {
        showGreeting(currentUserName);
    }
}

function init() {
loadUserName();
}

init();