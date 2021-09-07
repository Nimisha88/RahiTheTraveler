/**
 * @jest-environment jsdom
 */

const createWeatherInfo = require('../js/components/weather.js').default;

test('Check if empty Weather is resulting in error', () => {
  expect(createWeatherInfo().classList.contains('with-error')).toBe(true);
  expect(createWeatherInfo().tagName).toBe('DIV');
});

test('Check if Weather is being created', () => {

  const data = {
    date: "2021-09-02",
    weather: {
      icon: "t03d",
      code: 202,
      description: "Thunderstorm with heavy rain"
    },
    maxTemp: 73.5,
    minTemp: 58.1,
    feelsLikeTemp: 73,
    humidity: 80,
    wind: "13.9 NW",
    sunrise: 1630578251,
    sunset: 1630625073,
  }

  const weather = createWeatherInfo(data);
  expect(weather.childElementCount).toBe(4);
  expect(weather.classList.contains('weather')).toBe(true);
  expect(weather.tagName).toBe('DIV');
});
