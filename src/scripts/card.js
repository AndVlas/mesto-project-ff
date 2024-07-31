import {deleteCardPopup} from './index.js';
import {closeModal, openModal} from './modal.js';
import {deleteCard, addLike, deleteLike} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

    //Создание карточки
function createCard(cardData, onDelete, onLike, onImageClick, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount');
    const popupButton = deleteCardPopup.querySelector('.popup__button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeAmount.textContent = cardData.likes.length;

    if(cardData.owner._id === userId) {
        delButton.classList.add('card__delete-button_is-active');
        delButton.addEventListener('click', (evt) => {
            openModal(deleteCardPopup);
            const evtCard = evt.target.offsetParent;
            window.globalEvtCard = evtCard;
            const cardId = cardData;
            window.globalCardId = cardId
        });
        popupButton.addEventListener('click', () => onDelete(globalEvtCard, globalCardId, deleteCardPopup));
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

    // Удаление карточки
function onDelete(globalEvtCard, globalCardId, deleteCardPopup) {
    deleteCard(globalCardId)
        .then(() => {
            globalEvtCard.remove();
            closeModal(deleteCardPopup);
        })
        .catch((err) => {
            console.log(err)
        })
};

// function onDelete(globalEvtCard, deleteCardPopup) {
//     globalEvtCard.remove();
//     closeModal(deleteCardPopup);
// }

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

export {createCard, onDelete, onLike};