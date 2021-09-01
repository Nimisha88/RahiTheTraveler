export default (data = {}, dataTimeZone = 'America/New_York') => {

  let dataDate = new Date(data.date);
  let sunriseTime = (new Date(data.sunrise * 1000)).toLocaleTimeString('en-US', {timeZone: dataTimeZone});
  let sunrsetTime = (new Date(data.sunset * 1000)).toLocaleTimeString('en-US', {timeZone: dataTimeZone});

  // <div class="with-data weather">
  let weatherData = document.createElement('div');
  weatherData.classList.add('with-data', 'weather');

  weatherData.appendChild(generateMainData(dataDate.toDateString(), data.maxTemp, data.minTemp, data.feelsLikeTemp));
  weatherData.appendChild(generateWeatherIcon(data.weather));
  weatherData.appendChild(generateOtherData(data.humidity, data.wind));
  weatherData.appendChild(generateSunData(sunriseTime, sunrsetTime));

  return weatherData;
}

/* Example Main Data
  <div class="weather-data main-data">
    <h5 class="day text-alt">Friday,</h5>
    <h5 class="date text-alt">Aug 27th, 2021</h5>
    <h1 class="max-temp">28°</h1>
    <h5 class="min-temp text-alt">Min: 24°</h5>
    <h5 class="feels-like text-alt">Feels Like: 20°</h5>
  </div> */

function generateMainData(date, maxTemp, minTemp, feelsLikeTemp) {
  let mainData = document.createElement('div');
  mainData.classList.add('weather-data', 'main-data');
  let dayEle = document.createElement('h5');
  dayEle.classList.add('day', 'text-alt');
  let dateEle = document.createElement('h5');
  dateEle.classList.add('date', 'text-alt');
  let maxTempEle = document.createElement('h1');
  maxTempEle.classList.add('max-temp');
  let minTempEle = document.createElement('h5');
  minTempEle.classList.add('min-temp', 'text-alt');
  let feelsLikeTempEle = document.createElement('h5');
  feelsLikeTempEle.classList.add('feels-like', 'text-alt');

  dayEle.innerHTML = `${date.slice(0, 3)},`;
  dateEle.innerHTML = date.slice(4);
  maxTempEle.innerHTML = `${Math.round(maxTemp)}°`;
  minTempEle.innerHTML = `Min: ${Math.round(minTemp)}°`;
  feelsLikeTempEle.innerHTML = `Feels: ${Math.round(feelsLikeTemp)}°`;

  mainData.appendChild(dayEle);
  mainData.appendChild(dateEle);
  mainData.appendChild(maxTempEle);
  mainData.appendChild(minTempEle);
  mainData.appendChild(feelsLikeTempEle);

  return mainData
}


/* Example Weather Icon Data
  <div class="weather-data">
    <i class="fas fa-cloud-rain fa-3x weather-icon"></i>
  </div> */

function generateWeatherIcon(weather) {
  console.log('Inside Weather Icon');
  let weatherIconData = document.createElement('div');
  weatherIconData.classList.add('weather-data');
  // weatherIconData.innerHTML = fetchWeatherIcon(weather.code);
  weatherIconData.appendChild(fetchWeatherIcon(weather.code));
  return weatherIconData;
}

function fetchWeatherIcon(code) {
  let weatherIcon = document.createElement('i');
  weatherIcon.classList.add('fas', 'fa-3x', 'modal-item-icon', 'weather');

  // Identify which Icon to display
  switch (Math.floor(code/100)) {

    case 2:
      // iconHTML = '<i class="fas fa-poo-storm fa-3x weather-icon"></i>';
      weatherIcon.classList.add('fa-poo-storm');
      break;

    case 3:
      // iconHTML = '<i class="fas fa-cloud-rain fa-3x weather-icon"></i>';
      weatherIcon.classList.add('fa-cloud-rain');
      break;

    case 5:

      switch (code) {
        case 511:
          // iconHTML = '<i class="far fa-snowflake fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-snowflake');
          break;
        case 520:
        case 521:
        case 522:
        case 531:
          // iconHTML = '<i class="fas fa-cloud-showers-heavy fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-cloud-showers-heavy');
          break;
        default:
          // Includes cases: 500 - 504
          // iconHTML = '<i class="fas fa-cloud-sun-rain fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-cloud-sun-rain');
          break;
      }
      break;

    case 6:
      // iconHTML = '<i class="far fa-snowflake fa-3x weather-icon"></i>';
      weatherIcon.classList.add('fa-snowflake');
      break;

    case 7:
      // iconHTML = '<i class="fas fa-smog fa-3x weather-icon"></i>';
      weatherIcon.classList.add('fa-smog');
      break;

    case 8:
      switch (code) {
        case 801:
          // iconHTML = '<i class="fas fa-cloud-sun fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-cloud-sun');
          break;
        case 802:
        case 803:
        case 804:
          // iconHTML = '<i class="fas fa-cloud fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-cloud');
          break;
        default:
          // Includes case: 800
          // iconHTML = '<i class="fas fa-sun fa-3x weather-icon"></i>';
          weatherIcon.classList.add('fa-sun');
          break;
      }
      break;

    default:
      // Show barometer if nothing matches!
      // iconHTML = '<i class="fas fa-temperature-high fa-3x weather-icon"></i>';
      weatherIcon.classList.add('fa-temperature-high');
      break;
  }

  // return iconHTML;
  return weatherIcon;
}

