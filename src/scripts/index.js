import '../pages/index.css';
import initialCards from './cards.js';
import { openPopup, closePopup } from './modal.js';

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const formEdit = popupEdit.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");

const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const placesList = document.querySelector('.places__list');

const inputPlace = popupAdd.querySelector('.popup__input_type_card-name');
const inputUrl = popupAdd.querySelector('.popup__input_type_url');

const imagePopupImg = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");

function createCard(name, link) {
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
    imagePopupCaption.textContent = name;
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    openPopup(popupImage);
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function renderInitialCards(cards) {
  cards.forEach(({ name, link }) => {
    const card = createCard(name, link);
    placesList.append(card);
  });
}

renderInitialCards(initialCards);


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
  placesList.prepend(createCard(cardData.name, cardData.link));
  closePopup(popupAdd);
});
