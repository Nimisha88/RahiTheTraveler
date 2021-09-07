/**
 * @jest-environment jsdom
 */

const createCountryInfo = require('../js/components/country-info.js').default;

test('Check if empty CountryInfo is resulting in error', () => {
  expect(createCountryInfo().classList.contains('with-error')).toBe(true);
  expect(createCountryInfo().tagName).toBe('DIV');
});

test('Check if CountryInfo is being created', () => {
  const data = {
      status: 200,
      type: "countryinfo",
      name: "United States of America",
      capital: "Washington, D.C.",
      nativeName: "United States",
      currency: {
        code: "USD",
        name: "United States dollar",
        symbol: "$"
      },
      firstLang: {
        iso639_1: "en",
        iso639_2: "eng",
        name: "English",
        nativeName: "English"
      },
      flag: "https://restcountries.eu/data/usa.svg"
    }

  const conutryinfo = createCountryInfo(data);
  expect(conutryinfo.childElementCount).toBe(4);
  expect(conutryinfo.classList.contains('country-info')).toBe(true);
  expect(conutryinfo.tagName).toBe('DIV');
});
