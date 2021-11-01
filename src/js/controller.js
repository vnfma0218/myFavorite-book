import * as model from './model.js';
import detailView from './views/detailView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlBookDetail = async function () {
  try {
    //get isbn
    const isbn = resultsView.getIsbn();
    if (!isbn) return;
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
    console.log(query, gotoPage);
    if (!query) return;

    // 2) get data
    await model.loadSearchResults(query, gotoPage);

    // 3) render html
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagingResults = async function (gotoPage) {
  try {
    console.log(gotoPage);
    resultsView.renderSpinner();
    await model.loadSearchResults(model.state.search.query, gotoPage);
    resultsView.render(model.state.search.results);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerRender(controlBookDetail);
  paginationView.addHandlerClick(controlPagingResults);
};

init();
