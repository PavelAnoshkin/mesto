import { Card } from '../script/Card.js'; 
import { FormValidator } from '../script/FormValidator.js'; 
import { initialCards } from '../script/Feed.js';
import {
    openPopup,
    closePopup
} from '../script/Utils.js';  

const elementContainer =  document.querySelector('.elements');

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

const popupFormValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_action_submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

function editFormOpen () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    editProfileForm.clearInputError();
    openPopup(editProfilePopup);
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

function addFormOpen () {
    placeNameInput.value='';
    placeUrlInput.value='';
    addPlaceForm.clearInputError();
    openPopup(addPlacePopup);
}

function addElement (item) { 
    const card = new Card (item, '#element-template');
    const cardElement = card.generateCard();
    elementContainer.prepend(cardElement);
}

function addFormSubmitHandler (evt) {
    evt.preventDefault(); 
    addElement({
        name : placeNameInput.value, 
        link : placeUrlInput.value 
    });
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

initialCards.forEach((item) => addElement(item));

const editProfileForm = new FormValidator (popupFormValidation, '.popup__form_edit');
editProfileForm.enableValidation();

const addPlaceForm = new FormValidator (popupFormValidation, '.popup__form_add');
addPlaceForm.enableValidation(); 