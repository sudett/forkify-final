import { API_URL } from "./config";

export const state = {
  search: {
    query: "",
    results: [],
  },
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const res = await fetch(`${API_URL}?search=${query}`);

    const data = await res.json();

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
