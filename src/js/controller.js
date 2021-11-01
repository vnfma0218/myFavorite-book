import * as model from './model.js';
import bookMarksView from './views/bookMarksView.js';
import detailView from './views/detailView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlBookDetail = async function (isbn) {
  try {
    detailView.renderSpinner();

    // get data
    await model.loadBookDetail(isbn);

    // render html
    detailView.render(model.state.book);
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResults = async function (gotoPage) {
  try {
    resultsView.renderSpinner();
    // 1) get input
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query, gotoPage);

    // 2) get data
    await model.loadSearchResults(query);

    // 3) render html
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagingResults = async function (gotoPage) {
  try {
    resultsView.renderSpinner();
    await model.loadSearchResults(model.state.search.query, gotoPage);
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlBookmark = function () {
  // add or delete bookmark
  if (model.state.book.bookmarked) {
    model.deleteBookmakrs(model.state.book);
  } else {
    model.addBookmarks(model.state.book);
  }

  // update book detail
  detailView.update(model.state.book);

  //add to html
  bookMarksView.render(model.state.bookmarks);
};

const controlbookmarkRender = function () {
  bookMarksView.render(model.state.bookmarks);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerRender(controlBookDetail);
  paginationView.addHandlerClick(controlPagingResults);
  detailView.addBookmarkHandler(controlBookmark);
  bookMarksView.initializeBookmark(controlbookmarkRender);
  bookMarksView.addBookmarkHandler(controlBookDetail);
};

init();
