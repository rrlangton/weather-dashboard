const APIKey = "6ba9f7d253ab4329a9862198b61e1a8e";
const resultContentEl = document.querySelector('#result-content');
const searchFormEl = document.querySelector('#search-form');
const cityButtonsContainer = document.querySelector('#city-buttons-container');

function apiRequest(query) {
  const locQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIKey}&units=imperial`;

  fetch(locQueryUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const cityName = data.name;
      const currentDate = new Date().toLocaleDateString();

      const currentWeatherElement = document.getElementById("currentWeather");
      currentWeatherElement.innerHTML = `
        <div class="card-header">${cityName} - ${currentDate}</div>
        <div class="card-body">
          <p>Temperature: ${temperature}°F</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>Humidity: ${humidity}%</p>
          <p>Description: ${description}</p>
        </div>`;
    })
    .catch(error => console.error('Error:', error));
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  apiRequest(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// Array of cities
const cities = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando'];
document.addEventListener("DOMContentLoaded", function () {
// Function to create city buttons
function createCityButtons() {
  cities.forEach(city => {
    const button = document.createElement('button');
    button.textContent = city;
    button.classList.add('btn', 'btn-secondary', 'mr-2', 'mb-2');
    button.addEventListener('click', function() {
      apiRequest(city);
    });
    cityButtonsContainer.appendChild(button);
  });
  console.log("City buttons created:", cities);
}
const cityButtonsContainer = document.querySelector('.city-buttons-container');
  createCityButtons(); // Call the function to create city buttons
});

function updateWeatherForecast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      const forecastData = [
        data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]
      ];

      // Clear existing forecast cards
      const forecastContainer = document.getElementById('weatherForecast');
      forecastContainer.innerHTML = '';
      console.log(forecastData);
      // Display weather forecast for the next five days
      for (let i = 0; i < 5; i++) {
        const forecast = forecastData[i];

        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-2');
        card.innerHTML = `
          <div class="">${new Date(forecast.dt * 1000).toLocaleDateString()}</div>
          <div class="">
            <p>Temperature: ${forecast.main.temp}°F</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>Description: ${forecast.weather[0].description}</p>
          </div>
        `;

        forecastContainer.appendChild(card);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to update weather forecast for Chicago
updateWeatherForecast('Chicago');


