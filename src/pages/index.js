import './index.css';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import Api from '../components/Api.js'; 
import { 
    popupFormValidation, 
    elementSection,
    elementTemplate,
    authorizationToken,
    groupID
} from '../utils/constaints.js';

function openPicturePreview (evt) {
    const elementHeader = evt.target.closest('.element')
        .querySelector('.element__header');

    const data = {
        url : evt.target.src,
        name : elementHeader.textContent
    };
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

function openAvatarEditForm() {
    const data = userData.getUserInfo();

    const avatarUrlInput = document.querySelector('.popup__input_type_avatar-image-url');
    avatarUrlInput.value = data.avatar;

    editAvatarForm.clearInputError();
    editAvatarPopup.open();
}

function openAddForm () {
    addPlaceForm.clearInputError();
    addPlacePopup.open();
}

function addCard (item) {
    const card = new Card (
        item, 
        elementTemplate,
        userData.getUserInfo().id,
        (evt) => openPicturePreview(evt),
        (item) => openDeleteCardPopup (item),
        (id) => { 
            return api.addLike(id);
        },
        (id) => { 
            return api.deleteLike(id);
        }
    );
    
    const cardElement = card.generateCard();
    elementList.addItem(cardElement);
}

function openDeleteCardPopup (item) {   
    deleteCardPopup.open(item);
}

const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${groupID}`,
    headers: {
        authorization: authorizationToken,
        'Content-Type': 'application/json'
    }
}); 

const elementList = new Section({
    renderer: (item) => addCard(item)
},
elementSection
);

const addPlaceButton = document.querySelector('.profile__add-button');
addPlaceButton.addEventListener('click', openAddForm);

const updateProfileButton = document.querySelector('.profile__edit-button');
updateProfileButton.addEventListener('click', openEditForm);

const updateAvatarButton = document.querySelector('.profile__avatar-edit-button');
updateAvatarButton.addEventListener('click', openAvatarEditForm);

const imagePopup = new PopupWithImage('.popup_picture-preview');
imagePopup.setEventListeners();

const userData = new UserInfo ('.profile__title', '.profile__subtitle', '.profile__avatar');

const editProfilePopup = new PopupWithForm ('.popup_edit-profile', (data) => {
    return api.patchInfo(data)
        .then(result => {
            userData.setUserInfo(
                {
                    profileName: result.name,
                    profileJob: result.about,
                    profileAvatar: result.avatar
                }
            );
        })
        .catch(err => { 
            console.log(`Ошибка при сохранения профиля: ${err}`)
        });    
});
editProfilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm ('.popup_add-place', (data) => {
    const item = {
        name : data.placeName, 
        link : data.placeImageUrl 
    };

    return api.postCard(item)
        .then(result => {
            addCard(result);
        })
        .catch(err => { 
            console.log(`Ошибка при сохранении карточки: ${err}`)
        }); 
     
});
addPlacePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm ('.popup_edit-avatar', (data) => {
    const item = {
        avatar : data.avatarImageUrl
    };

    return api.patchAvatar(item)
        .then(result => {
            userData.setAvatarImage(result)           
        })
        .catch(err => { 
            console.log(`Ошибка при сохранении аватара: ${err}`)
        });      
});
editAvatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm ('.popup_delete-place', (card) => {
    return api.deleteCard(card.getId())
        .then(() => {
            card.deleteElement();
        })
        .catch(err => { 
            console.log(`Ошибка при удалении карточки: ${err}`)
        }); 
});
deleteCardPopup.setEventListeners();

const editProfileForm = new FormValidator (popupFormValidation, '.popup__form_edit');
editProfileForm.enableValidation();

const addPlaceForm = new FormValidator (popupFormValidation, '.popup__form_add');
addPlaceForm.enableValidation(); 

const editAvatarForm = new FormValidator (popupFormValidation, '.popup__form_edit-avatar');
editAvatarForm.enableValidation(); 

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((values) => {
        userData.setUserInfo(
            {
                profileName: values[0].name,
                profileJob: values[0].about,
                profileAvatar: values[0].avatar,
                profileId: values[0]._id
            }
        );
        elementList.renderItems(values[1]);
    })
    .catch((err) => {
        console.log(`Ошибка при получении данных при загрузке: ${err}`);
    })
