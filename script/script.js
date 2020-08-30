const initialCards = [
    {
        name: 'Дорога',
        link: 'https://images.unsplash.com/photo-1593898918814-b7340e572cce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80'
    },
    {
        name: 'Отдых',
        link: 'https://images.unsplash.com/photo-1598397678815-c5dc869035b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Сидней',
        link: 'https://images.unsplash.com/photo-1598674804343-c41706c58d9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=695&q=80'
    },
    {
        name: 'Горное озеро',
        link: 'https://images.unsplash.com/photo-1598642965554-eaa5f0362997?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'На вершине',
        link: 'https://images.unsplash.com/photo-1598523959079-da7b0e3d7b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=697&q=80'
    },
    {
        name: 'Вид сверху',
        link: 'https://images.unsplash.com/photo-1598580431211-3b32fe73167e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    {
        name: 'Чайка',
        link: 'https://images.unsplash.com/photo-1598493869856-4369b3eed556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    }
];

const elementContainer =  document.querySelector('.elements');

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

function editFormOpen () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    editProfilePopup.classList.toggle('popup_opened');
}

function editFormClose () {
    nameInput.value = '';
    jobInput.value = '';
    editProfilePopup.classList.toggle('popup_opened');
    editProfilePopup.classList.add('popup_closed');
}

function fadeOutPopup (evt) {
    if (evt.animationName === 'fade-out') {
        evt.target.classList.remove('popup_closed');
     }
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

function addElement (elementName, elementUrl) {   
    
    function deleteElement () {
        const unnecessaryElement = deleteElementButton.closest('.element');
        unnecessaryElement.remove();
    }

    function picturePreviewOpen (evt) {
        const popupPicture = picturePreview.querySelector('.popup__picture');
        const popupPictureCaption = picturePreview.querySelector('.popup__picture-caption');
        const element = evt.target.closest('.element');
        const elementHeader = element.querySelector('.element__header');
        
        popupPicture.src = evt.target.src;
        popupPictureCaption.textContent = elementHeader.textContent;
        picturePreview.classList.toggle('popup_opened'); 
    }
        
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.cloneNode(true);
    
    element.querySelector('.element__header').textContent = elementName;
    element.querySelector('.element__image').src = elementUrl;
    element.querySelector('.element__image').alt = elementName;
      
    const deleteElementButton = element.querySelector('.element__delete-button');    
    deleteElementButton.addEventListener('click', deleteElement);
    
    element.querySelector('.element__like-btn').addEventListener('click', evt => evt.target.classList.toggle('element__like-btn_checked'));

    const elementImage = element.querySelector('.element__image');
    elementImage.addEventListener('click', evt => picturePreviewOpen(evt));

    elementContainer.prepend(element);
}

function addFormClose () {
    placeNameInput.value = '';
    placeUrlInput.value = '';
    addPlacePopup.classList.toggle('popup_opened');
    addPlacePopup.classList.add('popup_closed');
}

function closePreview () {
    picturePreview.classList.remove('popup_opened');
    picturePreview.classList.add('popup_closed');
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
editProfilePopup.addEventListener('animationend', (evt) => fadeOutPopup(evt));
nameInput.addEventListener('keydown', keyHandlerEditForm);
jobInput.addEventListener('keydown', keyHandlerEditForm);

addPlaceButton.addEventListener('click', () => addPlacePopup.classList.toggle('popup_opened'));
cancelAddButton.addEventListener('click', addFormClose);
formAddPlace.addEventListener('submit', addFormSubmitHandler);
addPlacePopup.addEventListener('animationend', (evt) => fadeOutPopup(evt));
placeNameInput.addEventListener('keydown', keyHandlerAddForm); 
placeUrlInput.addEventListener('keydown', keyHandlerAddForm);

picturePreview.addEventListener('animationend', (evt) => fadeOutPopup(evt));
closePreviewButton.addEventListener('click', closePreview);

initialCards.forEach(place => addElement(place.name, place.link));
