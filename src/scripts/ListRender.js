export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._clear();
    items.forEach((card) => {
      this.addItem(card);
    });
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  _clear() {
    this._container.innerHTML = "";
  }
}
