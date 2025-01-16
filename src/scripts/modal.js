const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector(".popup_type_image");
const imagePopupImg = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopupOnEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (!event.target.closest('.popup__content')) {
      closePopup(popup);
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

export function handleImagePopup(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  openPopup(popupImage);
}
