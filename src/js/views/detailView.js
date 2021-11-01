import icons from 'url:../../img/icons.svg'; // Parcel 2
class DetailView {
  _parentEl = document.querySelector('.book__detail');

  render(data) {
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
    return this._data
      .map(
        book => `
        <div class="book__main-img">
            <img src="${book.imageUrl}" alt="test" />
        </div>
        <div class="book__content">
        <h1 class="book__title">
            ${book.title}
        </h1>
        <div class="content__control">
          <div class="content__control-authors">
            <p>저자</p>
            <p>${book.authors}</p>
            <p>역자</p>
            <p>${book.translators}</p>
          </div>
          <div class="content__control-publisher">
            <p>출판</p>
            <p>${book.publisher.length > 0 ? book.publisher : '없음'}</p>
            <p>${book.datetime.split('T')[0]}</p>
          </div>
          <div class="content__control-price">
            <p class="price">판매가</p>
            <p>${book.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</p>
          </div>
        </div>
      </div> 
        `
      )
      .join('');
  }
}

export default new DetailView();
