// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} 

const api_key = "01892872e32781fdab669982b621ff22";

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const errorMsg = document.getElementById('errorMsg');


searchBtn.addEventListener('click', function () {
    getWeather();
})

cityInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
})


function getWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        return;
    }

    hideElements(errorMsg);
    hideElements(weatherResult);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(url).then(response => response.json()).then(function (data) {
        if (data.cod === 200) {
            displayWeather(data);
            console.log(data);
        } else {
            showElements(errorMsg);
        }
    }).catch(function (error) {
        console.log("Something went wrong: ", error);
        // showElements(errorMsg);

    });
}

function displayWeather(data) {
    cityName.textContent = data.name + ", " + data.sys.country;
    temperature.textContent = Math.round(data.main.temp - 273.15) + "°C";
    description.textContent = data.weather[0].description;
    humidity.textContent = "💧 Humidity: " + data.main.humidity + "%";
    wind.textContent = "💨 Wind: " + data.wind.speed + " km/hr";

    showElements(weatherResult);
}

function showElements(element) {
    element.classList.remove('hidden');
}

function hideElements(element) {
    element.classList.add('hidden');
}


