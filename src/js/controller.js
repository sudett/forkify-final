import { state, loadSearchResults, getSearchResultsPage } from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

// Search results
const controlSearchResults = async () => {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Render spinner
    resultsView.renderSpinner();

    // Load search results
    await loadSearchResults(query);

    // Render results
    resultsView.render(getSearchResultsPage());

    // Render initial pagination
    paginationView.render(state.search);
  } catch (err) {
    console.error(err);
  }
};

// Pagination
const controlPagination = (goto) => {
  // Render results
  resultsView.render(getSearchResultsPage(goto));

  // Render pagination
  paginationView.render(state.search);
};

const init = () => {
  searchView.searchHandler(controlSearchResults);
  paginationView.clickHandler(controlPagination);
};

init();
