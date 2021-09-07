/**
 * @jest-environment jsdom
 */

const createPackingItem = require('../js/components/packing-item.js').default;

test('Check if Packing Item is getting created', () => {

  const data = {
    id: 'TestItem',
    name: 'TestItemName',
    isPacked: true,
  }
  const packingItem = createPackingItem(data);
  expect(packingItem.childElementCount).toBe(3);
  expect(packingItem.classList.contains('packing-item')).toBe(true);
  expect(packingItem.tagName).toBe('DIV');
});
