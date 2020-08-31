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

function editFormClose () {
    nameInput.value = '';
    jobInput.value = '';
    popupClose(editProfilePopup);
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    editFormClose();  
}

function keyHandlerEditForm (evt) {
    if (evt.key === 'Enter' && nameInput.value !== '' && jobInput.value !== '') {
        editFormSubmitHandler(evt);
    }
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

function addFormClose () {
    placeNameInput.value = '';
    placeUrlInput.value = '';
    popupClose(addPlacePopup);
}

function closePreview () {
    popupClose(picturePreview);
}

function addFormSubmitHandler (evt) {
    evt.preventDefault();       
    addElement(placeNameInput.value, placeUrlInput.value);
    placeNameInput.value='';
    placeUrlInput.value='';
    addFormClose();  
}

function keyHandlerAddForm (evt) {
    if (evt.key === 'Enter' && placeNameInput.value !== '' && placeUrlInput.value !== '') {
        addFormSubmitHandler(evt);
    }
}

updateProfileButton.addEventListener('click', editFormOpen);
cancelEditButton.addEventListener('click', editFormClose);
formEditProfile.addEventListener('submit', editFormSubmitHandler);
nameInput.addEventListener('keydown', keyHandlerEditForm);
jobInput.addEventListener('keydown', keyHandlerEditForm);

addPlaceButton.addEventListener('click', () => popupOpen(addPlacePopup));
cancelAddButton.addEventListener('click', addFormClose);
formAddPlace.addEventListener('submit', addFormSubmitHandler);
placeNameInput.addEventListener('keydown', keyHandlerAddForm); 
placeUrlInput.addEventListener('keydown', keyHandlerAddForm);

closePreviewButton.addEventListener('click', closePreview);

initialCards.forEach(place => addElement(place.name, place.link));
