const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

popups.forEach(popup => popup.classList.add('popup_is-animated'));

closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.popup__content')) {
      closePopup(popup);
    }
  });
});