// @todo: Темплейт карточки

// @todo: DOM узлы

const container = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(imageSource, name) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = imageSource;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    container.append(cardElement);
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
    let card = evt.target.closest('.card');
    card.remove();
};

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i += 1) {
    addCard(initialCards[i].link, initialCards[i].name);
};