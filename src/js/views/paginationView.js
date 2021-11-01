class PaginationView {
  _parentEl = document.querySelector('.book-pagination');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.page-btn');
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const isLast = this._data.isLast;

    //   first, there are no other page
    if (curPage === 1 && !isLast) {
      return `
        <button data-goto="${curPage + 1}" class="page-btn next__btn">
            <span>page ${curPage + 1}</span>
        </button>
      `;
    }

    // there are other page

    if (curPage !== 1 && !isLast) {
      return `
        <button data-goto="${curPage - 1}" class="page-btn prev__btn">
            <span>page ${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="page-btn next__btn">
            <span>page ${curPage + 1}</span>
        </button>
      `;
    }

    // last page
    if (curPage !== 1 && isLast) {
      return `
        <button data-goto="${curPage - 1}" class="page-btn prev__btn">
            <span>page ${curPage - 1}</span>
        </button>
      `;
    }
    return '';
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}

export default new PaginationView();
