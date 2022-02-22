import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again ;)";

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    // console.log(id);
    return this._data
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
        <p>${this._errorMessage}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsView();
