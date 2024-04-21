import {openModal} from './modal.js';

function createCard(listItem, deleteCard, handleLike, handleModalImg) {

        // Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like-button');

    cardImage.src = listItem.link;
    cardImage.alt = listItem.name;
    cardTitle.textContent = listItem.name;

    delButton.addEventListener('click', () => deleteCard(cardElement));
    
    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__image')) {
            handleModalImg(cardImage, cardTitle);
        };
    });

    cardLike.addEventListener('click', (evt) => {
        handleLike(cardLike, evt);
    });

    return cardElement;
};

    // Удаление карточки
function deleteCard(listItem) {
    listItem.remove();
};

    // Увеличение изображения карточки
function handleModalImg(cardImage, cardTitle) {
    const imgPopup = document.querySelector('.popup_type_image');
    const popupImage = imgPopup.querySelector('.popup__image');
    const popupCaption = imgPopup.querySelector('.popup__caption');

    popupImage.src = cardImage.src;
    popupCaption.textContent = cardTitle.textContent;

    openModal(imgPopup);
};

    //Добавление и удаления лайка
function handleLike(cardLike) {
    if (cardLike.classList.contains('card__like-button_is-active')) {
        cardLike.classList.remove('card__like-button_is-active');
    }
    else {
        cardLike.classList.add('card__like-button_is-active');
    }
};

export {createCard, deleteCard, handleLike, handleModalImg};