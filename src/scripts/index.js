import '../pages/index.css';
import { createCard } from './cards.js';
import { openPopup, closePopup } from './modal.js';
import { initialCards } from './initialCards.js';

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector(".popup_type_image");
const imagePopupImg = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");

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

function handleImagePopup(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  openPopup(popupImage);
}

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");

const formEdit = popupEdit.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");

const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

const placesList = document.querySelector('.places__list');

const inputPlace = popupAdd.querySelector('.popup__input_type_card-name');
const inputUrl = popupAdd.querySelector('.popup__input_type_url');

function renderInitialCards() {
  initialCards.forEach(({ name, link }) => {
    const card = createCard(name, link, handleImagePopup);
    placesList.append(card);
  });
}

renderInitialCards();

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
});

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = { name: inputPlace.value, link: inputUrl.value };
  placesList.prepend(createCard(cardData.name, cardData.link, handleImagePopup));
  closePopup(popupAdd);
});
