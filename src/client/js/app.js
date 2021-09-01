// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

import '../styles/style.scss';
import * as HelperFns from './components/helper-fns.js';
import { postAsync, getAsync } from './components/apis.js';
import createWeatherDisplay from './components/weather.js';
import createPackingItemDisplay from './components/packing-item.js';
import createFlightTicketDisplay from './components/flight-ticket.js';
import createCountryInfoDisplay from './components/country-info.js';
import { GetStartedView, SearchView, TripView, UserEntry, FlightTicket, PackingItem } from './components/objects.js';
import { loadNavStaticAssets, loadSearchStaticAssets, loadModalFallbackAsset, loadSavedTripStaticAsset } from './components/images.js';


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Global Constants and Variables
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Get Started
// const getStartedContainerEle = document.querySelector('.get-started');
// const getStartedBtnEle = document.getElementById('get-started-btn');



// console.log(JSON.stringify(GetStartedView));

// Search CTA
// const searchCTAContainerEle = document.querySelector('.new-trip');
// const whereTo = document.getElementById('where-to');
// const tripStartDate = document.getElementById('trip-start-date');
// const searchCTABtn = document.getElementById('search-btn');



// Trip Modal
// const locationImgEle = document.getElementById('loc-img');
// Trip Modal - Close Button
// const closeModalBtn = document.querySelector('.close-modal');
// const modalEle = document.getElementById('modal');
// Trip Modal - Weather
// const weatherData = document.querySelector('.weather');

// Trip Modal - Flight Tickets
// const noFlightDataDisplay = document.querySelector('.no-flight-data');
// const newFlightTicketCTA = document.querySelector('.new-flight-ticket-cta');
// const withFlightDataDisplay = document.querySelector('.with-flight-data');
// const addFlightTicketBtn = document.getElementById('add-flight-ticket');
// const newFlightTicketBtn = document.getElementById('new-flight-ticket');
// const fromPlace = document.getElementById('from-place');
// const fromDate = document.getElementById('from-date');
// const fromTime = document.getElementById('from-time');
// const toPlace = document.getElementById('to-place');
// const toDate = document.getElementById('to-date');
// const toTime = document.getElementById('to-time');
// Trip Modal - Packing Items
// const noPackingDataEle = document.querySelector('.no-packing-data');
// const packingListEle = document.querySelector('.packing-list');
// const addPackingItemEle = document.getElementById('add-packing-item');
// const addNewPackingItemEle = document.getElementById('new-packing-item');
// const addNewPackingItemNameEle = addNewPackingItemEle.getElementsByTagName('input')[0];
// const addNewPackingItemBtn = addNewPackingItemEle.getElementsByTagName('i')[0];
// Trip Modal - Save Trip
// const saveTripBtn = document.getElementById('save-trip-btn');



// Generic
const todaysDate = new Date();
const minDateInput = `${todaysDate.getFullYear()}-${HelperFns.toTwoDigit(todaysDate.getMonth()+1)}-${HelperFns.toTwoDigit(todaysDate.getDate())}`;
// let searchResult = {};
let savedTrips = [];

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Psuedo Search Result
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

let searchResult = {
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
      "feelsLikeTemp": 32,
      "sunrise": 1629420655,
      "sunset": 1629466518,
      "humidity": 20,
      "wind" : "156 NE",
    }, {
      "date": "2021-08-21",
      "weather": {
        "icon": "r03d",
        "code": 502,
        "description": "Heavy rain"
      },
      "maxTemp": 25.1,
      "minTemp": 24,
      "feelsLikeTemp": 26,
      "sunrise": 1629507071,
      "sunset": 1629552873,
      "humidity": 20,
      "wind" : "156 NE"
    }, {
      "date": "2021-08-22",
      "weather": {
        "icon": "r01d",
        "code": 500,
        "description": "Light rain"
      },
      "maxTemp": 28.6,
      "minTemp": 24.2,
      "feelsLikeTemp": 31,
      "sunrise": 1629593487,
      "sunset": 1629639226,
      "humidity": 20,
      "wind" : "156 NE"
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
  },
  "countryinfo": {
    "status": 200,
    "type": "country-info",
    "name": "India",
    "capital": "New Delhi",
    "nativeName": "भारत",
    "currency": {
      "code": "INR",
      "name": "Indian rupee",
      "symbol": "₹"
    },
    "firstLang": {
      "iso639_1": "hi",
      "iso639_2": "hin",
      "name": "Hindi",
      "nativeName": "हिन्दी"
    },
    "flag": "https://restcountries.eu/data/ind.svg"
  }
};


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
// displayModal(trip) - Display trip details in the modal
// processSearchRequest() - Process User Request
// -----------------------------------------------------------------------------

