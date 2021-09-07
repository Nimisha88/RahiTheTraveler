/**
 * @jest-environment jsdom
 */

const createFlightTicket = require('../js/components/flight-ticket.js').default;

test('Check if Flight Ticket is getting created', () => {

  const ftData = {
    fromPlace: 'Place1',
    fromDate: new Date(),
    fromTime: '22:30',
    toPlace: 'Place1',
    toDate: new Date(),
    toTime: '03:40',
  }

  const ticket = createFlightTicket(ftData);
  expect(ticket.childElementCount).toBe(2);
  expect(ticket.classList.contains('ticket')).toBe(true);
  expect(ticket.tagName).toBe('DIV');
});
