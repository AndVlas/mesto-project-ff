// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.places__list');
const card = document.querySelector('.card');

// @todo: Функция создания карточки

function addCard(listItem, handleDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = listItem.link; 
  cardImage.alt = listItem.name; 
  cardElement.querySelector('.card__title').textContent = listItem.name;

  delButton.addEventListener('click', () => handleDelete(cardElement));

  return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(listItem) {  
  listItem.remove(); 
};  

// @todo: Вывести карточки на страницу

initialCards.forEach((listItem) => {
  container.append(addCard(listItem, deleteCard));
});