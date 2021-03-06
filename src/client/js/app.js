// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

import * as HelperFns from './components/helper-fns.js';
import { postAsync, getAsync } from './components/apis.js';
import createWeatherDisplay from './components/weather.js';
import createPackingItemDisplay from './components/packing-item.js';
import createFlightTicketDisplay from './components/flight-ticket.js';
import createCountryInfoDisplay from './components/country-info.js';
import createBookmarkDisplay from './components/bookmark.js';
import {
  GetStartedView,
  SearchView,
  TripView,
  SavedTripsView,
  UserEntry,
  FlightTicket,
  PackingItem
} from './components/objects.js';
import {
  loadNavStaticAssets,
  loadSearchStaticAssets,
  loadModalFallbackAsset,
  loadSavedTripStaticAsset,
  loadBookmarkFallbackAsset,
  loadAboutUsStaticAsset
} from './components/images.js';


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Global Constants and Variables
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const todaysDate = new Date();
let nextWeeksDate = new Date(); nextWeeksDate.setDate(nextWeeksDate.getDate() + 6);
const defaultTime = '12:30';
const minDateInput = `${todaysDate.getFullYear()}-${HelperFns.toTwoDigit(todaysDate.getMonth()+1)}-${HelperFns.toTwoDigit(todaysDate.getDate())}`;
let savedTrips = HelperFns.getLocalStorage('SavedTrips');
let tripInDisplay = {};


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
// loadSavedTrips() - Get Saved Trips from Local Storage
// displayModal() - Display trip details in the modal from Search/Bookmarks
// processSearchRequest() - Process User Search Trip Request
// addHeroEventListeners() - Add listners to Hero elements
// addTripModalEventListeners() - Add listners to Modal elements
// createBookmark(tripId) - Create a bookmark for the saved trip
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const loadSavedTrips = () => {
  let tripIds = Object.keys(savedTrips);
  if (!tripIds.length) {
    return;
  }
  SavedTripsView.noDataContainer.classList.add('hide-element');
  SavedTripsView.withDataContainer.classList.remove('hide-element');
  for (let tripId of tripIds) {
    createBookmark(tripId);
  }
}

const displayModal = () => {
  TripView.viewContainer.classList.remove('hide-element');

  if(tripInDisplay.hasOwnProperty('tripId')) {
    TripView.saveCTABtn.classList.add('hide-element');
  } else {
    TripView.saveCTABtn.classList.remove('hide-element');
  }

  TripView.location.image.src = tripInDisplay.graphics.webformatURL;
  TripView.location.name.textContent = tripInDisplay.destination;
  TripView.location.date.textContent = (new Date(tripInDisplay.startDate)).toUTCString().slice(0,16);

  if (tripInDisplay.weather.hasOwnProperty('error')) {
    TripView.weather.viewContainer.appendChild(HelperFns.createErrorDisplay('Weather'));
  }
  else {
    if(+(new Date(tripInDisplay.startDate)) < +nextWeeksDate) {
      TripView.weather.viewContainer.appendChild(createWeatherDisplay(tripInDisplay.weather.data[0], tripInDisplay.weather.timezone));
    } else {
      TripView.weather.viewContainer.appendChild(createWeatherDisplay(tripInDisplay.weather.data[7], tripInDisplay.weather.timezone));
    }
  }

  if (tripInDisplay.countryinfo.hasOwnProperty('error')) {
    TripView.countryinfo.viewContainer.appendChild(HelperFns.createErrorDisplay('Country'));
  } else {
    TripView.countryinfo.viewContainer.appendChild(createCountryInfoDisplay(tripInDisplay.countryinfo));
  }

  // Save Trip Logic for Packing Section
  if (!tripInDisplay.packingList.length) {
    TripView.packing.noDataContainer.classList.remove('hide-element');
    TripView.packing.withDataContainer.classList.add('hide-element');
  } else {
    TripView.packing.noDataContainer.classList.add('hide-element');
    TripView.packing.withDataContainer.classList.remove('hide-element');

    for (let item of tripInDisplay.packingList) {
      TripView.packing.withDataContainer.appendChild(createPackingItemDisplay(item));
      if (item.isPacked) {
        document.getElementById(item.id).click();
      }
    }
  }

  // Save Trip Logic for Flight Section
  if (!tripInDisplay.flights.length) {
    TripView.flight.noDataContainer.classList.remove('hide-element');
    TripView.flight.withDataContainer.classList.add('hide-element');
  } else {
    TripView.flight.noDataContainer.classList.add('hide-element');
    TripView.flight.withDataContainer.classList.remove('hide-element');

    for (let ticket of tripInDisplay.flights) {
      TripView.flight.withDataContainer.appendChild(createFlightTicketDisplay(ticket));
    }
  }
}

