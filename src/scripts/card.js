const createCard = (card, userId, cardTemplate, handleCardClick, handleDeleteClick, handleLikeCard) => {
  const _card = document.querySelector(cardTemplate).content.querySelector(".cards__item").cloneNode(true);
  const _imageItem = _card.querySelector('.cards__item-image');
  const _likeItem = _card.querySelector('.cards__item-number-likes');
  const _deleteElement = _card.querySelector('.cards__delete');
  const _elementsItemLike = _card.querySelector('.cards__item-like');
  let _isLike = card.likes.some(like => like._id === userId);

  _card.querySelector('.cards__item-title').textContent = card.name;
  _imageItem.src = card.link;
  _imageItem.alt = card.name;
  _likeItem.textContent = card.likes.length;

  if (userId !== card.owner._id) _deleteElement.remove();
  if (_isLike) _elementsItemLike.classList.add('cards__item-like_active');

  const toggleLike = () => {
    _isLike = !_isLike;
    _elementsItemLike.classList.toggle('cards__item-like_active');
  };

  const numberOfLikes = (newLikes) => {
    _likeItem.textContent = newLikes.length;
  };

  const deleteCard = () => _card.remove();

  _elementsItemLike.addEventListener('click', () => handleLikeCard({ _id: card._id, isLike: _isLike, toggleLike, numberOfLikes }));
  _deleteElement?.addEventListener('click', () => handleDeleteClick({ _id: card._id, deleteCard }));
  _imageItem.addEventListener('click', () => handleCardClick(card.name, card.link));

  return _card;
};

const createSection = (containerSelector, renderer) => {
  const _container = document.querySelector(containerSelector);

  const renderItems = (items) => {
    _container.innerHTML = "";
    items.forEach(item => _container.prepend(renderer(item)));
  };

  const addItem = (item) => {
    _container.prepend(renderer(item));
  };

  return { renderItems, addItem };
};

export { createCard, createSection };
