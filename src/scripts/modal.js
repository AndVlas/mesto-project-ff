    //Открытие попапа
function openModal (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseModalEsc);
};

    //Закрытие попапа
function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalEsc);
};

    //Закрытие попапа через оверлей и кнопку
function handleCloseModalByOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    };
};

    //Закрытие попапа через Esc
function handleCloseModalEsc (evt) {
    if(evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }; 
}; 

    //Установка слушателей
function setCloseModalByClickListeners(popupList) {
    popupList.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => closeModal(popup)); 
        popup.addEventListener('click', handleCloseModalByOverlay);
    });
  };

export {openModal, closeModal, setCloseModalByClickListeners};