const processSearchRequest = async () => {
  let latestSearchEntry = new UserEntry(SearchView.whereTo.value, SearchView.startDate.value);

  if (!window.navigator.onLine) {
    alert("You seem to be offline, try again later");
    return;
  }

  try {
    await postAsync('/api/lookupDestination', latestSearchEntry);
    tripInDisplay = await getAsync('/api/getLookupResults');

    SearchView.viewContainer.classList.remove('hide-element');
    SearchView.loadingContainer.classList.add('hide-element');
    if(tripInDisplay.geoname.status == 200) {
      displayModal();
    } else {
      alert('Something went wrong with the search. Please verify the location provided and try again');
    }

  } catch (error) {
    console.log('******************** Processing Search Request Failed ******************** \n', error);
    alert('Server not responding. Please try again later.');
    SearchView.viewContainer.classList.remove('hide-element');
    SearchView.loadingContainer.classList.add('hide-element');
  }
}

// Add GetStarted and SearchCTA Event Lisenters
const addHeroEventListeners = () => {
  GetStartedView.ctaBtn.addEventListener('click', (event) => {
    GetStartedView.viewContainer.classList.add('hide-element');
    SearchView.viewContainer.classList.remove('hide-element');
    SearchView.whereTo.value = '';
    SearchView.startDate.value = '';
  });

  // TripStartDate
  SearchView.startDate.addEventListener('click', (event) => {
    SearchView.startDate.min = minDateInput;
  });

  // SearchCTABtn
  SearchView.ctaBtn.addEventListener('click', (event) => {
    if (SearchView.whereTo.value == '' || SearchView.startDate.value == '') {
      alert("Please input both Destination and Trip Start Date to continue.");
      return;
    }
    SearchView.viewContainer.classList.add('hide-element');
    SearchView.loadingContainer.classList.remove('hide-element');
    processSearchRequest();
  });
}

