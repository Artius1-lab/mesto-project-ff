import { openPopup } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }

];

export function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(name, link);
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

export function openImagePopup(name, link) {
  const popupImage = document.querySelector(".popup_type_image");
  const imagePopupImg = popupImage.querySelector(".popup__image");
  const imagePopupCaption = popupImage.querySelector(".popup__caption");

  imagePopupCaption.textContent = name;
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  openPopup(popupImage);
}

export function renderInitialCards(placesList) {
  initialCards.forEach(({ name, link }) => {
    const card = createCard(name, link);
    placesList.append(card);
  });
}
