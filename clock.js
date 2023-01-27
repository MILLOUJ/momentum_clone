const clockContainer = document.querySelector('.js-clock');
const clock = document.querySelector('.js-clock');
const clockHours = clockContainer.querySelector('.js-clock-hours');
const clockMin = clockContainer.querySelector('.js-clock-min');
const clockSec = clockContainer.querySelector('.js-clock-sec');

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockHours.innerHTML = `${hours < 10 ? `0${hours}` : hours}`;
    clockMin.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}`;
    clockSec.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();