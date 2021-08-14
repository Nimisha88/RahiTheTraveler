// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

import { UserEntry } from './components/object-components.js';
import { postAsync, getAsync } from './components/api-components.js';

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Global Constants and Variables
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const whereTo = document.getElementById('where-to');
const tripStartDate = document.getElementById('trip-start-date');
const searchCTABtn = document.getElementById('search-btn');

async function processSearchRequest() {
  let latestSearchEntry = new UserEntry(whereTo.value, tripStartDate.value);
  console.log(JSON.stringify(latestSearchEntry));

  try {
    await postAsync('/api/lookupDestination', latestSearchEntry);
    let getResult = await getAsync('/api/getLookupResults');
    console.log('In Process Request: \n' + JSON.stringify(getResult));
  }
  catch(error) {
    console.log('******************** Processing Search Request Failed ******************** \n', error);
  }
}

function addSearchCTAEventListener() {
  searchCTABtn.addEventListener('click', () => {
    // TODO: Add ClientSide Validations
    processSearchRequest();
  });
}

addSearchCTAEventListener();
