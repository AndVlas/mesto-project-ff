import {addLike, deleteLike} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

    //Создание карточки
function createCard(cardData, onLike, onImageClick, openDeleteCardPopup, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeAmount.textContent = cardData.likes.length;

    if(cardData.owner._id === userId) {
        delButton.classList.add('card__delete-button_is-active');
        delButton.addEventListener('click', (evt) => openDeleteCardPopup(evt, cardData));
    };

    let likesValue = cardData.likes ? cardData.likes.length : 0;
    let isLiked = cardData.likes ? cardData.likes.some(like => like._id === userId) : false;

    if(isLiked) {
        cardLike.classList.add('card__like-button_is-active');
    } else {
        cardLike.classList.remove('card__like-button_is-active');
    }

    cardLike.addEventListener('click', () => onLike(isLiked, cardData, cardLike, cardLikeAmount, likesValue))
    cardImage.addEventListener('click', () => onImageClick(cardImage, cardTitle))

    return cardElement;
};

    //Добавление и удаления лайка
function onLike(isLiked, cardData, cardLike, cardLikeAmount, likesValue) {

    if(isLiked) {
        deleteLike(cardData)
            .then((res) => {
                likesValue = res.likes.length;
                cardLikeAmount.textContent = likesValue;
                cardLike.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        addLike(cardData)
            .then((res) => {
                likesValue = res.likes.length;
                cardLikeAmount.textContent = likesValue;
                cardLike.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err)
            })
    }
};

export {createCard, onLike};