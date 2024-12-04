
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


const placesList = document.querySelector('.places__list');


function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card'); 
    cardElement.remove(); 
}


function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;


    deleteButton.addEventListener('click', handleDeleteCard);

    return cardElement;
}


function renderInitialCards(cards) {
    cards.forEach(({ name, link }) => {
        const card = createCard(name, link);
        placesList.append(card);
    });
}


renderInitialCards(initialCards);
