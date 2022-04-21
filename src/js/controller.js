import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  state,
  loadSearchResults,
  getSearchResultsPage,
  loadRecipe,
  updateServings,
  addBookmark,
  removeBookmark,
  retrieveBookmarks,
} from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView";
import bookmarksView from "./views/bookmarksView";

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

    // Update results (mark selected search result)
    resultsView.update(getSearchResultsPage());

    // Update bookmarks view
    bookmarksView.update(state.bookmarks);
    // console.log(state.recipe);
  } catch (err) {
    // console.error(err);
    recipeView.renderError();
    console.log(err);
  }
};

// Servings
const controlServings = (newServings) => {
  // Update the recipe servings (state)
  updateServings(newServings);

  // Update the recipe view
  recipeView.update(state.recipe);
};

// Add bookmark
const controlAddBookmark = () => {
  if (state.recipe.bookmarked) {
    // Remove bookmark
    removeBookmark(state.recipe.id);
  } else {
    // Add bookmark
    addBookmark(state.recipe);
  }

  // Update recipe view
  recipeView.update(state.recipe);

  // Render bookmark view
  bookmarksView.render(state.bookmarks);
};

// Render bookmarks on loading page
const controlRenderBookmarks = () => {
  bookmarksView.render(state.bookmarks);
};

// Initialization
const init = () => {
  retrieveBookmarks();
  bookmarksView.renderBookmarksHandler(controlRenderBookmarks);
  searchView.searchQueryHandler(controlSearchResults);
  paginationView.paginationHandler(controlPagination);
  resultsView.previewClickHandler(controlRecipe);
  recipeView.loadRenderHandler(controlRecipe);
  recipeView.updateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  bookmarksView.previewClickHandler(controlRecipe);
};

init();
