/**
 * @jest-environment jsdom
 */

const createBookmark = require('../js/components/bookmark.js').default;

test('Check if Bookmark is getting created', () => {

  const data = {
    tripId: 'BookmarkTest',
    destination: 'TestDest',
    startDate: new Date(),
    graphics: {
      previewURL: 'TestURL',
    }
  }
  const bookmark = createBookmark(data);
  expect(bookmark.childElementCount).toBe(3);
  expect(bookmark.classList.contains('BookmarkTest')).toBe(true);
  expect(bookmark.tagName).toBe('DIV');
});
