const elementContainer =  document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupElements = document.querySelectorAll('.popup');

const updateProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const formEditProfile = editProfilePopup.querySelector('.popup__form');

const name = document.querySelector('.profile__title'); 
const job = document.querySelector('.profile__subtitle'); 
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); 
const jobInput = formEditProfile.querySelector('.popup__input_type_description'); 

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_add-place');
const formAddPlace = addPlacePopup.querySelector('.popup__form');

const placeNameInput = formAddPlace.querySelector('.popup__input_type_place-name'); 
const placeUrlInput = formAddPlace.querySelector('.popup__input_type_place-image-url'); 

const picturePreview = document.querySelector('.popup_picture-preview');

const popupFormValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_action_submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

function closePopupKeyEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup (popup) {  
    popup.addEventListener('keydown', closePopupKeyEsc);   
    popup.classList.add('popup_opened');
    popup.focus();
}

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', closePopupKeyEsc);   
}

function editFormOpen () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    clearInputError(editProfilePopup, popupFormValidation);
    openPopup(editProfilePopup);
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();
    const inputList = Array.from(editProfilePopup.querySelectorAll('.popup__input'));
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

function addFormOpen () {
    placeNameInput.value='';
    placeUrlInput.value='';
    clearInputError(addPlacePopup, popupFormValidation);
    openPopup(addPlacePopup);
}

function deleteElement (evt) {
    const unnecessaryElement = evt.target.closest('.element');
    unnecessaryElement.remove();
}

function addLike (evt) {
    evt.target.classList.toggle('element__like-button_checked')
}

function openPicturePreview (evt) {
    const popupPicture = picturePreview.querySelector('.popup__picture');
    const popupPictureCaption = picturePreview.querySelector('.popup__picture-caption');
    const element = evt.target.closest('.element');
    const elementHeader = element.querySelector('.element__header');
    
    popupPicture.src = evt.target.src;
    popupPictureCaption.textContent = elementHeader.textContent;
    openPopup(picturePreview);
}

function addElement (elementName, elementUrl) {    
    const element = elementTemplate.cloneNode(true);    
    element.querySelector('.element__header').textContent = elementName;

    const elementImage = element.querySelector('.element__image');
    elementImage.src = elementUrl;
    elementImage.alt = elementName;
    elementImage.addEventListener('click', evt => openPicturePreview(evt));
      
    const deleteElementButton = element.querySelector('.element__delete-button');    
    deleteElementButton.addEventListener('click', deleteElement);
    
    element.querySelector('.element__like-button').addEventListener('click', addLike);    

    elementContainer.prepend(element);
}

function addFormSubmitHandler (evt) {
    evt.preventDefault(); 
    const inputList = Array.from(addPlacePopup.querySelectorAll('.popup__input'));
    addElement(placeNameInput.value, placeUrlInput.value);
    closePopup(addPlacePopup);    
}

popupElements.forEach((popupElement) => {
    const closeButton = popupElement.querySelector('.popup__button_action_close');
    closeButton.addEventListener('click', () => closePopup(popupElement));

    popupElement.addEventListener('click', (evt) => {
        if (evt.target === popupElement) {
            closePopup(popupElement);
        }
    });
});

updateProfileButton.addEventListener('click', editFormOpen);
formEditProfile.addEventListener('submit', editFormSubmitHandler);

addPlaceButton.addEventListener('click', addFormOpen);
formAddPlace.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach((place) => addElement(place.name, place.link));

enableValidation(popupFormValidation);
