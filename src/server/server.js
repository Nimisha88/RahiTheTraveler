// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Import Data Objects
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const { UserEntry,
        WeatherbitAPI,
        GeonamesAPI,
        PixabayAPI,
        RestCountriesAPI,
        Geoname,
        Weather,
        DayWiseWeatherData,
        DestinationGraphics,
        CountryInfo,
        RequestProcessingError } = require('./server-objects.js');


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Load Environment Variables and Dependencies
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

require('dotenv').config(); // Load Environment Variables
const express = require('express'); // Include Express
const bodyParser = require('body-parser'); // Include Body-parser
const cors = require('cors'); // Include CORS
const fetch = require('node-fetch'); // Include fetch

let lastUserEntryLookup;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Global Constants and Variables
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const also = '&'; // For framing fetch URLs
const apiKeyWeatherbit = process.env.APIKeyWeatherbit;
const apiKeyGeonames = process.env.APIKeyGeonames;
const apiKeyPixabay = process.env.APIKeyPixabay;
const port = process.env.ServerPort; // Port for the server to listen at


// ----------------------------------------------------------------------------
// Configure Application Instance and spin a Server
// ----------------------------------------------------------------------------
// configureApp() - Initialise app to use body-parser and cors
// ----------------------------------------------------------------------------

const app = express(); // Start up an instance of app

function configureApp() {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(cors());

  // Initialize the Application Project folder
  app.use(express.static('dist'));
}

const server = app.listen(port, () => {
  console.log(`Application running on "localhost: 9090" in Development, "localhost: ${port}" in Production`);
  // console.log(`API Key for Weatherbit: ${apiKeyWeatherbit}`);
  // console.log(`API Key for Geonames: ${apiKeyGeonames}`);
  // console.log(`API Key for apiKeyPixabay: ${apiKeyPixabay}`);
});

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
// lookupDestination(place, maxResults) - Look up destination in UserEntry
// lookupWeather(lat, lng, days) - Look up weather by latitue & longitude
// lookupCityImage(place, category, type) - Look up travel photos by place
// processPostRequest() - Fetch data from all APIs and parse app specific data
// -----------------------------------------------------------------------------

async function lookupDestination(place, maxResults=1) {

  const response = await fetch(GeonamesAPI.baseURL+GeonamesAPI.searchEP+
                               GeonamesAPI.byQuery+place+also+
                               GeonamesAPI.maxResults+maxResults+also+
                               GeonamesAPI.apiKey+apiKeyGeonames);

  try {
    const json = await response.json();

    if (json.hasOwnProperty('status') || json.totalResultsCount == 0) {
      let errorCodeMsg = {
        code: json.status.value,
        msg: json.status.message,
      }
      return new RequestProcessingError('geoname', errorCodeMsg);
    }

    return json;
  }
  catch(error) {
    console.log('******************** Geoname Fetch Error ******************** \n', error);
    return new RequestProcessingError('geoname');
  }

}

async function lookupWeather(lat, lng, days='8', units='I') {

  console.log(WeatherbitAPI.baseURL+WeatherbitAPI.forecastEP+
                               WeatherbitAPI.latitue+lat+also+
                               WeatherbitAPI.longitude+lng+also+
                               WeatherbitAPI.forcastDays+days+also+
                               WeatherbitAPI.tempUnits+units+also+
                               WeatherbitAPI.apiKey+apiKeyWeatherbit);

  const response = await fetch(WeatherbitAPI.baseURL+WeatherbitAPI.forecastEP+
                               WeatherbitAPI.latitue+lat+also+
                               WeatherbitAPI.longitude+lng+also+
                               WeatherbitAPI.forcastDays+days+also+
                               WeatherbitAPI.tempUnits+units+also+
                               WeatherbitAPI.apiKey+apiKeyWeatherbit);

  try {
    const json = await response.json();

    if (json.hasOwnProperty('error')) {
      let errorCodeMsg = {
        code: 0,
        msg: json.error,
      }
      return new RequestProcessingError('weather', errorCodeMsg);
    }

    return json;
  }
  catch(error) {
    console.log('******************** Weatherbit Fetch Error ******************** \n', error);
    return new RequestProcessingError('weather');
  }

}

