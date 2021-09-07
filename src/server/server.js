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
const port = 8080; // Port for the server to listen at


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

  console.log(GeonamesAPI.baseURL+GeonamesAPI.searchEP+
                               GeonamesAPI.byQuery+place+also+
                               GeonamesAPI.maxResults+maxResults+also+
                               GeonamesAPI.apiKey+apiKeyGeonames);

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

  // Call to Rest Rest Countries
  apiResult = await lookupCountryInfo(lastUserEntryLookup.geoname.countryCode);
  lastUserEntryLookup.countryinfo = apiResult.hasOwnProperty('error')? apiResult : new CountryInfo(apiResult);
}

// -----------------------------------------------------------------------------
// Serve HTTP Request
// -----------------------------------------------------------------------------
// serveHTTPRequest() - Serve all HTTP request Get/Post
// -----------------------------------------------------------------------------

function serveHTTPRequest() {
  // GET Requests
  app.get('/api/getLookupResults', async(req, res) => {
    console.log('GET request received and processed.');
    res.json(lastUserEntryLookup);
  });

  // POST Requests
  app.post('/api/lookupDestination', async(req, res) => {
    console.log('POST request received.');
    try {
      lastUserEntryLookup = new UserEntry(req.body);
      console.log(JSON.stringify(lastUserEntryLookup));
      await processPostRequest();
    }
    catch(error) {
      console.log('******************** User Search Request Processing Error ******************** \n', error);
      lastUserEntryLookup.geoname = new RequestProcessingError('processing', {code:0, msg: 'Failed to process User Search Request'});
    }
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
