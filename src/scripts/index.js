import '/src/pages/index.css';
import {getCardData, getUserData, addCard, editUserData, editUserProfile} from './api.js'
import {enableValidation, clearValidation} from './validation.js'
import {initialCards} from './cards.js';
import {createCard, onDelete, onLike} from './card.js';
import {openModal, setCloseModalByClickListeners, closeModal} from './modal.js';

  // DOM узлы
const cardsContainer = document.querySelector('.places__list');
const userForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
const popupList = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = userForm.querySelector('.popup__input_type_name');
const jobInput = userForm.querySelector('.popup__input_type_description');
const profilePopupButton = userForm.querySelector('.popup__button')
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profilePopup = document.querySelector('.popup_type_edit');
const profileImage = document.querySelector('.profile__image');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
const addPopupButton = cardForm.querySelector('.popup__button')
const addCardPopup = document.querySelector('.popup_type_new-card');

const imgPopup = document.querySelector('.popup_type_image');
const popupImage = imgPopup.querySelector('.popup__image');
const popupCaption = imgPopup.querySelector('.popup__caption');

const deleteCardPopup = document.querySelector('.popup_type_delete-card');

const avatarPopup = document.querySelector('.popup_type_new-avatar')
const avatarImage = document.querySelector('.profile__image');
const avatarPopupButton = avatarPopup.querySelector('.popup__button')
const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_url');

  //Конфиг валидации
const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

setCloseModalByClickListeners(popupList);

function loading (isLoading, buttonElement) {
  if(isLoading === true) {
    buttonElement.textContent = 'Сохранение...';
  }
}

  // Попап редактирования
function openEditProfilePopup (popup) {
  openModal (popup);

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDesc.textContent
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    loading(false, profilePopupButton)

    const name = nameInput.value;
    const about = jobInput.value

    editUserData(name, about)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDesc.textContent = jobInput.value;
      closeModal(profilePopup);
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      loading(true, profilePopupButton)
    })
}

  // Попап добавления карточки 
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    loading(false, addPopupButton)

    const name =  cardNameInput.value;
    const url =  cardUrlInput.value;

    addCard(name, url)
    .then((cardData) => {
      cardsContainer.prepend(createCard(cardData, onDelete, onLike, openImagePopup, cardData.owner['_id']));
      cardForm.reset();
      closeModal(addCardPopup);
    })

    .catch((err) => {
      console.log(err);
    }) 

    .finally(() => {
      loading(true, addPopupButton)
    })
};

  //Попап изменения аватара
function handleChangeAvatar (evt) {
  evt.preventDefault();

  loading(false, avatarPopupButton)

  const avatarLink = avatarUrlInput.value

  avatarImage.src = avatarLink
  editUserProfile(avatarLink)
    .then((res) => {
      avatarImage.src = res.avatarImage;
      closeModal(avatarPopup)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading(true, avatarPopupButton)
    })
}

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
  clearValidation (userForm);
  enableValidation(); 
});

userForm.addEventListener('submit', (evt) => {
  handleEditProfileFormSubmit(evt, userForm);
})

addButton.addEventListener('click', () => {
  openModal(addPopup);
  clearValidation (cardForm);
  enableValidation(); 
});

cardForm.addEventListener('submit', (evt) => {
  handleAddCardFormSubmit(evt, cardForm);
})

avatarImage.addEventListener('click', () => {
  openModal(avatarPopup)
  clearValidation(avatarForm);
  enableValidation();
  avatarForm.reset()
})

avatarPopupButton.addEventListener('click', handleChangeAvatar);

export {openImagePopup as onImageClick, validationConfig, handleEditProfileFormSubmit, deleteCardPopup, cardsContainer, profileTitle, profileDesc, profileImage};