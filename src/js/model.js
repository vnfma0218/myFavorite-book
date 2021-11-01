import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  book: {},
  search: {
    query: '',
    page: 1,
    results: [],
    isLast: false,
  },
  bookmarks: [],
};

export const loadBookDetail = async function (isbn) {
  try {
    if (!isbn) return;
    const data = await getJSON(`${API_URL}?target=isbn`, isbn);

    state.book = data.documents.map(book => {
      return {
        id: book.isbn,
        title: book.title,
        imageUrl: book.thumbnail,
        authors: book.authors,
        contents: book.contents,
        price: book.price,
        translators: book.translators,
        publisher: book.publisher,
        datetime: book.datetime,
      };
    })[0];
    const bookmarked = state.bookmarks.some(b => b.id === state.book.id);
    if (!bookmarked) state.book.bookmarked = false;
    else state.book.bookmarked = true;
  } catch (error) {}
};

export const loadSearchResults = async function (query, page = 1) {
  state.search.query = query;

  try {
    state.search.query = query;
    state.search.page = page;
    const data = await getJSON(
      `${API_URL}?target=title`,
      query,
      state.search.page
    );
    state.search.isLast = data.meta.is_end;
    state.search.results = data.documents.map(book => {
      return {
        id: book.isbn,
        title: book.title,
        imageUrl: book.thumbnail,
        authors: book.authors,
        contents: book.contents,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (book) {
  state.bookmarks.push(book);
  state.book.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmakrs = function (book) {
  const bookmarks = [...state.bookmarks];
  const filteredBookmakrs = bookmarks.filter(b => b.id !== book.id);
  state.book.bookmarked = false;
  state.bookmarks = filteredBookmakrs;
  persistBookmarks();
};
