import './index.css';

import Section from '../script/Section.js';
import UserInfo from '../script/UserInfo.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import Card from '../script/Card.js'; 
import FormValidator from '../script/FormValidator.js'; 
import { 
    initialCards, 
    popupFormValidation, 
    elementSection,
    elementTemplate
} from '../script/constaints.js';

function openPicturePreview (evt) {
    const elementHeader = evt.target.closest('.element')
        .querySelector('.element__header');

    const data = {};
    data.url = evt.target.src;
    data.name = elementHeader.textContent;
    
    imagePopup.open(data);
}

function openEditForm () {
    const data = userData.getUserInfo();
    const nameInput = document.querySelector('.popup__input_type_name'); 
    const jobInput = document.querySelector('.popup__input_type_job');   
    
    nameInput.value = data.name;
    jobInput.value = data.job;
    
    editProfileForm.clearInputError();
    editProfilePopup.open();
}

function openAddForm () {
    addPlaceForm.clearInputError();
    addPlacePopup.open();
}

function addCard (item) {
    const card = new Card (
        item, 
        elementTemplate,
        (evt) => openPicturePreview(evt)
    );
    
    const cardElement = card.generateCard();
    elementList.addItem(cardElement);
}

const addPlaceButton = document.querySelector('.profile__add-button');
addPlaceButton.addEventListener('click', openAddForm);

const updateProfileButton = document.querySelector('.profile__edit-button');
updateProfileButton.addEventListener('click', openEditForm);

const elementList = new Section({
        items: initialCards,
        renderer: (item) => addCard(item)
    },
    elementSection
);

elementList.renderItems();

const imagePopup = new PopupWithImage('.popup_picture-preview');
imagePopup.setEventListeners();

const userData = new UserInfo ('.profile__title', '.profile__subtitle');

const editProfilePopup = new PopupWithForm ('.popup_edit-profile', (data) => {
        userData.setUserInfo(data);    
});
editProfilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm ('.popup_add-place', (data) => {
    const item = {
        name : data.placeName, 
        link : data.placeImageUrl 
    };
    addCard(item);    
});

addPlacePopup.setEventListeners();

const editProfileForm = new FormValidator (popupFormValidation, '.popup__form_edit');
editProfileForm.enableValidation();

const addPlaceForm = new FormValidator (popupFormValidation, '.popup__form_add');
addPlaceForm.enableValidation(); 