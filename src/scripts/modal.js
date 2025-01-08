
export function openPopup(popup) {
    const closeButton = popup.querySelector(".popup__close");
    popup.classList.add('popup_is-opened');
  
    closeButton.addEventListener('click', () => closePopup(popup));
  
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }
  
 export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
  
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
  
    popup.addEventListener('transitionend', () => {
      if (!popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-animated');
        resetPopup(popup);
      }
    }, { once: true });
  }
  
  export function resetPopup(popup) {
    const form = popup.querySelector('.popup__form');
    if (form) {
      form.reset();
    }
  }
  
  export function handleEscClose(evt) {
    const activePopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' && activePopup) {
      closePopup(activePopup);
    }
  }
  
  export function handleOverlayClose(evt) {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup && evt.target === activePopup) {
      closePopup(activePopup);
    }
  }
  