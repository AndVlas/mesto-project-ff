import {createCard, deleteCard, handleLike, handleModalImg} from './card.js';
import {container} from '/src/index.js';

function openModal (popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', (evt) => {closeModalOverlay (evt, popup)});
    document.addEventListener('keydown', (evt) => {closeModalEsc (evt, popup)});

    if(popup.classList.contains('popup_type_edit')) {
        nameInput.value = profileTitle.textContent
        jobInput.value = profileDesc.textContent
    }
};

function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', (evt) => {closeModalOverlay (evt, popup)});
    document.removeEventListener('keydown', (evt) => {closeModalEsc (evt, popup)});
};

function closeModalOverlay (evt, popup) {
    const popupCloseButton = popup.querySelector('.popup__close');
    if(evt.target === popupCloseButton || evt.target === popup) {
        closeModal(popup);
    };
};

function closeModalEsc (evt, popup) {
    if(evt.code === 'Escape') {
        closeModal(popup);
    }; 
}; 

const userForm = document.forms['edit-profile'];
const nameInput = userForm.querySelector('.popup__input_type_name');
const jobInput = userForm.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault();
    const openedPopup = document.querySelector('.popup_is-opened');

    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    closeModal(openedPopup);
}

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const urlInput = cardForm.querySelector('.popup__input_type_url');

function handleCard(evt) {
    evt.preventDefault();
    const openedPopup = document.querySelector('.popup_is-opened');

    const name =  cardNameInput.value;
    const url =  urlInput.value;

    const newCard = {
        name: name,
        link: url
    }

    const addNewCard = (newCard) => {
        const card = createCard(newCard, deleteCard, handleLike, handleModalImg);
        container.prepend(card);
    }

    addNewCard(newCard);

    cardForm.reset();

    closeModal(openedPopup);
};

// cardForm.addEventListener('submit', (evt) => {
//     handleCard(evt, cardForm)
// })

export {openModal, closeModal, handleFormSubmit, handleCard};