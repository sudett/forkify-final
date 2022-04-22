import View from "./View";
import { CLOSE_MODAL_SEC } from "../config";
import icons from "url:../../img/icons.svg";

class UploadRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was suuccessfully uploaded :)";

  _modal = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnAdd = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();

    // call these functions on initialization
    this._openModalHandler();
    this._closeModalHandler();
  }

  _toggleModal() {
    this._modal.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _openModalHandler() {
    this._btnAdd.addEventListener("click", () => this._toggleModal());
  }

  _closeModalHandler() {
    [this._btnClose, this._overlay].forEach((el) =>
      el.addEventListener("click", () => this._toggleModal())
    );
  }

  // form submit handler
  uploadHandler(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      // select inputs data
      const dataArr = [...new FormData(this._parentElement)];

      const data = Object.fromEntries(dataArr);

      handler(data);

      // close modal
      setTimeout(() => {
        this._toggleModal();
      }, CLOSE_MODAL_SEC * 1000);
    });
  }
}

export default new UploadRecipeView();
