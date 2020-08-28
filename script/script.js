const updateButton = document.querySelector('.profile__edit-button');
const cancelButton = document.querySelector('.popup__btn_action_close');
const dialogPopup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

function popupOpen(popup) {
    popup.classList.toggle('popup_opened'); 
}

function formOpen() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popupOpen(dialogPopup);
}

function formClose() {
    nameInput.value = '';
    jobInput.value = '';
    popupOpen(dialogPopup);
}

function formSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupOpen(dialogPopup);   
}

updateButton.addEventListener('click', formOpen);

cancelButton.addEventListener('click', formClose);

formElement.addEventListener('submit', formSubmitHandler);
