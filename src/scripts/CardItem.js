export default class Card {
  constructor(card, userId, cardTemplate, handleCardClick, handleDeleteClick, handleLikeCard) {
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._cardTemplate = cardTemplate;
    this._owner = card.owner;
    this._like = card.likes;
    this._name = card.name;
    this._link = card.link;
    this._userId = userId;
    this._isLike = false;
    this._id = card._id;
  }

  generate = () => {
    this._card = this._getTemplate();
    this._imageItem = this._card.querySelector('.cards__item-image');
    this._likeItem = this._card.querySelector('.cards__item-number-likes');
    this._deleteElement = this._card.querySelector('.cards__delete');
    this._card.querySelector('.cards__item-title').textContent = this._name;
    this._imageItem.setAttribute('src', this._link);
    this._imageItem.setAttribute('alt', this._name);
    this._likeItem.textContent = this._like.length;
    if (this._userId !== this._owner._id) this._deleteElement.remove();
    this._elementsItemLike = this._card.querySelector('.cards__item-like');
    if (this._like.find(item => item._id === this._userId)) {
      this._elementsItemLike.classList.add('cards__item-like_active');
      this._isLike = true;
    }
    this._setEventListener();
    return this._card;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  get isLike() {
    return this._isLike;
  }

  numberOfLikes(newLikes) {
    this._like = newLikes;
    this._likeItem.textContent = this._like.length;
  }

  statusLike() {
    this._isLike = !this._isLike;
  }

  toggleLike() {
    this._elementsItemLike.classList.toggle('cards__item-like_active');
  }

  deleteCard() {
    this._card.remove();
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  };

  _setEventListener = () => {
    this._card.querySelector('.cards__item-like')
      .addEventListener('click', () => this._handleLikeCard(this));

    if (this._card.querySelector('.cards__delete')) this._card.querySelector('.cards__delete')
      .addEventListener('click', () => this._handleDeleteClick(this));

    this._imageItem.addEventListener('click', () => this._handleImageClick());
  }
}
