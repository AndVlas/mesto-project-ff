import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, handleLike, handleModalImg} from './components/card.js';
import {openModal, closeModal, handleFormSubmit, handleCard} from './components/modal.js';

  // DOM узлы
const container = document.querySelector('.places__list');
const userForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

  // Вывод карточек на страницу
initialCards.forEach((listItem) => {
  container.append(createCard(listItem, deleteCard, handleLike, handleModalImg));
});

  // Попап редактирования
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

editButton.addEventListener('click', () => {
  openModal(editPopup);
});
closeModal(editPopup);

userForm.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, userForm)
})

  // Попап добавления карточки 
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', () => {
  openModal(addPopup);
});
closeModal(addPopup);

cardForm.addEventListener('submit', (evt) => {
  handleCard(evt, cardForm)
})

export {container, userForm, cardForm};