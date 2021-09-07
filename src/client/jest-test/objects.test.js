/**
 * @jest-environment jsdom
 */

import { GetStartedView,
         SearchView,
         TripView,
         SavedTripsView,
         UserEntry,
         FlightTicket,
         PackingItem } from '../js/components/objects.js';

test('Check if UserEntry object is created', () => {
  const obj = new UserEntry('TestDest', '2021-09-06');
  expect(obj.destination).toBe('TestDest');
  expect(obj.startDate).toBe('2021-09-06');
});

test('Check if FlightTicket object is created', () => {
  const obj = new FlightTicket('TestFrom', new Date(), '23:30', 'TestTo', new Date(), '03:40');
  expect(obj.fromPlace).toBe('TestFrom');
  expect(obj.toTime).toBe('03:40');
});

test('Check if PackingItem object is created', () => {
  const obj = new PackingItem('TestItem', 'TestItemName', true);
  expect(obj.id).toBe('TestItem');
  expect(obj.name).toBe('TestItemName');
  expect(obj.isPacked).toBe(true);
});
