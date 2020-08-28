const updateButton = document.querySelector('.profile__edit-button');
const cancelButton = document.querySelector('.popup__btn_action_close');
const dialogPopup = document.querySelector('.popup');

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');


updateButton.addEventListener('click', function() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    dialogPopup.classList.add('popup_opened');
});

cancelButton.addEventListener('click', function() {
    nameInput.value = '';
    jobInput.value = '';
    dialogPopup.classList.remove('popup_opened');
});

const formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    dialogPopup.classList.remove('popup_opened');   
}