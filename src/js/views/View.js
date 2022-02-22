export default class View {
  _data;

  render(data) {
    this._data = data;

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
