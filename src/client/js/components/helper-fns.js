// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------
// toTwoDigit(val) - Convert a single digit number in 2 digits
// createErrorDisplay(containerName='') - Create Error display container
// destructElementChildren(element) - Deletes all child elements
// setLocalStorage(key, value) - Stores in the Local Storage
// getLocalStorage(key = 'SavedTrips') - Retrieves from the Local Storage
// -----------------------------------------------------------------------------

export const toTwoDigit = (val) => {
  if (val < 10) {
    return `0${val}`;
  } else {
    return val;
  }
}

export const createErrorDisplay = (containerName='') => {
  let errorContainer = document.createElement('div');
  errorContainer.classList.add('with-error');
  let errorText = document.createElement('h3');
  errorText.classList.add('text-alt');
  errorText.textContent = containerName == '' ? 'Information Unavailable ...' : `${containerName} Information Unavailable ...`;
  errorContainer.appendChild(errorText);
  return errorContainer;
}

export const destructElementChildren = (element) => {
  // console.log('******************** Destructing Elements ******************** \n');
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export const reloadPage = () => {
  let locHref = location.href;
  location.href += '#top';
  window.location.reload();
  location.href = locHref;
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key = 'SavedTrips') => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return {};
  }
}
