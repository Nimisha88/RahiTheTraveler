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

export function destructElementChildren(element) {
  while(element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export function reloadPage() {
  let locHref = location.href;
  location.href += '#top';
  window.location.reload();
  location.href = locHref;
}
