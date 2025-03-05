const createDeleteConfirmationModal = (popup, popupSubmitCallback) => {
  const _button = popup.querySelector('.popup__save-button_place_delete-card');
  let _card;

  const setEventListeners = () => {
    _button.addEventListener('click', () => popupSubmitCallback(_card));
  };

  const setDeleteCard = (card) => {
    _card = card;
  };

  const open = () => {
    popup.classList.add('popup_opened'); // Popup-ni ochish
    setEventListeners(); // Tugma uchun hodisani qo‘shish
  };

  const close = () => {
    popup.classList.remove('popup_opened'); // Popup-ni yopish (ixtiyoriy, lekin foydali bo‘ladi)
  };

  return { setEventListeners, setDeleteCard, open, close };
};

export default createDeleteConfirmationModal;
