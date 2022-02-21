import icons from "url:../../img/icons.svg";

class ResultsView {
  #parentElement = document.querySelector(".results");
  #errorMessage = "No recipes found for your query. Please try again ;)";

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup(results) {
    const id = window.location.hash.slice(1);
    // console.log(id);
    return results
      .map(
        (preview) => `
        <li class="preview">
          <a class="preview__link ${
            preview.id === id ? "preview__link--active" : ""
          } " href="#${preview.id}">
            <figure class="preview__fig">
              <img src="${preview.image}" alt="${preview.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${preview.title}</h4>
              <p class="preview__publisher">${preview.publisher}</p>
            </div>
          </a>
        </li>
  `
      )
      .join("");
  }

  renderError() {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this.#errorMessage}</p>
      </div>
    `;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    const markup = this.#generateMarkup(data);
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsView();