function displayModal(trip) {
  TripView.viewContainer.classList.remove('hide-element');

  // try {
  //   TripView.location.image.src = trip.graphic.webformatURL;
  // }
  // catch(error) {
  //   console.log('******************** Loction Image Failed, Fallback image loaded ******************** \n', error);
  //   loadModalFallbackAsset();
  // }
  loadModalFallbackAsset();
  TripView.weather.viewContainer.appendChild(createWeatherDisplay(searchResult.weather.data[0], searchResult.weather.timezone));
  TripView.countryinfo.viewContainer.appendChild(createCountryInfoDisplay(searchResult.countryinfo));

  if(!trip.packingList) {
    TripView.packing.noDataContainer.classList.remove('hide-element');
    TripView.packing.withDataContainer.classList.add('hide-element');
  }
  else {
    for(let item of trip.packingList) {
      TripView.packing.withDataContainer.appendChild(createPackingItemDisplay(item));
      if(item.isPacked) {
        document.getElementById(item.id).click();
      }
    }
  }

  if(!trip.flights.length) {
    TripView.flight.noDataContainer.classList.remove('hide-element');
    TripView.flight.withDataContainer.classList.add('hide-element');
  }
  else {
    for(let ticket of trip.flights) {
      TripView.flight.withDataContainer.appendChild(createFlightTicketDisplay(ticket));
    }
  }
}

async function processSearchRequest() {
  let latestSearchEntry = new UserEntry(SearchView.whereTo.value, SearchView.startDate.value);
  console.log(JSON.stringify(latestSearchEntry));

  try {
    await postAsync('/api/lookupDestination', latestSearchEntry);
    searchResult = await getAsync('/api/getLookupResults');
    console.log('In Process Request: \n' + JSON.stringify(searchResult));
    displayModal(searchResult);
  }
  catch(error) {
    console.log('******************** Processing Search Request Failed ******************** \n', error);
  }
}

