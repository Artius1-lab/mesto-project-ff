import createModal from "./Modal";

const createPopupWithImage = (popup) => {
  const _imageTitle = popup.querySelector(".popup__image-title");
  const _imageView = popup.querySelector(".popup__image");
  const closeButton = popup.querySelector(".popup__close-button"); // "X" tugmasi

  if (!_imageTitle || !_imageView) {
    console.error("Image title or image view not found in popup!");
  }

  const modal = createModal(popup);

  const open = (name, link) => {
    console.log("Opening popup with name:", name, "link:", link); // Debugging
    if (_imageView && _imageTitle) {
      _imageView.alt = name;
      _imageView.src = link;
      _imageTitle.textContent = name;
    }
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscClose);
    closeButton.addEventListener("click", close);
    popup.addEventListener("click", handleOverlayClose);
  };

  const close = () => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);
    closeButton.removeEventListener("click", close);
    popup.removeEventListener("click", handleOverlayClose);
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      close();
    }
  };

  const handleOverlayClose = (evt) => {
    if (evt.target === popup) {
      close();
    }
  };

  return { open, close };
};

export default createPopupWithImage;
