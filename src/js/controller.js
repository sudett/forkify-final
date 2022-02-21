import { state, loadSearchResults } from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

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
    resultsView.render(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  searchView.searchHandler(controlSearchResults);
};

init();
