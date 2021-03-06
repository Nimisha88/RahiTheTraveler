// ----------------------------------------------------------------------------
// Client Side Data Objects
// ----------------------------------------------------------------------------
// GetStartedView - Object to store frequently used DOM elements of GetStarted
// SearchView - Object to store frequently used DOM elements of Search Display
// TripView - Object to store frequently used DOM elements of Trip Modal
// SavedTripsView - Object to store frequently used DOM elements of Bookmarks
// UserEntry - Object to store User Input for Search CTA
// FlightTicket - Object to store User Input for a Flight Ticket
// PackingItem - Object to store User Input for a Packing Item
// ----------------------------------------------------------------------------

const GetStartedView = {
  viewContainer: document.querySelector('.get-started'),
  ctaBtn: document.getElementById('get-started-btn'),
}

const SearchView = {
  viewContainer: document.querySelector('.new-trip'),
  whereTo: document.getElementById('where-to'),
  startDate: document.getElementById('trip-start-date'),
  ctaBtn: document.getElementById('search-btn'),
  loadingContainer: document.querySelector('.new-trip-loading'),
}

const TripView = {
  viewContainer: document.getElementById('modal'),
  closeCTABtn: document.querySelector('.close-modal'),
  saveCTABtn: document.getElementById('save-trip-btn'),
  location: {
    image: document.getElementById('loc-img'),
    name: document.getElementById('loc-name'),
    date: document.getElementById('loc-date'),
  },
  weather: {
    viewContainer: document.querySelector('.modal-item.weather'),
  },
  flight: {
    noDataContainer: document.querySelector('.no-data.flight'),
    withDataContainer: document.querySelector('.with-data.flight'),
    addCTABtn: document.querySelector('.add-item.flight'),
    addCTAView: {
      viewContainer: document.querySelector('.modal-item-cta-input.flight'),
      fromPlace: document.getElementById('from-place'),
      fromDate: document.getElementById('from-date'),
      fromTime: document.getElementById('from-time'),
      toPlace: document.getElementById('to-place'),
      toDate: document.getElementById('to-date'),
      toTime: document.getElementById('to-time'),
      newEntryCTABtn: document.querySelector('.new-item.flight'),
    }
  },
  packing: {
    noDataContainer: document.querySelector('.no-data.packing'),
    withDataContainer: document.querySelector('.with-data.packing'),
    addCTABtn: document.querySelector('.add-item.packing'),
    addCTAView: {
      viewContainer: document.querySelector('.new-item.packing'),
      itemName: document.querySelector('.new-item-name'),
      newEntryCTABtn: document.querySelector('.new-item-icon'),
    }
  },
  countryinfo: {
    viewContainer: document.querySelector('.modal-item.country-info'),
  }
}

const SavedTripsView = {
  viewContainer: document.getElementById('saved-trips'),
  noDataContainer: document.querySelector('.no-data.bookmarks'),
  withDataContainer: document.querySelector('.with-data.container'),
  bookmarks: document.querySelector('.with-data.bookmarks'),
}

function UserEntry(destination, startDate) {
  this.destination = destination;
  this.startDate = startDate;
}

function FlightTicket(fromPlace, fromDate, fromTime, toPlace, toDate, toTime) {
  this.fromPlace = fromPlace;
  this.fromDate = fromDate;
  this.fromTime = fromTime;
  this.toPlace = toPlace;
  this.toDate = toDate;
  this.toTime = toTime;
}

function PackingItem(id, name, isPacked=false) {
  this.id = id;
  this.name = name;
  this.isPacked = isPacked;
}

export { GetStartedView, SearchView, TripView, SavedTripsView, UserEntry, FlightTicket, PackingItem }
