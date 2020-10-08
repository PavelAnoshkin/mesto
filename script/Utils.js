export function openPicturePreview (evt) {
    const picturePreview = document.querySelector('.popup_picture-preview');
    const popupPicture = picturePreview.querySelector('.popup__picture');
    const popupPictureCaption = picturePreview.querySelector('.popup__picture-caption');
    const element = evt.target.closest('.element');
    const elementHeader = element.querySelector('.element__header');    
    popupPicture.src = evt.target.src;
    popupPicture.alt = elementHeader.textContent;
    popupPictureCaption.textContent = elementHeader.textContent;
    openPopup(picturePreview);
}

function closePopupKeyEsc (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

export function openPopup (popup) {  
    popup.addEventListener('keydown', closePopupKeyEsc);   
    popup.classList.add('popup_opened');
    popup.focus();
}

export function closePopup (popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', closePopupKeyEsc);   
}