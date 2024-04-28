    //Открытие попапа
function openModal (popup) {
    popup.classList.add('popup_is-opened');
};

    //Закрытие попапа
function closeModal () {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
};

    //Закрытие попапа через оверлей и кнопку
function handleCloseModalOverlayAndButton (evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    const popupCloseButton = openedPopup.querySelector('.popup__close');
    if(evt.target === popupCloseButton || evt.target === openedPopup) {
        closeModal(openedPopup);
    };
};

    //Закрытие попапа через Esc
function handleCloseModalEsc (evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if(evt.code === 'Escape') {
        closeModal(openedPopup);
    }; 
}; 

    //Установка слушателей
function setCloseModalByClickListeners(popupList) {
    popupList.forEach(popup => {
      const closeButton = popup.querySelector('.popup__close');
      closeButton.addEventListener('click', handleCloseModalEsc);
      popup.addEventListener('click', handleCloseModalOverlayAndButton);
    });
  };

export {openModal, closeModal, setCloseModalByClickListeners};