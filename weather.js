const COORDS_LS = 'coords';
const API_KEY = 'b85b2ddba180e7b9a77e4eb0215f1f76';
const currentWeatherImg = document.getElementById('img');
const weatherContainer = document.querySelector('.js-weather')

const imgJson = [
    {
        src: './image/1.jpg',
        id: 'Clear'
    },
    {
        src: './image/2.jpg',
        id: 'Clouds'
    },
    {
        src: './image/3.jpg',
        id: 'Snow'
    },
    {
        src: './image/4.jpg',
        id: 'Rain'
    },
    {
        src: './image/5.jpg',
        id: 'Drizzle'
    },
    {
        src: './image/6.jpg',
        id: 'Thunderstorm'
    },
    {
        src: './image/7.jpg',
        id: 'Mist'
    },
]

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function (response) {
        return response.json();
    }).then((json) => {
        const temperature = json.main.temp;
        const location = json.name;
        console.log(json);
        let keyImage;
        json.weather.forEach((item) => {
            currentWeatherImg.src = `http://openweathermap.org/img/wn/${item.icon}@2x.png`;
            keyImage = item.main;
            showImg(keyImage)
        })

        weatherContainer.innerText = `${temperature}° ${location}`;
    });
}

function showImg(keyImage) {
    const img = new Image();
    let kartinkatyt = imgJson.find(item => item.id === keyImage)
    img.src = `${kartinkatyt.src}`;
   img.classList.add('bgImg');
   document.body.prepend(img);
}

function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj));
}

function geoSuccessHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(positionObj);
    getWeather(latitude, longitude);
}

function geoErrorHandler() {
    console.log('error');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS)
    if (coords === null) {
        askForCoords();
    } else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}



function init() {
    getCoords();
}

init();
