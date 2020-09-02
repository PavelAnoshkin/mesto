function showInputError (formElement, inputElement, errorMessage, validaitionForm) {
    const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validaitionForm.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validaitionForm.errorClass);
};
  
function hideInputError (formElement, inputElement, validaitionForm) {
    const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validaitionForm.inputErrorClass);
    errorElement.classList.remove(validaitionForm.errorClass);
    errorElement.textContent = '';
};
  
function clearInputError (formElement, validaitionForm) {
    const inputList = Array.from(formElement.querySelectorAll(validaitionForm.inputSelector));
    const buttonElement = formElement.querySelector(validaitionForm.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement, validaitionForm);
    inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validaitionForm));    
}

function isValid (formElement, inputElement, validaitionForm) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validaitionForm);
    } else {
        hideInputError(formElement, inputElement, validaitionForm);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState (inputList, buttonElement, validaitionForm) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validaitionForm.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validaitionForm.inactiveButtonClass);
    }  
};

function setEventListeners (formElement, validaitionForm) {
    const inputList = Array.from(formElement.querySelectorAll(validaitionForm.inputSelector));
    const buttonElement = formElement.querySelector(validaitionForm.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validaitionForm);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validaitionForm);
            toggleButtonState(inputList, buttonElement, validaitionForm);
        });
    });
};

function enableValidation (validaitionForm) {
    const formList = Array.from(document.querySelectorAll(validaitionForm.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validaitionForm);
    });
};