// Add Trip Modal Event Lisenters
const addTripModalEventListeners = () => {
  // FlightFromDate
  TripView.flight.addCTAView.fromDate.addEventListener('click', (event) => {
    TripView.flight.addCTAView.fromDate.min = minDateInput;
    if (typeof(TripView.flight.addCTAView.toDate.value) != undefined) {
      TripView.flight.addCTAView.fromDate.max = TripView.flight.addCTAView.toDate.value;
    }
  });

  // FlightToDate
  TripView.flight.addCTAView.toDate.addEventListener('click', (event) => {
    if(typeof(TripView.flight.addCTAView.fromDate.value) != undefined) {
      TripView.flight.addCTAView.toDate.min = TripView.flight.addCTAView.fromDate.value;
    } else {
      TripView.flight.addCTAView.toDate.min = minDateInput;
    }
  });

  // DestinationImage
  TripView.location.image.addEventListener('error', (event) => {
    loadModalFallbackAsset();
  });

  // FlightTicketCTA
  TripView.flight.addCTABtn.addEventListener('click', (event) => {
    TripView.flight.noDataContainer.classList.add('hide-element');
    TripView.flight.withDataContainer.classList.add('hide-element');
    TripView.flight.addCTAView.viewContainer.classList.remove('hide-element');
    TripView.flight.addCTAView.fromPlace.value = '';
    TripView.flight.addCTAView.fromDate.value = '';
    TripView.flight.addCTAView.fromTime.value = defaultTime;
    TripView.flight.addCTAView.toPlace.value = '';
    TripView.flight.addCTAView.toDate.value = '';
    TripView.flight.addCTAView.toTime.value = defaultTime;
    TripView.flight.addCTABtn.classList.add('hide-element');
    TripView.flight.addCTAView.newEntryCTABtn.classList.remove('hide-element');
  });

  // NewFlightTicket
  TripView.flight.addCTAView.newEntryCTABtn.addEventListener('click', (event) => {

    if (TripView.flight.addCTAView.fromPlace.value == '' ||
        TripView.flight.addCTAView.fromDate.value == '' ||
        TripView.flight.addCTAView.fromTime.value == '' ||
        TripView.flight.addCTAView.toPlace.value == '' ||
        TripView.flight.addCTAView.toDate.value == '' ||
        TripView.flight.addCTAView.toTime.value == '') {
      alert('To create the Flight Ticket, all fields are mandatory, please verify and provide the missing information.');
      return;
    }

    TripView.flight.addCTAView.viewContainer.classList.add('hide-element');
    TripView.flight.withDataContainer.classList.remove('hide-element');

    let newTicket = new FlightTicket(TripView.flight.addCTAView.fromPlace.value,
      TripView.flight.addCTAView.fromDate.value,
      TripView.flight.addCTAView.fromTime.value,
      TripView.flight.addCTAView.toPlace.value,
      TripView.flight.addCTAView.toDate.value,
      TripView.flight.addCTAView.toTime.value);

    try {
      tripInDisplay.flights.push(newTicket);
      TripView.flight.withDataContainer.appendChild(createFlightTicketDisplay(newTicket));
    } catch (error) {
      console.log('******************** Error Creating New Flight Ticket ******************** \n', error);
    }

    TripView.flight.addCTAView.newEntryCTABtn.classList.add('hide-element');
    TripView.flight.addCTABtn.classList.remove('hide-element');
  });

  // PackingCTA
  TripView.packing.addCTABtn.addEventListener('click', (event) => {
    TripView.packing.addCTABtn.classList.add('hide-element');
    TripView.packing.addCTAView.viewContainer.classList.remove('hide-element');
    TripView.packing.addCTAView.itemName.value = '';
  });

  // NewPackingItem
  TripView.packing.addCTAView.newEntryCTABtn.addEventListener('click', (event) => {
    if (TripView.packing.addCTAView.itemName.value == '') {
      TripView.packing.addCTABtn.classList.remove('hide-element');
      TripView.packing.addCTAView.viewContainer.classList.add('hide-element');
      return;
    }

    if (!tripInDisplay.packingList.length) {
      TripView.packing.noDataContainer.classList.add('hide-element');
      TripView.packing.withDataContainer.classList.remove('hide-element');
    }

    let newItemId = `PackingItem${tripInDisplay.packingList.length + 1}`;
    let newItem = new PackingItem(newItemId, TripView.packing.addCTAView.itemName.value);

    try {
      tripInDisplay.packingList.push(newItem);
      TripView.packing.withDataContainer.appendChild(createPackingItemDisplay(newItem));
    } catch (error) {
      console.log('******************** Error Creating New Packing Item ******************** \n', error);
    }

    TripView.packing.addCTABtn.classList.remove('hide-element');
    TripView.packing.addCTAView.viewContainer.classList.add('hide-element');
  });

  // DisablePackedItems
  TripView.packing.withDataContainer.addEventListener('click', (event) => {
    if (!event.target.disabled) {
      if (event.target.checked) {
        event.target.disabled = true;
        for (let item of tripInDisplay.packingList) {
          if (item.id == event.target.id) {
            item.isPacked = true;
            break;
          }
        }
      }
    }
  });

  // CloseModal
  TripView.closeCTABtn.addEventListener('click', (event) => {

    // PruneModalElements
    HelperFns.destructElementChildren(TripView.weather.viewContainer);
    HelperFns.destructElementChildren(TripView.countryinfo.viewContainer);
    HelperFns.destructElementChildren(TripView.flight.withDataContainer);
    HelperFns.destructElementChildren(TripView.packing.withDataContainer);

    TripView.flight.addCTAView.viewContainer.classList.add('hide-element');
    TripView.flight.addCTAView.newEntryCTABtn.classList.add('hide-element');
    TripView.flight.addCTABtn.classList.remove('hide-element');
    TripView.packing.addCTABtn.classList.remove('hide-element');
    TripView.packing.addCTAView.viewContainer.classList.add('hide-element');

    TripView.viewContainer.classList.add('hide-element');

    if(tripInDisplay.hasOwnProperty('tripId')) {
      savedTrips[tripInDisplay.tripId].flights = tripInDisplay.flights;
      savedTrips[tripInDisplay.tripId].packingList = tripInDisplay.packingList;
      HelperFns.setLocalStorage('SavedTrips', savedTrips);
    }

    // ShowGetStarted
    SearchView.viewContainer.classList.add('hide-element');
    GetStartedView.viewContainer.classList.remove('hide-element');

    // Reset trip in display
    tripInDisplay = {};
  });

  // SaveTripCTA
  TripView.saveCTABtn.addEventListener('click', (event) => {
    if (!savedTrips.length) {
      SavedTripsView.noDataContainer.classList.add('hide-element');
      SavedTripsView.withDataContainer.classList.remove('hide-element');
    }

    let tripId = `BookmarkNum${Object.keys(savedTrips).length + 1}`;
    tripInDisplay.tripId = tripId;
    savedTrips[tripId] = tripInDisplay;
    createBookmark(tripId);
    HelperFns.setLocalStorage('SavedTrips', savedTrips);
    TripView.closeCTABtn.click();
  });
}

