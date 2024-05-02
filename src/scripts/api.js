import {createCard, onDelete, onLike} from './card.js';
import {onImageClick, cardsContainer, profileTitle, profileDesc, profileImage} from './index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '69f8f932-f9d5-4365-b19e-a4b0cea58a98',
      'Content-Type': 'application/json'
    }
}

const apiResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

Promise.all([getUserData(), getCardData()])
    .then(([userData, cardList]) => {
        profileTitle.textContent = userData.name
        profileDesc.textContent = userData.about
        profileImage.style = 'background-image: url(' + userData.avatar + ');';

        const userId = userData._id

        cardList.forEach((cardElement) => {
            cardsContainer.append(createCard(cardElement, onDelete, onLike, onImageClick, userId));
        });
});

function getCardData () {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    })
    .then(apiResponse)
}
function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        link: link
    })
    })
    .then(apiResponse)
}

function addLike(cardElement) {
    return fetch(`${config.baseUrl}/cards/likes/${cardElement._id}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(apiResponse)
}

function deleteLike(cardElement) {
    return fetch(`${config.baseUrl}/cards/likes/${cardElement._id}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(apiResponse)
}

function deleteCard(cardElement) {
    return fetch(`${config.baseUrl}/cards/${cardElement._id}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(apiResponse)
}

function getUserData() {
    return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers,
    })
    .then(apiResponse)
}

function editUserData(name, about) {
    return fetch(`${config.baseUrl}/users/me `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: about
    })
    })
    .then(apiResponse)
}

function editUserProfile(link) {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: link,
    })
    })
    .then(apiResponse)
}

export {getCardData, getUserData, addCard, editUserData, deleteCard, addLike, deleteLike, editUserProfile}