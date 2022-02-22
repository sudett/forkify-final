import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  state,
  loadSearchResults,
  getSearchResultsPage,
  loadRecipe,
} from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView";

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

// Recipe
const controlRecipe = async (id) => {
  try {
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // Load recipe
    await loadRecipe(id);

    // Render recipe
    recipeView.render(state.recipe);
  } catch (err) {
    // console.error(err);

    recipeView.renderError();
  }
};

// Initialization
const init = () => {
  searchView.searchHandler(controlSearchResults);
  paginationView.clickHandler(controlPagination);
  resultsView.clickHandler(controlRecipe);
  recipeView.loadHandler(controlRecipe);
};

init();
