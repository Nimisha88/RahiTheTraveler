// ----------------------------------------------------------------------------
// Serevr Side Data Objects
// ----------------------------------------------------------------------------
// GeonamesAPI - JS Object with GeonamesAPI base URL and other constants
// WeatherbitAPI - JS Object with WeatherbitAPI base URL and other constants
// PixabayAPI - JS Object with PixabayAPI base URL and other constants
// Geonames(apiDataObj) - Data Object to store app specific GeonameAPI Data
// Weather(apiDataObj) - Data Object to store app specific WeatherAPI Data
// DayWiseWeatherData(apiDataObj) - Supporting Data Object for Weather Forecast
// DestinationGraphics(apiDataObj) - Data Obj to store app spec PixabayAPI Data
// UserEntry(apiDataObj) - Data Object to store all app spec data for an entry
// ----------------------------------------------------------------------------
// Object.prototype.varName =  or Object.prototype.fnName = function() {}
// ----------------------------------------------------------------------------

// JS Object with GeonamesAPI base URL and other constants
const GeonamesAPI = {
   baseURL: 'http://api.geonames.org',
   searchEP: '/searchJSON?',
   byQuery: 'q=',
   byPlaceName: 'name=',
   prefix: 'name_startsWith=',
   maxResults: 'maxRows=',
   language: 'lang=', // Default: en
   apiKey: 'username='
}

// JS Object with WeatherbitAPI base URL and other constants
const WeatherbitAPI = {
  baseURL: 'https://api.weatherbit.io',
  weatherEP: '/v2.0/current?',
  severeAlertEP: '/v2.0/alerts?',
  forecastEP: '/v2.0/forecast/daily?',
  tempUnits: 'units=', // Default: M; M(C)/S(K)/I(F)
  language: 'lang=', // Default: en
  include: 'include=', // minutely, alerts
  latitue: 'lat=',
  longitude: 'lon=',
  forcastDays: 'days=', // Default: 16 days
  apiKey: 'key='
}

// JS Object with PixabayAPI base URL and other constants
const PixabayAPI = {
  baseURL: 'https://pixabay.com',
  imgEP: '/api/?',
  videoEP: '/api/videos/',
  byQuery: 'q=',
  imgType: 'image_type=', // all, photo, illustration, vector
  imgOrientation: 'orientation=', // all, horizontal, vertical
  imgCategory: 'category=', // Relevant values: places, travel, buildings
  editorsChoice: 'editors_choice=', // Default false
  resultsPerPage: 'per_page', // Default 20, 3-200
  safeSearch: 'safesearch=', // true
  language: 'lang=', // default: en
  videoType: 'video_type=', // all, film, animation
  apiKey: 'key='
}

// JS Object with RestCountriesAPI base URL and other constants
const RestCountriesAPI = {
  baseURL: 'https://restcountries.eu',
  countryCodeEP: '/rest/v2/alpha/'
}

// Data Object to store app specific GeonameAPI Data
function Geonames(apiDataObj) {
  this.status = 200;
  this.type = 'geoname';
  this.city = apiDataObj.toponymName;
  this.state = apiDataObj.adminCode1;
  this.countryCode = apiDataObj.countryCode;
  this.countryName = apiDataObj.countryName;
  this.latitude = apiDataObj.lat;
  this.longitude = apiDataObj.lng;
}

// Data Object to store app specific WeatherAPI Data
function Weather(apiDataObj) {
  this.status = 200;
  this.type = 'weather';
  this.city = apiDataObj.city_name;
  this.latitude = apiDataObj.lat;
  this.longitude = apiDataObj.lon;
  this.timezone = apiDataObj.timezone;
  this.countryCode = apiDataObj.country_code;
  this.state = apiDataObj.state_code;
  this.data = [];
}
// Supporting Data Object for Weather Forecast excluded: ${apiDataObj.wind_dir}°
function DayWiseWeatherData(apiDataObj) {
  this.date = apiDataObj.valid_date;
  this.weather = apiDataObj.weather;
  this.maxTemp = apiDataObj.max_temp;
  this.minTemp = apiDataObj.min_temp;
  this.feelsLikeTemp = apiDataObj.app_max_temp;
  this.humidity = Math.round(apiDataObj.rh);
  this.wind = `${apiDataObj.wind_spd} ${apiDataObj.wind_cdir}`;
  this.sunrise = apiDataObj.sunrise_ts;
  this.sunset = apiDataObj.sunset_ts;
}

// Data Obj to store app spec PixabayAPI Data
function DestinationGraphics(apiDataObj) {
  this.status = 200;
  this.type = 'graphics';
  this.imgID = apiDataObj.id;
  this.imgTags = apiDataObj.tags;
  this.previewURL = apiDataObj.previewURL;
  this.webformatURL = apiDataObj.webformatURL;
  this.largeImageURL = apiDataObj.largeImageURL;
  this.pixabayUserID = apiDataObj.user_id;
  this.pixabayUser = apiDataObj.user;
}

// Data Obj to store app spec RestCountriesAPI Data

function CountryInfo(apiDataObj) {
  this.status = 200;
  this.type = 'countryinfo';
  this.name = apiDataObj.name;
  this.capital = apiDataObj.capital;
  this.timeZone = apiDataObj.timezones;
  this.nativeName = apiDataObj.nativeName;
  this.currency = apiDataObj.currencies[0];
  this.firstLang = apiDataObj.languages[0];
  this.flag = apiDataObj.flag;
}

// Main Data Object to store all app spec data for an entry
function UserEntry(apiDataObj) {
  this.destination = apiDataObj.destination;
  this.startDate = apiDataObj.startDate;
  this.flights = [];
  this.packingList = [];
}

module.exports = { UserEntry, WeatherbitAPI, GeonamesAPI, PixabayAPI, RestCountriesAPI, Geonames, Weather, DayWiseWeatherData, DestinationGraphics, CountryInfo }
