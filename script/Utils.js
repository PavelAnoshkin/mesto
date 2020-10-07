export function openPicturePreview (evt) {
    const picturePreview = document.querySelector('.popup_picture-preview');
    const popupPicture = picturePreview.querySelector('.popup__picture');
    const popupPictureCaption = picturePreview.querySelector('.popup__picture-caption');
    const element = evt.target.closest('.element');
    const elementHeader = element.querySelector('.element__header');    
    popupPicture.src = evt.target.src;
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

export function clearInputError (formElement, validaitionForm) {
    const inputList = Array.from(formElement.querySelectorAll(validaitionForm.inputSelector));
    const buttonElement = formElement.querySelector(validaitionForm.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement, validaitionForm);
    inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validaitionForm));    
}

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState (inputList, buttonElement, validaitionForm) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validaitionForm.inactiveButtonClass);
        buttonElement.disabled = true; 
    } else {
        buttonElement.classList.remove(validaitionForm.inactiveButtonClass);
        buttonElement.disabled = false; 
    }  
};

function hideInputError (formElement, inputElement, validaitionForm) {
    const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validaitionForm.inputErrorClass);
    errorElement.classList.remove(validaitionForm.errorClass);
    errorElement.textContent = '';
};