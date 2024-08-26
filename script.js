// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '6cf2d5b1fbcaeb91b87acaca675c84a9';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', fetchWeather);
document.addEventListener('DOMContentLoaded', loadFavorites);

function fetchWeather() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    alert('City not found');
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <button onclick="addFavorite('${data.name}')">Add to Favorites</button>
    `;
}

function addFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    }
}

function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFavorite(city);
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

function removeFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}
