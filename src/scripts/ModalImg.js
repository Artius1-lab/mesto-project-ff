import Modal from "./Modal.js";

export default class PopupWithImage extends Modal {
  constructor(popup) {
    super(popup);
    this._imageTitle = this._popup.querySelector(".popup__image-title");
    this._imageView = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageView.setAttribute("alt", name);
    this._imageView.setAttribute("src", link);
    this._imageTitle.textContent = name;
    super.open();
  }
}
