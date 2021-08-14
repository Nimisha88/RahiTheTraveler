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



// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Global Constants and Variables
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const also = '&';

const Weatherbit = {
  baseURL: 'https://api.weatherbit.io',
  weatherEP: '/v2.0/current?',
  severeAlertEP: '/v2.0/alerts?',
  forecastEP: '/v2.0/forecast/daily?',
  tempUnits: 'units=', // Default: M; M(C)/S(K)/I(F)
  language: 'lang=', // Default: en
  include: 'include=', // minutely, alerts
  latitue: 'lat=',
  longitude: 'long=',
  forcastDays: 'day=', // Default: 16 days
  apiKey: `key=${process.env.apiKeyWeatherbit}`
}

const Geoname = {
   baseURL: 'http://api.geonames.org',
   searchEP: '/searchJSON?',
   byQuery: 'q=',
   byPlaceName: 'name=',
   maxResult: 'maxRows=',
   language: 'lang=', // Default: en
   apiKey: `username=${process.env.apiKeyGeonames}`
}

const Pixabay = {
  baseURL: 'https://pixabay.com',
  imgEP: '/api/?',
  videoEP: '/api/videos/',
  byQuery: 'q=',
  imgType: 'image_type=', // all, photo, illustration, vector
  imgOrientation: 'orientation=', // all, horizontal, vertical
  imgCategory: 'category=', // Relevant values: places, travel, buildings
  safeSearch: 'safesearch=', // true
  language: 'lang=', // default: en
  videoType: 'video_type=', // all, film, animation
  apiKey: `key=${process.env.apiKeyPixabay}`
}

// ----------------------------------------------------------------------------
// Configure Application Instance and spin a Server
// ----------------------------------------------------------------------------
// configureApp() - Initialise app to use body-parser and cors
// ----------------------------------------------------------------------------

const app = express(); // Start up an instance of app
const port = 8080; // Port for the server to listen at

function configureApp() {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(cors());

  // Initialize the Application Project folder
  app.use(express.static('../client'));
}

const server = app.listen(port, () => {
  console.log(`Application running on "localhost: 9090" in Development, "localhost: ${port}" in Production`);
  // console.log(`API Key for Weatherbit: ${Weatherbit.apiKey.split('=')[1]}`);
  // console.log(`API Key for Geonames: ${Geoname.apiKey.split('=')[1]}`);
  // console.log(`API Key for apiKeyPixabay: ${Pixabay.apiKey.split('=')[1]}`);
});

// -----------------------------------------------------------------------------
// Serve HTTP Request
// -----------------------------------------------------------------------------
// serveHTTPRequest() - Serves all HTTP request Get/Post
// -----------------------------------------------------------------------------

function serveHTTPRequest() {
  // GET Requests
  app.get('/api/getLookupResults', async(req, res) => {
    console.log('GET request received.');
    res.send({ msg: 'GET request received.' });
  });

  // POST Requests
  app.post('/api/lookupDestination', async(req, res) => {
    console.log('POST request received.');
    res.send({ msg: 'POST request received.' });
  });

  // GET Requests
  app.get('/api/', async(req, res) => {
    console.log('GET request received.');
    res.send({ msg: 'GET request received.' });
  });

  // POST Requests
  app.post('/api/', async(req, res) => {
    console.log('POST request received.');
    res.send({ msg: 'POST request received.' });
  });
}


// Function Calls
configureApp();
serveHTTPRequest();
