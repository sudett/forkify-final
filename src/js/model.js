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
};

// Load all search results
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const res = await fetch(`${API_URL}?search=${query}`);

    const data = await res.json();
    // console.log(res, data);

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
  } catch (err) {
    console.error(err);
    throw err;
  }
};
