import createModal from "./Modal";

const createPopupWithForm = (popup, popupSubmitCallback) => {
  const _popupForm = popup.querySelector(".popup__form");
  const _formInputList = _popupForm.querySelectorAll(".popup__input");
  const _submitButton = _popupForm.querySelector(".popup__save-button");
  const _textSubmitButton = _submitButton.textContent;
  const _textSubmitButtonActive = 'Saving...';

  const close = () => {
    _popupForm.reset();
    modal.close();
  };

  const getInputs = () => {
    return Array.from(_formInputList).reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  };

  const setInputValues = (data) => {
    _formInputList.forEach(input => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      }
    });
  };

  const startLoading = () => {
    _submitButton.disabled = true;
    _submitButton.textContent = _textSubmitButtonActive;
  };

  const stopLoading = () => {
    _submitButton.disabled = false;
    _submitButton.textContent = _textSubmitButton;
  };

  _popupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading();
    popupSubmitCallback(getInputs())
      .finally(() => stopLoading());
  });

  const modal = createModal(popup);
  modal.setEventListeners();

  return { ...modal, close, getInputs, setInputValues, startLoading, stopLoading };
};

export default createPopupWithForm