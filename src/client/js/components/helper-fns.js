// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------
// toTwoDigit(val) - Convert a single digit number in 2 digits
// -----------------------------------------------------------------------------

export function toTwoDigit(val) {
  if (val < 10) {
    return `0${val}`;
  } else {
    return val;
  }
}

export function createErrorDisplay(containerName='') {
  let errorContainer = document.createElement('div');
  errorContainer.classList.add('with-error');
  let errorText = document.createElement('h3');
  errorText.classList.add('text-alt');
  errorText.textContent = containerName == '' ? 'Information Unavailable ...' : `${containerName} Information Unavailable ...`;
  errorContainer.appendChild(errorText);
  return errorContainer;
}

export function destructElementChildren(element) {
  // console.log('******************** Destructing Elements ******************** \n');
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export function reloadPage() {
  let locHref = location.href;
  location.href += '#top';
  window.location.reload();
  location.href = locHref;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key = 'SavedTrips') {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return {};
  }
}
