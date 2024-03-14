const APIKey = "6ba9f7d253ab4329a9862198b61e1a8e";

function apiRequest() {
  const city = "Chicago";
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=$Chiacgo&appid=$6ba9f7d253ab4329a9862198b61e1a8e`;

  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      console.log('Fetch Response \n-------------');
      console.log(data);
    })
    .catch(error => console.error('Error:', error));

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log('XMLHttpRequest Response \n-------------');
      console.log(xhr.response);
    }
  };
  xhr.open('GET', queryURL);
  xhr.send();

  $.ajax({
    url: queryURL,
    method: 'GET',
    success: function (response) {
      console.log('Ajax Response \n-------------');
      console.log(response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Ajax Error:', textStatus, errorThrown);
    }
  });
}

apiRequest();

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const userInput = searchInput.value.trim(); // Get user input

    if (userInput !== "") {
      // Check if input is not empty
      saveToLocalStorage(userInput); // Save input to local storage
      console.log("User input saved to local storage:", userInput);
    } else {
      console.log("Please enter a city name.");
    }
  });

  function saveToLocalStorage(input) {
    // Save user input to local storage
    localStorage.setItem("userInput", input);
  }
});

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
