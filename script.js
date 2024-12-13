const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
const useGeoLocationBtn = document.getElementById('use-geolocation-btn');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const currentTemp = document.getElementById('current-temp');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Fetch weather data based on location input
fetchWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherByLocation(location);
    }
});

// Fetch weather data based on geolocation
useGeoLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        }, () => {
            alert("Geolocation permission denied or unavailable.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Get weather by city name
function getWeatherByLocation(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert("Location not found!");
            } else {
                displayWeather(data);
            }
        })
        .catch(() => alert("Error fetching weather data"));
}

// Get weather by coordinates (latitude, longitude)
function getWeatherByCoordinates(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(() => alert("Error fetching weather data"));
}

// Display weather data on the page
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    
    cityName.textContent = `${name}, ${data.sys.country}`;
    currentTemp.textContent = `Temperature: ${main.temp}°C`;
    weatherDescription.textContent = `Conditions: ${weather[0].description}`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;
    
    weatherInfo.classList.remove('hidden');
    locationInput.value = '';
}

// Optional: To display additional animations and feedback on user interaction
window.onload = () => {
    alert("Welcome to the Weather Finder! You can get current weather information by entering a location or using your device's geolocation.");
};
