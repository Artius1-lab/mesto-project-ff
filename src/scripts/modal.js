const createModal = (popup) => {
  const open = () => {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeWhenPressEsc);
  };

  const close = () => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeWhenPressEsc);
  };

  const closeWhenPressEsc = (e) => {
    if (e.key === "Escape") close();
  };

  const setEventListeners = () => {
    popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__close-button")) close();
    });
  };

  return { open, close, setEventListeners };
};

const createPopupWithForm = (popup, popupSubmitCallback) => {
  const _popupForm = popup.querySelector(".popup__form");
  const _formInputList = _popupForm.querySelectorAll(".popup__input");
  const _submitButton = _popupForm.querySelector(".popup__save-button");
  const _textSubmitButton = _submitButton.textContent;
  const _textSubmitButtonActive = 'Saving...';

  const modal = createModal(popup);

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

  modal.setEventListeners();

  return { ...modal, close, getInputs, setInputValues, startLoading, stopLoading };
};

const createPopupWithImage = (popup) => {
  const _imageTitle = popup.querySelector(".popup__image-title");
  const _imageView = popup.querySelector(".popup__image");

  if (!_imageTitle || !_imageView) {
    console.error("Image title or image view not found in popup!");
  }

  const modal = createModal(popup);

  const open = (name, link) => {
    console.log("Opening popup with name:", name, "link:", link);
    if (_imageView && _imageTitle) {
      _imageView.alt = name;
      _imageView.src = link;
      _imageTitle.textContent = name;
    }
    modal.open();
  };

  const close = () => modal.close();

  modal.setEventListeners();

  return { open, close };
};

const createDeleteConfirmationModal = (popup, popupSubmitCallback) => {
  const _button = popup.querySelector('.popup__save-button_place_delete-card');
  let _card;

  const modal = createModal(popup);

  const setDeleteCard = (card) => {
    _card = card;
  };

  const open = () => {
    modal.open();
    _button.addEventListener('click', () => popupSubmitCallback(_card), { once: true });
  };

  const close = () => modal.close();

  modal.setEventListeners();

  return { ...modal, setDeleteCard, open, close };
};

export { createModal, createPopupWithForm, createPopupWithImage, createDeleteConfirmationModal };