/* <div class="weather-data other-data">
  <p><i class="fas fa-tint tint"></i><span class="humidity text-alt">30%</span></p>
  <p><i class="fas fa-wind wind"></i><span class="wind-speed text-alt">3 mph</span></p>
</div> */

function generateOtherData(humidity, wind) {
  let weatherOtherData = document.createElement('div');
  weatherOtherData.classList.add('weather-data', 'other-data');

  let humidityEle = document.createElement('p');

  let humidityIconEle = document.createElement('i');
  humidityIconEle.classList.add('fas', 'fa-tint', 'tint');

  let humidityValue = document.createElement('span');
  humidityValue.classList.add('humidity', 'text-alt');
  humidityValue.textContent = `${humidity}%`;

  let windEle = document.createElement('p');

  let windIconEle = document.createElement('i');
  windIconEle.classList.add('fas', 'fa-wind', 'wind');

  let windValue = document.createElement('span');
  windValue.classList.add('wind-speed', 'text-alt');
  windValue.textContent = `${wind}`;

  humidityEle.appendChild(humidityIconEle);
  humidityEle.appendChild(humidityValue);
  windEle.appendChild(windIconEle);
  windEle.appendChild(windValue);

  weatherOtherData.appendChild(humidityEle);
  weatherOtherData.appendChild(windEle);

  return weatherOtherData;
}


/* Example Sun Data
  <div class="weather-data sun-data">
    <div class="sun-riseset">
      <p class="sun-rise text-alt">5 am</p>
      <p class="sun-data-filler">***********</p>
      <p class="sun-set text-alt">8 pm</p>
    </div>
    <div class="sun-icon">
      <p><i class="fas fa-sort-amount-up sun-up"></i></p>
      <p><i class="fas fa-sun sun"></i></p>
      <p><i class="fas fa-sort-amount-down sun-down"></i></p>
    </div>
  </div> */

function generateSunData(sunriseTime, sunsetTime) {
  let eleTextContent;

  let sunData = document.createElement('div');
  sunData.classList.add('weather-data', 'sun-data');

  let sunRiseSetData = document.createElement('div');
  sunRiseSetData.classList.add('sun-riseset');

  let sunRise = document.createElement('p');
  sunRise.classList.add('sun-rise', 'text-alt');
  let sunRiseSetFiller = document.createElement('p');
  sunRiseSetFiller.classList.add('sun-data-filler');
  sunRiseSetFiller.textContent = '***********';
  let sunSet = document.createElement('p');
  sunSet.classList.add('sun-set', 'text-alt');

  eleTextContent = sunriseTime.split(':');
  sunRise.textContent = `${eleTextContent[0]}:${eleTextContent[1]} ${sunriseTime.split(' ')[1]}`;
  eleTextContent = sunsetTime.split(':');
  sunSet.textContent = `${eleTextContent[0]}:${eleTextContent[1]} ${sunsetTime.split(' ')[1]}`;

  sunRiseSetData.appendChild(sunRise);
  sunRiseSetData.appendChild(sunRiseSetFiller);
  sunRiseSetData.appendChild(sunSet);

  let sunIconData = document.createElement('div');
  sunIconData.classList.add('sun-icon');

  let sunUpIcon = document.createElement('p');
  sunUpIcon.innerHTML = '<i class="fas fa-sort-amount-up sun-up"></i>';
  let sunIcon = document.createElement('p');
  sunIcon.innerHTML = '<i class="fas fa-sun sun"></i>'
  let sunDownIcon = document.createElement('p');
  sunDownIcon.innerHTML = '<i class="fas fa-sort-amount-down sun-down"></i>';

  sunIconData.appendChild(sunUpIcon);
  sunIconData.appendChild(sunIcon);
  sunIconData.appendChild(sunDownIcon);

  sunData.appendChild(sunRiseSetData);
  sunData.appendChild(sunIconData);

  return sunData;
}
