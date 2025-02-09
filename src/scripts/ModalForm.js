import Popup from "./Modal.js";

export default class PopupWithForm extends Popup {
  constructor(popup, popupSubmitCallback) {
    super(popup);
    this._popupSubmitCallback = popupSubmitCallback;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._formInputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._textSubmitButton = this._submitButton.textContent;
    this._textSubmitButtonActive = 'Сохранение...';
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  getInputs() {
    return this._getInputValues();
  }

  setInputValues(data) {
    this._formInputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.startLoading();
      this._popupSubmitCallback(this.getInputs());
    });
  }

  startLoading() {
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._textSubmitButtonActive;
  }

  stopLoading() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._textSubmitButton;
  }

  _getInputValues() {
    this._inputs = {};
    this._formInputList.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }
}
