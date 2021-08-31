// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Import Data Objects
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const { UserEntry, WeatherbitAPI, GeonamesAPI, PixabayAPI, Geonames, Weather, DayWiseWeatherData, DestinationGraphics } = require('./server-objects.js');


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
    return json;
  }
  catch(error) {
    console.log('******************** Geoname Fetch Error ******************** \n', error);
  }

}

async function lookupWeather(lat, lng, days='7', units='I') {

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
    return json;
  }
  catch(error) {
    console.log('******************** Weatherbit Fetch Error ******************** \n', error);
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
  }
}

async function processPostRequest() {
  let apiResult, imgResult;
  let isPicFound = false;

  // Call to Geonames
  apiResult = await lookupDestination(lastUserEntryLookup.destination);
  lastUserEntryLookup.geoname = new Geonames(apiResult.geonames[0]);

  // Call to Weatherbit
  apiResult = await lookupWeather(lastUserEntryLookup.geoname.latitude, lastUserEntryLookup.geoname.longitude, 3);
  lastUserEntryLookup.weather = new Weather(apiResult);

  for (let dayWiseWeatherData of apiResult.data) {
    lastUserEntryLookup.weather.data.push(new DayWiseWeatherData(dayWiseWeatherData));
  }

  // Call to Pixabay
  apiResult = await lookupCityImage(lastUserEntryLookup.geoname.city);

  for (let imgData of apiResult.hits) {
    if(imgData.tags.includes(lastUserEntryLookup.geoname.city.toLowerCase())) {
      imgResult = imgData;
      if(imgData.tags.includes(lastUserEntryLookup.geoname.countryName.toLowerCase())) {
        imgResult = imgData;
      }
      isPicFound = true;
    } else {
      if(imgData.tags.includes(lastUserEntryLookup.geoname.countryName.toLowerCase())) {
        imgResult = imgData;
        isPicFound = true;
      }
    }

    if(isPicFound) {
      break;
    }
  }
  console.log(JSON.stringify(imgResult));
  // Remove this logic when default pic is available
  if (isPicFound) {
    lastUserEntryLookup.graphic = new DestinationGraphics(imgResult);
  }

}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Fake Data - To be removed in the end
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

lastUserEntryLookup = {
  "destination": "Mumbai",
  "startDate": "2021-08-25",
  "flights": [],
  "packingList": [],
  "geoname": {
    "status": 200,
    "type": "geoname",
    "city": "Mumbai",
    "state": "16",
    "countryCode": "IN",
    "countryName": "India",
    "latitude": "19.07283",
    "longitude": "72.88261"
  },
  "weather": {
    "status": 200,
    "type": "weather",
    "city": "Mumbai",
    "latitude": 19.07,
    "longitude": 72.88,
    "timezone": "Asia/Kolkata",
    "countryCode": "IN",
    "state": "16",
    "data": [{
      "date": "2021-08-20",
      "weather": {
        "icon": "c04d",
        "code": 804,
        "description": "Overcast clouds"
      },
      "maxTemp": 29.3,
      "minTemp": 24.2,
      "feelsLikeMaxTemp": 25,
      "feelsLikeMinTemp": 32.1,
      "sunrise": 1629420655,
      "sunset": 1629466518,
      "moonrise": 1629458117,
      "moonset": 1629415555
    }, {
      "date": "2021-08-21",
      "weather": {
        "icon": "r03d",
        "code": 502,
        "description": "Heavy rain"
      },
      "maxTemp": 25.1,
      "minTemp": 24,
      "feelsLikeMaxTemp": 25,
      "feelsLikeMinTemp": 25.8,
      "sunrise": 1629507071,
      "sunset": 1629552873,
      "moonrise": 1629547919,
      "moonset": 1629505663
    }, {
      "date": "2021-08-22",
      "weather": {
        "icon": "r01d",
        "code": 500,
        "description": "Light rain"
      },
      "maxTemp": 28.6,
      "minTemp": 24.2,
      "feelsLikeMaxTemp": 25.1,
      "feelsLikeMinTemp": 30.9,
      "sunrise": 1629593487,
      "sunset": 1629639226,
      "moonrise": 1629637367,
      "moonset": 1629592063
    }]
  },
  "graphic": {
    "status": 200,
    "type": "graphic",
    "imgID": 1370023,
    "imgTags": "mumbai, bombs, gateway of india",
    "previewURL": "https://cdn.pixabay.com/photo/2016/05/03/20/01/mumbai-1370023_150.jpg",
    "webformatURL": "https://pixabay.com/get/gad8ddafbf3817c18e29ba01ebdd4df9bda808f814cb5d9f452b09be421ed52f7a3e37434994b16f7e0e48418bf1de27a61b8b400895c63caceb297415057d099_640.jpg",
    "largeImageURL": "https://pixabay.com/get/g9fb5dfc8d2de4d75832a7f941e09b0f34f5b93756ce3b1eeb2bec2680544a5f48f386b7defae624f3492953d2fdc6988da1d0e8c52a09848318b4ace1b9009d6_1280.jpg",
    "pixabayUserID": 1409366,
    "pixabayUser": "Walkerssk"
  }
}

// -----------------------------------------------------------------------------
// Serve HTTP Request
// -----------------------------------------------------------------------------
// serveHTTPRequest() - Serve all HTTP request Get/Post
// -----------------------------------------------------------------------------

function serveHTTPRequest() {
  // GET Requests
  app.get('/api/getLookupResults', async(req, res) => {
    console.log('GET request received.');
    // if(lastUserEntryLookup.geoname.status == 200 && lastUserEntryLookup.weather.status == 200) {
    //   res.json(lastUserEntryLookup);
    // } else {
    //   res.send({ msg: 'GET request received. Requested data unavailable.' });
    // }
    res.json(lastUserEntryLookup); // ******** For fake data ********
  });

  // POST Requests
  app.post('/api/lookupDestination', async(req, res) => {
    console.log('POST request received.');
    // lastUserEntryLookup = new UserEntry(req.body);
    // console.log(JSON.stringify(lastUserEntryLookup));
    // await processPostRequest();
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