async function lookupCityImage(place, category='travel', type='photo') {

  console.log(PixabayAPI.baseURL+PixabayAPI.imgEP+
                               PixabayAPI.byQuery+place+also+
                               PixabayAPI.imgType+type+also+
                               PixabayAPI.imgCategory+category+also+
                               PixabayAPI.apiKey+apiKeyPixabay);

  const response = await fetch(PixabayAPI.baseURL+PixabayAPI.imgEP+
                               PixabayAPI.byQuery+place+also+
                               PixabayAPI.imgType+type+also+
                               PixabayAPI.imgCategory+category+also+
                               PixabayAPI.apiKey+apiKeyPixabay);

  try {
    const json = await response.json();
    return json;
  }
  catch(error) {
    console.log('******************** Pixabay Fetch Error ******************** \n', error);
    return new RequestProcessingError('graphics');
  }
}

async function lookupCountryInfo(countryCode) {

  console.log(RestCountriesAPI.baseURL+RestCountriesAPI.countryCodeEP+countryCode);

  const response = await fetch(RestCountriesAPI.baseURL+RestCountriesAPI.countryCodeEP+countryCode);

  try {
    const json = await response.json();

    if (json.hasOwnProperty('status')) {
      let errorCodeMsg = {
        code: json.status,
        msg: json.message,
      }
      return new RequestProcessingError('countryinfo', errorCodeMsg);
    }

    return json;
  }
  catch(error) {
    console.log('******************** Rest Countries Fetch Error ******************** \n', error);
    return new RequestProcessingError('countryinfo');
  }
}

