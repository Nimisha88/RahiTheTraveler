/**
 * @jest-environment jsdom
 */

const createFlightTicket = require('../js/components/flight-ticket.js').default;

test('Check if Result Container is getting created', () => {
  expect(createFlightTicket().classList.contains('ticket')).toBe(true);
  expect(createFlightTicket().tagName).toBe('DIV');
});
