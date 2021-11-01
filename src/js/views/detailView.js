import icons from 'url:../../img/icons.svg'; // Parcel 2
import noBook from 'url:../../img/no-book-cover-available.jpg'; // Parcel 2
class DetailView {
  _parentEl = document.querySelector('.book__detail');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  addBookmarkHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__bookmarks');
      if (!btn) return;
      handler();
    });
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    if (Object.keys(this._data).length !== 0) {
      return `
        <button class="btn__bookmarks">
          <svg>
            <use href="${icons}#icon-bookmark${
        this._data.bookmarked ? '-fill' : ''
      }"></use>
          </svg>
        </button>
        <div class="book__main-img">
            <img src="${
              this._data.imageUrl ? this._data.imageUrl : noBook
            }" alt="test" />
        </div>
        <div class="book__content">
        <h1 class="book__title">
            ${this._data.title}
        </h1>
        <div class="content__control">
          <div class="content__control-authors">
            <p>저자</p>
            <p>${this._data.authors}</p>
            <p>역자</p>
            <p>${this._data.translators}</p>
          </div>
          <div class="content__control-publisher">
            <p>출판</p>
            <p>${
              this._data.publisher.length > 0 ? this._data.publisher : '없음'
            }</p>
            <p>${this._data.datetime.split('T')[0]}</p>
          </div>
          <div class="content__control-price">
            <p class="price">판매가</p>
            <p>${this._data.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</p>
          </div>
        </div>
      </div> 
        `;
    } else {
      return '<h1 class="noDetail__message"> 😀 Start by searching books. Have fun!  <h1>';
    }
  }
}

export default new DetailView();
