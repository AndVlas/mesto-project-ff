const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '69f8f932-f9d5-4365-b19e-a4b0cea58a98',
      'Content-Type': 'application/json'
    }
}

const responseApi = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getCardData () {
    return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function addCard(name, link) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
        name: name,
        link: link
    })
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function addLike(cardElement) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardElement._id}`, {
    method: 'PUT',
    headers: apiConfig.headers,
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function deleteLike(cardElement) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardElement._id}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function deleteCard(cardElement) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardElement._id}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function getUserData() {
    return fetch(`${apiConfig.baseUrl}/users/me `, {
    headers: apiConfig.headers,
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function editUserData(name, about) {
    return fetch(`${apiConfig.baseUrl}/users/me `, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
        name: name,
        about: about
    })
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

function editUserProfile(link) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
        avatar: link,
    })
    })
    .then(responseApi)
    .catch((err) => {
        console.log(err);
      });
}

export {getCardData, getUserData, addCard, editUserData, deleteCard, addLike, deleteLike, editUserProfile}