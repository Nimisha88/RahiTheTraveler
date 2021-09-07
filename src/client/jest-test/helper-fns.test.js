/**
 * @jest-environment jsdom
 */

const HelperFns = require('../js/components/helper-fns.js');

test('Check if one digit number is getting converted to two digit', () => {
  expect(HelperFns.toTwoDigit(3)).toBe('03');
  expect(HelperFns.toTwoDigit(13)).toBe(13);
});

test('Check if child elements are deleted', () => {
  const divEle = document.createElement('div');
  divEle.appendChild(document.createElement('p'));
  divEle.appendChild(document.createElement('h1'));
  divEle.appendChild(document.createElement('section'));

  expect(divEle.childElementCount).toBe(3);
  expect(divEle.tagName).toBe('DIV');
  HelperFns.destructElementChildren(divEle);
  expect(divEle.childElementCount).toBe(0);
});

test('Check if setting and getting Local Storage is working', () => {
  HelperFns.setLocalStorage('TestName', 'LocalStorageTest');
  const savedTestName = HelperFns.getLocalStorage('TestName');
  expect(savedTestName).toBe('LocalStorageTest');
});

test('Check if Error Container is created', () => {
  HelperFns.setLocalStorage('TestName', 'LocalStorageTest');
  const errorContainer = HelperFns.createErrorDisplay();
  expect(errorContainer.childElementCount).toBe(1);
  expect(errorContainer.tagName).toBe('DIV');
  expect(errorContainer.classList.contains('with-error')).toBe(true);
});
