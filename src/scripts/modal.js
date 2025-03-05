const createModal = (popup) => {
  const open = () => {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeWhenPressEsc);
  };

  const close = () => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeWhenPressEsc);
  };

  const closeWhenPressEsc = (e) => {
    if (e.key === "Escape") close();
  };

  const setEventListeners = () => {
    popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__close-button")) close();
    });
  };

  return { open, close, setEventListeners };
};

export default createModal