import createApiService from "./api.js";
import { createCard, createSection } from "./card.js";
import createFormValidator from "./validate.js";
import { createPopupWithForm, createPopupWithImage, createDeleteConfirmationModal } from "./modal.js";
import "../pages/index.css";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const popupSelectors = {
  popupUpdateAvatar: '.popup_type_update-avatar',
  popupEditProfile: '.popup_type_edit-profile',
  popupImageView: '.popup_type_image-view',
  popupDeleteCard: '.popup_type_delete-card',
  popupAddCard: '.popup_type_add-card',
};

const buttonSelectors = {
  buttonEdit: '.profile__edit-button',
  buttonAdd: '.profile__add-button',
  buttonUpdateAvatar: '.profile__avatar-edit-button',
};

const formSelectors = {
  popupFormProfile: '.popup__form',
  popupFormAvatar: '.popup__form',
  popupFormAddCard: '.popup__form',
};

const fieldSelectors = {
  popupUserAvatar: '.profile__avatar',
  popupUserName: '.profile__name',
  popupUserAbout: '.profile__job',
};

const createProfile = ({ nameElement, aboutElement, avatarElement }) => {
  let _userId;

  const getProfileData = () => ({
    name: nameElement.textContent,
    about: aboutElement.textContent
  });

  const updateProfile = ({ name, about, avatar, _id }) => {
    if (name) nameElement.textContent = name;
    if (about) aboutElement.textContent = about;
    if (avatar) {
      avatarElement.src = avatar;
      avatarElement.alt = name;
    }
    if (_id) _userId = _id;
  };

  return { getProfileData, updateProfile, getUserId: () => _userId };
};

const api = createApiService({
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-34",
  headers: {
    authorization: "c377a36a-1c8b-489a-9449-519744310279",
    "Content-Type": "application/json",
  },
});

const handleLikeCard = ({ _id, isLike, toggleLike, numberOfLikes }) => {
  (isLike ? api.unlikeCard(_id) : api.likeCard(_id))
    .then(res => {
      numberOfLikes(res.likes);
      toggleLike();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
};

const handleCardClick = (name, link) => popupWithImage.open(name, link);

const handleDeleteClick = (card) => {
  popupWithDelete.setDeleteCard(card);
  popupWithDelete.open();
};

const section = createSection('.cards__list', (data) => createCard(
  data,
  userInfo.getUserId(),
  'template',
  handleCardClick,
  handleDeleteClick,
  handleLikeCard
));

const popupFormAddElementValidation = createFormValidator(settings, document.querySelector(formSelectors.popupFormAddCard));
const popupFormWithAvatarValidation = createFormValidator(settings, document.querySelector(formSelectors.popupFormAvatar));
const popupFormProfileValidation = createFormValidator(settings, document.querySelector(formSelectors.popupFormProfile));
popupFormAddElementValidation.enableValidation();
popupFormWithAvatarValidation.enableValidation();
popupFormProfileValidation.enableValidation();

const userInfo = createProfile({
  nameElement: document.querySelector(fieldSelectors.popupUserName),
  aboutElement: document.querySelector(fieldSelectors.popupUserAbout),
  avatarElement: document.querySelector(fieldSelectors.popupUserAvatar),
});

const popupAddElementForm = createPopupWithForm(
  document.querySelector(popupSelectors.popupAddCard),
  (data) => {
    return api.addCard(data)
      .then((newCard) => {
        section.addItem(newCard);
        popupAddElementForm.close();
      })
      .catch(err => console.error(`Error: ${err}`));
  }
);

const popupProfileWithForm = createPopupWithForm(
  document.querySelector(popupSelectors.popupEditProfile),
  (data) => {
    return api.updateUserProfile(data)
      .then((updatedProfile) => {
        userInfo.updateProfile(updatedProfile);
        popupProfileWithForm.close();
      })
      .catch(err => console.error(`Error: ${err}`));
  }
);

const popupWithImage = createPopupWithImage(document.querySelector(popupSelectors.popupImageView));

const popupWithAvatar = createPopupWithForm(
  document.querySelector(popupSelectors.popupUpdateAvatar),
  (data) => {
    return api.updateUserAvatar({ avatar: data.avatar })
      .then((updatedData) => {
        userInfo.updateProfile(updatedData);
        popupWithAvatar.close();
      })
      .catch(err => console.error(`Error: ${err}`));
  }
);

const popupWithDelete = createDeleteConfirmationModal(
  document.querySelector(popupSelectors.popupDeleteCard),
  (card) => {
    return api.removeCard(card._id)
      .then(() => {
        card.deleteCard();
        popupWithDelete.close();
      })
      .catch(err => console.error(`Error: ${err}`));
  }
);

Promise.all([api.getUserProfile(), api.getCards()])
  .then(([profileData, cardsData]) => {
    userInfo.updateProfile(profileData);
    section.renderItems(cardsData);
  })
  .catch(err => console.error(`Error fetching data: ${err}`));

document.querySelector(buttonSelectors.buttonAdd).addEventListener('click', () => {
  popupFormAddElementValidation.resetValidation();
  popupAddElementForm.open();
});

document.querySelector(buttonSelectors.buttonEdit).addEventListener('click', () => {
  popupProfileWithForm.setInputValues(userInfo.getProfileData());
  popupProfileWithForm.open();
});

document.querySelector(buttonSelectors.buttonUpdateAvatar).addEventListener('click', () => {
  popupFormWithAvatarValidation.resetValidation();
  popupWithAvatar.open();
});
