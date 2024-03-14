const APIKey = "6ba9f7d253ab4329a9862198b61e1a8e";
const resultContentEl = document.querySelector('#result-content');
const searchFormEl = document.querySelector('#search-form');

function apiRequest() {
  const city = "Chicago";
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=$Chiacgo&appid=$6ba9f7d253ab4329a9862198b61e1a8e`;

  function getParams() {
    const searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    const query = searchParamsArr[0].split('=').pop();
    const format = searchParamsArr[1].split('=').pop();
  
    searchApi(query, format);
  }
  
  function printResults(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    const resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    const resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    const titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    const bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      `<strong>Date:</strong>${resultObj.date}<br/>`;
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        `<strong>Subjects:</strong>${resultObj.subject.join(', ')}<br/>`;
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> No subject for this entry.';
    }
  
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        `<strong>Description:</strong>${resultObj.description[0]}`;
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this entry.';
    }
  
    const linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    resultContentEl.append(resultCard);
  }
  
  function searchApi(query, format) {
    let locQueryUrl = 'https://api.openweathermap.org/search/?fo=json';
  
    if (format) {
      locQueryUrl = `https://api.openweathermap.org/${format}/?fo=json`;
    }
  
    locQueryUrl = `${locQueryUrl}&q=${query}`;
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (let i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }}
  
  function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    const searchInputVal = document.querySelector('#search-input').value;
    const formatInputVal = document.querySelector('#format-input').value;
  
    const queryString = `./search-results.html?q=${searchInputVal}&format=${formatInputVal}`;
  
    location.assign(queryString);
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    getParams();
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  getParams();

  get apiRequest();
  

const APIKey = "6ba9f7d253ab4329a9862198b61e1a8e";

function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=$6ba9f7d253ab4329a9862198b61e1a8e`;

  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const cityName = data.name;
      
      const currentWeatherElement = document.getElementById("currentWeather");
      currentWeatherElement.textContent = `Current weather in ${cityName}: ${description}, Temperature: ${temperature}°F`;
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", function () {
  getCurrentWeather("Chicago");
});

// Function to fetch weather data and update cards
function updateWeatherCards() {
  const cities = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando']; 

  cities.forEach(city => {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=$Chicago&appid=$6ba9f7d253ab4329a9862198b61e1a8e`;

    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-header">${city}</div>
          <div class="card-body">
            <p>Temperature: ${temperature}°F</p>
            <p>Description: ${description}</p>
          </div>
        `;

        document.getElementById('weatherCards').appendChild(card);
      })
      .catch(error => console.error('Error:', error));
  });
}

updateWeatherCards();
