export default class FormValidator {
    constructor(data, formSelector) {        
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;

        this._formSelector = formSelector;
    } 

    enableValidation() {
        this._element = document.querySelector(this._formSelector);
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    clearInputError () {
        const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
        const buttonElement = this._element.querySelector(this._submitButtonSelector); 
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => this._hideInputError(inputElement));    
    }

    _setEventListeners () {
        const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
        const buttonElement = this._element.querySelector(this._submitButtonSelector);
    
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true; 
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false; 
        }  
    };

    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _showInputError (inputElement, errorMessage) {
        const errorElement  = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
      
    _hideInputError (inputElement) {
        const errorElement  = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };    

}