async function processPostRequest() {
  let apiResult, imgResult;
  let isPicFound = false;

  // Call to Geonames
  apiResult = await lookupDestination(lastUserEntryLookup.destination);
  if (apiResult.hasOwnProperty('error')) {
    lastUserEntryLookup.geoname = apiResult;
    return;
  }
  else {
    lastUserEntryLookup.geoname = new Geoname(apiResult.geonames[0]);
  }

  // Call to Weatherbit
  apiResult = await lookupWeather(lastUserEntryLookup.geoname.latitude, lastUserEntryLookup.geoname.longitude);
  if(apiResult.hasOwnProperty('error')) {
    lastUserEntryLookup.weather = apiResult;
  }
  else {
    lastUserEntryLookup.weather = new Weather(apiResult);
    for (let dayWiseWeatherData of apiResult.data) {
      lastUserEntryLookup.weather.data.push(new DayWiseWeatherData(dayWiseWeatherData));
    }
  }

  // Call to Pixabay
  apiResult = await lookupCityImage(lastUserEntryLookup.geoname.city);
  if (apiResult.hasOwnProperty('error')) {
    lastUserEntryLookup.graphics = apiResult;
  }
  else {
    for (let imgData of apiResult.hits) {
      if(imgData.tags.includes(lastUserEntryLookup.geoname.city.toLowerCase()) &&
         imgData.tags.includes(lastUserEntryLookup.geoname.countryName.toLowerCase())) {
        imgResult = imgData;
        isPicFound = true;
        break;
      }
    }

    if(!isPicFound) {
      for (let imgData of apiResult.hits) {
        if(imgData.tags.includes(lastUserEntryLookup.geoname.city.toLowerCase()) ||
           lastUserEntryLookup.geoname.countryName.toLowerCase()) {
          imgResult = imgData;
          isPicFound = true;
          break;
        }
      }
    }

    if(!isPicFound) {
      apiResult = await lookupCityImage(lastUserEntryLookup.geoname.countryName);
      for (let imgData of apiResult.hits) {
        if(imgData.tags.includes(lastUserEntryLookup.geoname.countryName.toLowerCase())) {
          imgResult = imgData;
          isPicFound = true;
          break;
        }
      }
    }

    if(!isPicFound) {
      lastUserEntryLookup.graphics = new RequestProcessingError('graphics', {code:0, msg: 'loc image not found'});
    }
    else {
      lastUserEntryLookup.graphics = new DestinationGraphics(imgResult);
    }
    
  }

  console.log(JSON.stringify(imgResult));
  // Call to Rest Rest Countries
  apiResult = await lookupCountryInfo(lastUserEntryLookup.geoname.countryCode);
  lastUserEntryLookup.countryinfo = apiResult.hasOwnProperty('error')? apiResult : new CountryInfo(apiResult);
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Fake Data - To be removed in the end
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// lastUserEntryLookup = {
//   "destination": "New York",
//   "startDate": "2021-09-11",
//   "flights": [],
//   "packingList": [],
//   "geoname": {
//     "status": 200,
//     "type": "geoname",
//     "city": "New York City",
//     "state": "NY",
//     "countryCode": "US",
//     "countryName": "United States",
//     "latitude": "40.71427",
//     "longitude": "-74.00597"
//   },
//   "weather": {
//     "status": 200,
//     "type": "weather",
//     "city": "New York City",
//     "latitude": 40.71,
//     "longitude": -74.01,
//     "timezone": "America/New_York",
//     "countryCode": "US",
//     "state": "NY",
//     "data": [{
//       "date": "2021-09-02",
//       "weather": {
//         "icon": "t03d",
//         "code": 202,
//         "description": "Thunderstorm with heavy rain"
//       },
//       "maxTemp": 73.5,
//       "minTemp": 58.1,
//       "feelsLikeTemp": 73,
//       "humidity": 80,
//       "wind": "13.9 NW",
//       "sunrise": 1630578251,
//       "sunset": 1630625073
//     }, {
//       "date": "2021-09-03",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 70.7,
//       "minTemp": 54.4,
//       "feelsLikeTemp": 70.3,
//       "humidity": 83,
//       "wind": "7.2 NW",
//       "sunrise": 1630664709,
//       "sunset": 1630711376
//     }, {
//       "date": "2021-09-04",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }, {
//       "date": "2021-09-05",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }, {
//       "date": "2021-09-06",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }, {
//       "date": "2021-09-07",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }, {
//       "date": "2021-09-08",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }, {
//       "date": "2021-09-09",
//       "weather": {
//         "icon": "c02d",
//         "code": 801,
//         "description": "Few clouds"
//       },
//       "maxTemp": 78.6,
//       "minTemp": 60.1,
//       "feelsLikeTemp": 77.1,
//       "humidity": 48,
//       "wind": "5.7 W",
//       "sunrise": 1630751167,
//       "sunset": 1630797678
//     }]
//   },
//   "weather" : {
//     "status": 666,
//     "type": "weather",
//     "error": {
//       "code": 0,
//       "msg": "information unavailable"
//     }
//   },
//   "graphics": {
//     "status": 200,
//     "type": "graphics",
//     "imgID": 1081929,
//     "imgTags": "empire state building, usa, new york city",
//     "previewURL": "https://cdn.pixabay.com/photo/2015/12/08/00/40/empire-state-building-1081929_150.jpg",
//     "webformatURL": "https://pixabay.com/get/gab3bf2ef6a1dfddd14036f3541bff52b6cabc6f21730e461d16a29959d6d6906ccc5dbea1cfeb1061d00d66894eac8ebeb19ff891183cf39c2276f463c298dc1_640.jpg",
//     "largeImageURL": "https://pixabay.com/get/gfc480d521fbb710a440ea9b89590afffa70bcdce99184e73143d5bf5ddf0af3e14f623614883c1c59a26cb049ddba8504be719b610ca8920cc012648392d4f27_1280.jpg",
//     "pixabayUserID": 242387,
//     "pixabayUser": "Free-Photos"
//   },
//   "countryinfo": {
//     "status": 200,
//     "type": "countryinfo",
//     "name": "United States of America",
//     "capital": "Washington, D.C.",
//     "timeZone": ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"],
//     "nativeName": "United States",
//     "currency": {
//       "code": "USD",
//       "name": "United States dollar",
//       "symbol": "$"
//     },
//     "firstLang": {
//       "iso639_1": "en",
//       "iso639_2": "eng",
//       "name": "English",
//       "nativeName": "English"
//     },
//     "flag": "https://restcountries.eu/data/usa.svg"
//   }
// }

// -----------------------------------------------------------------------------
// Serve HTTP Request
// -----------------------------------------------------------------------------
// serveHTTPRequest() - Serve all HTTP request Get/Post
// -----------------------------------------------------------------------------

function serveHTTPRequest() {
  // GET Requests
  app.get('/api/getLookupResults', async(req, res) => {
    console.log('GET request received.');
    res.json(lastUserEntryLookup);
  });

  // POST Requests
  app.post('/api/lookupDestination', async(req, res) => {
    console.log('POST request received.');
    lastUserEntryLookup = new UserEntry(req.body);
    console.log(JSON.stringify(lastUserEntryLookup));
    await processPostRequest();
    res.send({ msg: 'POST request received and processed.' });
  });

  // GET Requests
  app.get('/api/', async(req, res) => {
    console.log('GET request received.');
    res.send({ msg: 'GET request to do nothing received.' });
  });

  // POST Requests
  app.post('/api/', async(req, res) => {
    console.log('POST request received.');
    res.send({ msg: 'POST request to do nothing received.' });
  });
}


// Function Calls
configureApp();
serveHTTPRequest();
