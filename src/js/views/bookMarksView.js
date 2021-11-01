import icons from 'url:../../img/icons.svg'; // Parcel 2
import noBookImg from 'url:../../img/no-book-cover-available.jpg';
class BookMarksView {
  _parentEl = document.querySelector('.bookmarks-list');
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }

  addBookmarkHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const bookItem = e.target.closest('.bookmarks-item');
      if (!bookItem) return;
      handler(bookItem.dataset.id);
    });
  }

  initializeBookmark(handler) {
    window.addEventListener('load', () => {
      handler();
    });
  }
  _generateMarkup() {
    return this._data
      .map(
        book => `
          <li class="bookmarks-item book-item" data-id=${book.id}>
              <div class="book-thumnail">
                  <img src="${
                    book.imageUrl ? book.imageUrl : noBookImg
                  }" alt="book" />
              </div>
              <div class="book-dsec">
                  <p class="title">${book.title.slice(0, 10)}</p>
                  <p class="author">${book.authors[0]}</p>
              </div>
          </li>
    `
      )
      .join('');
  }
}

export default new BookMarksView();
