// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Create Bookmark for a Saved Trip
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

/* Example of a Bookmark
<div class="bookmark BookmarkNum1">
  <div id="BookmarkNum1" class="bm-remove"><i class="fas fa-times"></i></div>
  <div class="bm-data image">
    <img class="bm-image BookmarkNum1" src="" alt="Destination Image">
  </div>
  <div class="bm-data loc">
    <h3 class="bm-dest">Mumbai, India</h3>
    <h6 class="bm-date">Thurs, Aug 26th, 2021</h6>
  </div>
</div> */

export default (data = {}) => {

  try {
    let bookmark = document.createElement('div');
    bookmark.classList.add('bookmark', data.tripId);

    let deleteBookmark = document.createElement('div');
    deleteBookmark.classList.add('bm-remove');
    deleteBookmark.id = data.tripId;
    let deleteBookmarkIcon = document.createElement('i');
    deleteBookmarkIcon.classList.add('fas', 'fa-times');

    let imageBookmark = document.createElement('div');
    imageBookmark.classList.add('bm-data', 'image');
    let image = document.createElement('img');
    image.classList.add('bm-image', data.tripId);
    image.src = data.graphics.previewURL;

    let locBookmark = document.createElement('div');
    locBookmark.classList.add('bm-data', 'loc');
    let destBookmark = document.createElement('h3');
    destBookmark.classList.add('bm-dest');
    destBookmark.textContent = data.destination;
    let dateBookmark = document.createElement('h6');
    dateBookmark.classList.add('bm-date');
    dateBookmark.textContent = (new Date(data.startDate)).toUTCString().slice(0,16);

    deleteBookmark.appendChild(deleteBookmarkIcon);
    imageBookmark.appendChild(image);
    locBookmark.appendChild(destBookmark);
    locBookmark.appendChild(dateBookmark);
    bookmark.appendChild(deleteBookmark);
    bookmark.appendChild(imageBookmark);
    bookmark.appendChild(locBookmark);

    return bookmark;
  }
  catch(error) {
    console.log('******************** Create Bookmark Error ******************** \n', error);
  }
}
