// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

import * as HelperFns from './components/helper-fns.js';
import { UserEntry } from './components/objects.js';
import { postAsync, getAsync } from './components/apis.js';


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Global Constants and Variables
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const whereTo = document.getElementById('where-to');
const tripStartDate = document.getElementById('trip-start-date');
const searchCTABtn = document.getElementById('search-btn');
const todaysDate = new Date();
let latestSearchEntry, getResult;

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
// processSearchRequest() - Process User Request
// -----------------------------------------------------------------------------

async function processSearchRequest() {
  latestSearchEntry = new UserEntry(whereTo.value, tripStartDate.value);
  console.log(JSON.stringify(latestSearchEntry));

  try {
    await postAsync('/api/lookupDestination', latestSearchEntry);
    getResult = await getAsync('/api/getLookupResults');
    console.log('In Process Request: \n' + JSON.stringify(getResult));
  }
  catch(error) {
    console.log('******************** Processing Search Request Failed ******************** \n', error);
  }
}

// Add SearchCTA Event Lisenters
function addSearchCTAEventListeners() {

  // TripStartDate
  tripStartDate.addEventListener('click', (event) => {
    // Date input's min attrubute accepts value in syntax: 2021-08-14
    tripStartDate.min = `${todaysDate.getFullYear()}-${HelperFns.toTwoDigit(todaysDate.getMonth()+1)}-${HelperFns.toTwoDigit(todaysDate.getDate())}`;
    console.log(`Date: ${tripStartDate.min}`);
  });

  // SearchCTABtn
  searchCTABtn.addEventListener('click', (event) => {
    // TODO: Add ClientSide Validations
    processSearchRequest();
    console.log('In EventListener, Request processed');
  });

}

addSearchCTAEventListeners();
