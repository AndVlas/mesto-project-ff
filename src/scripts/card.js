import {onImageClick} from './index.js';

const cardTemplate = document.querySelector('#card-template').content;

    //Создание карточки
function createCard(cardData, onDelete, onLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    delButton.addEventListener('click', () => onDelete(cardElement))
    cardLike.addEventListener('click', () => onLike(cardLike))
    cardImage.addEventListener('click', () => onImageClick(cardImage, cardTitle))

    return cardElement;
};

    // Удаление карточки
function onDelete(cardElement) {
    cardElement.remove();
};

    //Добавление и удаления лайка
function onLike(cardLike) {
    cardLike.classList.toggle('card__like-button_is-active');
};

export {createCard, onDelete, onLike};