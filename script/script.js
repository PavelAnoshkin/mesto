const elementContainer =  document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const updateProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup__edit-profile');
const formEditProfile = editProfilePopup.querySelector('.popup__form');
const cancelEditButton = editProfilePopup.querySelector('.popup__btn_action_close');
const name = document.querySelector('.profile__title'); 
const job = document.querySelector('.profile__subtitle'); 
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); 
const jobInput = formEditProfile.querySelector('.popup__input_type_description'); 

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup__add-place');
const formAddPlace = addPlacePopup.querySelector('.popup__form');
const cancelAddButton = addPlacePopup.querySelector('.popup__btn_action_close');
const placeNameInput = formAddPlace.querySelector('.popup__input_type_place-name'); 
const placeUrlInput = formAddPlace.querySelector('.popup__input_type_place-image-url'); 

const picturePreview = document.querySelector('.popup__picture-preview');
const closePreviewButton = picturePreview.querySelector('.popup__btn_action_close');

function popupOpen (popup) {
    popup.classList.add('popup_opened');
}

function popupClose (popup) {
    popup.classList.remove('popup_opened');
}

function editFormOpen () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popupOpen(editProfilePopup);
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupClose(editProfilePopup); 
}

function deleteElement (evt) {
    const unnecessaryElement = evt.target.closest('.element');
    unnecessaryElement.remove();
}

function addLike (evt) {
    evt.target.classList.toggle('element__like-btn_checked')
}

function openPicturePreview (evt) {
    const popupPicture = picturePreview.querySelector('.popup__picture');
    const popupPictureCaption = picturePreview.querySelector('.popup__picture-caption');
    const element = evt.target.closest('.element');
    const elementHeader = element.querySelector('.element__header');
    
    popupPicture.src = evt.target.src;
    popupPictureCaption.textContent = elementHeader.textContent;
    popupOpen(picturePreview);
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
    
    element.querySelector('.element__like-btn').addEventListener('click', addLike);    

    elementContainer.prepend(element);
}

function addFormSubmitHandler (evt) {
    evt.preventDefault();       
    addElement(placeNameInput.value, placeUrlInput.value);
    popupClose(addPlacePopup);
}

updateProfileButton.addEventListener('click', editFormOpen);
cancelEditButton.addEventListener('click', () => popupClose(editProfilePopup));
formEditProfile.addEventListener('submit', editFormSubmitHandler);

addPlaceButton.addEventListener('click', () => {
    placeNameInput.value='';
    placeUrlInput.value='';
    popupOpen(addPlacePopup);
});

cancelAddButton.addEventListener('click', () => popupClose(addPlacePopup));
formAddPlace.addEventListener('submit', addFormSubmitHandler);

closePreviewButton.addEventListener('click', () => popupClose(picturePreview));

initialCards.forEach(place => addElement(place.name, place.link));
