export default class Modal {
  constructor(popup) {
    this._popup = popup;
    this._closeWhenPressEsc = this._closeWhenPressEsc.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeWhenPressEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeWhenPressEsc);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__close-button")
      )
        this.close();
    });
  }

  _closeWhenPressEsc(e) {
    if (e.key === "Escape") this.close();
  }
}
