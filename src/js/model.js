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
};

export const loadBookDetail = async function (isbn) {
  try {
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
    });
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
