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
