const input = document.querySelector('.search__book input');
const form = document.querySelector('.search__book');
const paging = document.querySelector('.book-page');
let books = [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // http://localhost:3000
  axios
    .get('https://dapi.kakao.com/v3/search/book?target=title', {
      params: {
        query: input.value,
        page: 1,
        size: 5,
      },
      headers: {
        Authorization: 'KakaoAK d6cc2b464f604773f53fa114c017c2d0',
      },
    })
    .then((res) => {
      return res.data.documents.forEach((doc) => books.push(doc));
    })
    .then(() => {
      input.value = '';
      renderBookList();
    })
    .catch((err) => console.log(err));
});
function renderBookList() {
  const bookListHook = document.querySelector('.book-list');

  for (const book of books) {
    const title = book.title;
    const slicedTitle = title.substring(0, 8);
    const bookEl = document.createElement('li');
    bookEl.className = 'book-item';
    bookEl.innerHTML = `
    <div class="book-thumnail">
      <img src=${book.thumbnail} alt="bookImg" />
    </div>
    <p class="book-dsec">${slicedTitle}..</p>
    `;
    const divider = document.createElement('div');
    divider.className = 'divider';
    bookListHook.append(bookEl);
    bookListHook.append(divider);
  }
}