// Add SearchCTA Event Lisenters
function addSearchCTAEventListeners() {

  //Get Started
  GetStartedView.ctaBtn.addEventListener('click', (event) => {
    GetStartedView.viewContainer.classList.add('hide-element');
    SearchView.viewContainer.classList.remove('hide-element');
  });

  // TripStartDate
  SearchView.startDate.addEventListener('click', (event) => {
    // Date input's min attrubute accepts value in syntax: 2021-08-14
    SearchView.startDate.min = minDateInput;
    console.log(`Date: ${SearchView.startDate.min}`);
  });

  // SearchCTABtn
  SearchView.ctaBtn.addEventListener('click', (event) => {
    // TODO: Add ClientSide Validations
    // processSearchRequest();
    displayModal(searchResult);
    console.log('In EventListener, Request processed');
  });

  // To close modal
  TripView.closeCTABtn.addEventListener('click', (event) => {
    HelperFns.destructElementChildren(TripView.weather.viewContainer);
    HelperFns.destructElementChildren(TripView.countryinfo.viewContainer);
    HelperFns.destructElementChildren(TripView.flight.withDataContainer);
    HelperFns.destructElementChildren(TripView.packing.withDataContainer);
    TripView.viewContainer.classList.add('hide-element');
    SearchView.viewContainer.classList.add('hide-element');
    GetStartedView.viewContainer.classList.remove('hide-element');
    // HelperFns.reloadPage();
  });

  // Add Flight Details
  TripView.flight.addCTABtn.addEventListener('click', (event) => {
    TripView.flight.noDataContainer.classList.add('hide-element');
    TripView.flight.withDataContainer.classList.add('hide-element');
    TripView.flight.addCTAView.viewContainer.classList.remove('hide-element');

    TripView.flight.addCTAView.fromPlace.value = '';
    TripView.flight.addCTAView.fromDate.value = '';
    TripView.flight.addCTAView.fromTime.value = '';
    TripView.flight.addCTAView.toPlace.value = '';
    TripView.flight.addCTAView.toDate.value = '';
    TripView.flight.addCTAView.toTime.value = '';

    TripView.flight.addCTABtn.classList.add('hide-element');
    TripView.flight.addCTAView.newEntryCTABtn.classList.remove('hide-element');
  });

  TripView.flight.addCTAView.newEntryCTABtn.addEventListener('click', (event) => {
    TripView.flight.addCTAView.viewContainer.classList.add('hide-element');
    TripView.flight.withDataContainer.classList.remove('hide-element');

    let newTicket = new FlightTicket(TripView.flight.addCTAView.fromPlace.value,
                                     TripView.flight.addCTAView.fromDate.value,
                                     TripView.flight.addCTAView.fromTime.value,
                                     TripView.flight.addCTAView.toPlace.value,
                                     TripView.flight.addCTAView.toDate.value,
                                     TripView.flight.addCTAView.toTime.value);

    try {
      searchResult.flights.push(newTicket);
      TripView.flight.withDataContainer.appendChild(createFlightTicketDisplay(newTicket));
    }
    catch(error) {
      console.log('******************** Error Creating New Flight Ticket ******************** \n', error);
    }

    console.log(searchResult.flights);

    TripView.flight.addCTAView.newEntryCTABtn.classList.add('hide-element');
    TripView.flight.addCTABtn.classList.remove('hide-element');
  });

  // Add Packing Items
  // To show add new packing item cta
  TripView.packing.addCTABtn.addEventListener('click', (event) => {
    TripView.packing.addCTABtn.classList.add('hide-element');
    TripView.packing.addCTAView.viewContainer.classList.remove('hide-element');
    TripView.packing.addCTAView.itemName.value = '';
  });
  // To add new packing item
  TripView.packing.addCTAView.newEntryCTABtn.addEventListener('click', (event) => {

    if(TripView.packing.addCTAView.itemName.value == '') {
      TripView.packing.addCTABtn.classList.remove('hide-element');
      TripView.packing.addCTAView.viewContainer.classList.add('hide-element');
      return;
    }

    if (!searchResult.packingList.length) {
      TripView.packing.noDataContainer.classList.add('hide-element');
      TripView.packing.withDataContainer.classList.remove('hide-element');
    }

    let newItemId = `PackingItem${searchResult.packingList.length + 1}`;
    let newItem = new PackingItem(newItemId, TripView.packing.addCTAView.itemName.value);

    try {
      searchResult.packingList.push(newItem);
      TripView.packing.withDataContainer.appendChild(createPackingItemDisplay(newItem));
    }
    catch(error) {
      console.log('******************** Error Creating New Packing Item ******************** \n', error);
    }

    console.log(searchResult.packingList);
    TripView.packing.addCTABtn.classList.remove('hide-element');
    TripView.packing.addCTAView.viewContainer.classList.add('hide-element');
  });
  // To mark an packing item as packed
  TripView.packing.withDataContainer.addEventListener('click', (event) => {
    // console.log(`Clicked Ele: ${event.target.id}`);
    if(!event.target.disabled) {
      if(event.target.checked) {
        event.target.disabled = true;
        for (let item of searchResult.packingList) {
          if (item.id == event.target.id) {
            item.isPacked = true;
            break;
          }
        }
      }
    }
  });

  // Save Trip
  TripView.saveCTABtn.addEventListener('click', (event) => {

    if (searchResult.hasOwnProperty('tripId')) {
      for(let trip of savedTrips) {
        if(trip.tripId = searchResult.tripId) {
          trip.flights = searchResult.flights;
          trip.packingList = searchResult.packingList;
          break;
        }
      }
    }
    else {
      searchResult.tripId = `SavedTrip${savedTrips.length + 1}`;
      savedTrips.push(searchResult);
    }

    console.log(savedTrips);
    TripView.closeCTABtn.click();
  });
}

// Load Assets
loadNavStaticAssets(); loadSearchStaticAssets();

// Load Event Listeners
addSearchCTAEventListeners();
