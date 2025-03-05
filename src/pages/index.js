import { settings, popupSelectors, buttonSelectors, formSelectors, fieldSelectors } from "../scripts/constants";
import "../pages/index.css";
import createApiService from "../scripts/ApiService";
import createSection from "../scripts/ListRender";
import createFormValidator from "../scripts/Validator";
import createProfile from "../scripts/Profile";
import createPopupWithForm from "../scripts/ModalForm";
import createPopupWithImage from "../scripts/ModalImg";
import createDeleteConfirmationModal from "../scripts/DeleteConfirmationModal";
import createCard from "../scripts/CardItem";

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
