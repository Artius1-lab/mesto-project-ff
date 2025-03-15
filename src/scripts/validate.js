const createFormValidator = (settings, formElement) => {
  const _inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const _submitButton = formElement.querySelector(settings.submitButtonSelector);

  const toggleSubmitButtonState = () => {
    _hasInvalidInput() ? _disableSubmitButton() : _activateSubmitButton();
  };

  const resetValidation = () => {
    _disableSubmitButton();
    _inputList.forEach(_hideInputError);
  };

  const enableValidation = () => {
    formElement.addEventListener("submit", (e) => e.preventDefault());
    _setEventListeners();
  };

  const _checkInputValidity = (element) => {
    !element.validity.valid ? _showInputError(element) : _hideInputError(element);
  };

  const _showInputError = (element) => {
    const errorId = formElement.querySelector(`.${element.id}-error`);
    element.classList.add(settings.inputErrorClass);
    errorId.classList.add(settings.errorClass);
    errorId.textContent = element.validationMessage;
  };

  const _hideInputError = (element) => {
    const errorId = formElement.querySelector(`.${element.id}-error`);
    element.classList.remove(settings.inputErrorClass);
    errorId.classList.remove(settings.errorClass);
    errorId.textContent = "";
  };

  const _hasInvalidInput = () => _inputList.some(element => !element.validity.valid);

  const _disableSubmitButton = () => {
    _submitButton.classList.add(settings.inactiveButtonClass);
    _submitButton.disabled = true;
  };

  const _activateSubmitButton = () => {
    _submitButton.classList.remove(settings.inactiveButtonClass);
    _submitButton.disabled = false;
  };

  const _setEventListeners = () => {
    toggleSubmitButtonState();
    _inputList.forEach(element => {
      element.addEventListener("input", () => {
        _checkInputValidity(element);
        toggleSubmitButtonState();
      });
    });
  };

  return { enableValidation, resetValidation };
};

export default createFormValidator;
