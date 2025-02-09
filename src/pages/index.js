import PopupWithDelete from '../scripts/DeleteConfirmationModal.js';
import PopupWithImage from "../scripts/ModalImg.js";
import FormValidator from "../scripts/Validator.js";
import PopupWithForm from "../scripts/ModalForm.js";
import UserInfo from "../scripts/Profile.js";
import Section from "../scripts/ListRender.js";
import Card from "../scripts/CardItem.js";
import Api from '../scripts/ApiService.js';
import "../pages/index.css";

import {
  buttonUpdateAvatar,
  popupUpdateAvatar,
  popupFormAddCard,
  popupFormProfile,
  popupEditProfile,
  popupDeleteCard,
  popupFormAvatar,
  popupUserAvatar,
  popupImageView,
  popupUserAbout,
  popupUserName,
  popupAddCard,
  buttonEdit,
  buttonAdd,
  settings
} from "../scripts/constants.js";

const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  baseUrl: " https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    // authorization: "1f43ff04-d4d6-48bf-b04f-ab223f18899b",
    authorization: "0b22d737-0b0b-4d0a-9f43-565585945d10",
    "Content-Type": "application/json",
  },
})

function handleLikeCard(cardData) {
  if (cardData.isLike) {
    api.unlikeCard(cardData._id)
      .then(res => {
        cardData.numberOfLikes(res.likes);
        cardData.statusLike();
        cardData.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  } else {
    api.likeCard(cardData._id)
      .then(res => {
        cardData.numberOfLikes(res.likes);
        cardData.statusLike();
        cardData.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick(card) {
  popupWithDelete.setDeleteCard(card);
  popupWithDelete.open();
}

const section = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(
      data,
      userInfo.getUserId(),
      'template',
      handleCardClick,
      handleDeleteClick,
      handleLikeCard
    );
    return card.generate();
  }
}, '.cards__list');

const popupFormAddElementValidation = new FormValidator(settings, popupFormAddCard);
const popupFormWithAvatarValidation = new FormValidator(settings, popupFormAvatar);
const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
popupFormAddElementValidation.enableValidation();
popupFormWithAvatarValidation.enableValidation();
popupFormProfileValidation.enableValidation();

const userInfo = new UserInfo({
  nameElement: popupUserName,
  aboutElement: popupUserAbout,
  avatarElement: popupUserAvatar
});

const popupAddElementForm = new PopupWithForm(popupAddCard, data => {
  api.addCard(data)
    .then((res) => {
      section.addItem(res)
      popupAddElementForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAddElementForm.stopLoading();
    })
});

const popupProfileWithForm = new PopupWithForm(popupEditProfile, data => {
  api.updateUserProfile(data)
    .then((res) => {
      userInfo.updateProfile(res);
      popupProfileWithForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupProfileWithForm.stopLoading();
    })
})

const popupWithImage = new PopupWithImage(popupImageView);

const popupWithAvatar = new PopupWithForm(popupUpdateAvatar, data => {
  api.updateUserAvatar(data)
    .then(() => {
      userInfo.updateProfile(data);
      popupWithAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupWithAvatar.stopLoading();
    })
})

const popupWithDelete = new PopupWithDelete(popupDeleteCard, card => {
  api.removeCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithDelete.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
});

Promise.all([
  api.getUserProfile(),
  api.getCards()
])
  .then(res => {
    userInfo.updateProfile(res[0]);
    section.renderItems(res[1])
  })
  .catch(err => console.error(err));

popupProfileWithForm.setEventListeners();
popupAddElementForm.setEventListeners();
popupWithDelete.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithImage.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupFormAddElementValidation.resetValidation();
  popupAddElementForm.open();
});

buttonEdit.addEventListener('click', () => {
  popupProfileWithForm.setInputValues(userInfo.getProfileData());
  popupProfileWithForm.open();
})

buttonUpdateAvatar.addEventListener('click', () => {
  popupFormWithAvatarValidation.resetValidation();
  popupWithAvatar.open();
});
