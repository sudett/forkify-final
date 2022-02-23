import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again ;)";

  resultClickHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const targetPreview = e.target.closest(".preview");

      if (!targetPreview) return;

      const previewId = targetPreview?.dataset.id;

      handler(previewId);
    });
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(
        (preview) => `
        <li class="preview" data-id="${preview.id}">
          <a class="preview__link ${
            preview.id === id ? "preview__link--active" : ""
          }" href="#${preview.id}">
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
}

export default new ResultsView();
