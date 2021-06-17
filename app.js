function formatDate() {
  let date = currentDate.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let amOrPm = "AM";
  if (hours >= 12) {
    amOrPm = "PM";
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = "12";
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${month} ${date} | ${day} ${hours}:${minutes}${amOrPm}`;
}
let dateTime = document.querySelector("#date-time");
let currentDate = new Date();
dateTime.innerHTML = formatDate(currentDate);

function displayWeather(response) {
  document.querySelector("#location-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let unix = response.data.sys.sunset;
  var time = new Date(unix * 1000);
  var formattedSunsetTime = time.toLocaleTimeString();
  document.querySelector("#sunset").innerHTML = formattedSunsetTime;
  console.log(response.data);
}

function searchCity(city) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
  let apiUrl = `${apiEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
searchCity("New York");

function cToF(celsius) {
  var cTemp = celsius;
  var cToFahr = (cTemp * 9) / 5 + 32;
  var message = cTemp + "\xB0C is " + cToFahr + " \xB0F.";
  console.log(message);
}

function fToC(fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = ((fTemp - 32) * 5) / 9;
  var message = fTemp + "\xB0F is " + fToCel + "\xB0C.";
  console.log(message);
}
