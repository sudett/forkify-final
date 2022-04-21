import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  recipe: {},
  bookmarks: [],
};

// Load all search results
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    state.search.page = 1;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// send results for specific page
export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  return state.search.results.slice(
    (page - 1) * state.search.resultsPerPage,
    page * state.search.resultsPerPage
  );
};

// Load single recipe
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      image: recipe.image_url,
      title: recipe.title,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Update servings
export const updateServings = (newServings) => {
  state.recipe.ingredients.map((ing) => {
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
    // newQt = newServings * oldQt / oldServings
  });

  state.recipe.servings = newServings;
};

// Persist bookmarks
const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  console.log("persist");
};

// Add bookmark
export const addBookmark = (recipe) => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Persist bookmarks
  persistBookmarks();
};

// Remove bookmark
export const removeBookmark = (id) => {
  // Remove bookmark
  const removeIndex = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === id
  );

  state.bookmarks.splice(removeIndex, 1);

  // Unmark current recipe
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Persist bookmarks
  persistBookmarks();
};

// Retrieve bookmarks
export const retrieveBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  if (bookmarks.length > 0) state.bookmarks = bookmarks;
};