const createBookmark = (tripId) => {
  SavedTripsView.bookmarks.appendChild(createBookmarkDisplay(savedTrips[tripId]));

  let Bookmark = {
    viewContainer: document.querySelector(`.bookmark.${tripId}`),
    locPreview: document.querySelector(`.bm-image.${tripId}`),
    deleteCTABtn: document.getElementById(tripId),
  }

  Bookmark.locPreview.addEventListener('error', (event) => {
    loadBookmarkFallbackAsset();
  });

  Bookmark.viewContainer.addEventListener('click', (event) => {
    // For stoping bubbling from deleteCTABtn
    if (event.target.classList.contains('bm-remove') || event.target.classList.contains('fa-times')) {
      return;
    }

    tripInDisplay = savedTrips[tripId];
    displayModal();
  });

  Bookmark.deleteCTABtn.addEventListener('click', (event) => {
    HelperFns.destructElementChildren(Bookmark.viewContainer);
    Bookmark.viewContainer.remove();
    delete savedTrips[tripId];
    HelperFns.setLocalStorage('SavedTrips', savedTrips);

    if (!Object.keys(savedTrips).length) {
      SavedTripsView.noDataContainer.classList.remove('hide-element');
      SavedTripsView.withDataContainer.classList.add('hide-element');
    }
  });
}

// Load Assets
// loadNavStaticAssets();
// loadSearchStaticAssets();
// loadSavedTripStaticAsset();
// loadAboutUsStaticAsset();

// Load Event Listeners
// addHeroEventListeners();
// addTripModalEventListeners();

//loadSavedTrips
// loadSavedTrips();

// Navbar
// eventListeners.navbarEventsOnScroll();
// eventListeners.navbarEventsOnClick();
// eventListeners.navbarBackgroundChangeOnScroll();

export { addHeroEventListeners, addTripModalEventListeners, loadSavedTrips }
