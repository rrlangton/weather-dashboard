const APIKey = "6ba9f7d253ab4329a9862198b61e1a8e";
let city;

const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=$Chicago&appid=$6ba9f7d253ab4329a9862198b61e1a8e`;
fetch(queryURL);

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
}).then(function (response) {
  console.log('Ajax Response \n-------------');
  console.log(response);
});