export const cohort = 'cohort-60';
// export const token = '1f43ff04-d4d6-48bf-b04f-ab223f18899b';
export const token = "c56e30dc-2883-4270-a59e-b2f7bae969c6"

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* popups */
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const popupImageView = document.querySelector(".popup_type_image-view");
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');
export const popupAddCard = document.querySelector(".popup_type_add-card");

/* buttons */
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const buttonUpdateAvatar = document.querySelector('.profile__avatar-edit-button');

/* forms */
export const popupFormProfile = popupEditProfile.querySelector(".popup__form");
export const popupFormAvatar = popupUpdateAvatar.querySelector('.popup__form');
export const popupFormAddCard = popupAddCard.querySelector(".popup__form");

/* fields */
export const popupUserAvatar = document.querySelector('.profile__avatar');
export const popupUserName = document.querySelector(".profile__name");
export const popupUserAbout = document.querySelector(".profile__job");
