import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  renderBookmarksHandler(handler) {
    window.addEventListener("load", handler);
  }

  previewClickHandler(handler) {
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

export default new BookmarksView();
