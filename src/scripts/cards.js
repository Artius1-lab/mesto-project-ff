export function createCard(name, link, handleCardClick) {
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
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
    handleCardClick(name, link);
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}
