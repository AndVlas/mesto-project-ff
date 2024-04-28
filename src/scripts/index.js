import '/src/pages/index.css';
import {initialCards} from './cards.js';
import {createCard, onDelete, onLike} from './card.js';
import {openModal, setCloseModalByClickListeners, closeModal} from './modal.js';

  // DOM узлы
const cardsContainer = document.querySelector('.places__list');
const userForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const popupList = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = userForm.querySelector('.popup__input_type_name');
const jobInput = userForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profilePopup = document.querySelector('.popup_type_edit')

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const urlInput = cardForm.querySelector('.popup__input_type_url');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imgPopup = document.querySelector('.popup_type_image');
const popupImage = imgPopup.querySelector('.popup__image');
const popupCaption = imgPopup.querySelector('.popup__caption');

  // Вывод карточек на страницу
initialCards.forEach((cardData) => {
  cardsContainer.append(createCard(cardData, onDelete, onLike, openImagePopup));
});

setCloseModalByClickListeners(popupList);

  // Попап редактирования
function openEditProfilePopup (popup) {
  openModal (popup);
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDesc.textContent
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    closeModal(profilePopup);
}

  // Попап добавления карточки 
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const name =  cardNameInput.value;
    const url =  urlInput.value;

    const newCard = {
        name: name,
        link: url
    }

    cardsContainer.prepend(createCard(newCard, onDelete, onLike, openImagePopup));

    cardForm.reset();

    closeModal(addCardPopup);
};

  // Увеличение изображения карточки
function openImagePopup(cardImage, cardTitle) {

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.textContent;
  popupCaption.textContent = cardTitle.textContent;

  openModal(imgPopup);
};

  //Слушатели событий
editButton.addEventListener('click', () => {
  openEditProfilePopup(editPopup);
});

userForm.addEventListener('submit', (evt) => {
  handleEditProfileFormSubmit(evt, userForm)
})

addButton.addEventListener('click', () => {
  openModal(addPopup);
});

cardForm.addEventListener('submit', (evt) => {
  handleAddCardFormSubmit(evt, cardForm)
})

export {openImagePopup as onImageClick};