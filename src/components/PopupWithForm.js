import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._element.querySelector('.popup__button_action_submit'); 
    this._submitButtonText = this._submitButton.textContent;    
    }

    open(item = {}) {
        super.open();
        this._values = item;
    }    
    
    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');    
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);        
        return this._formValues;
    }

    _isSaving(isSaving) {
        if (isSaving) {
            this._submitButton.textContent = 'Сохранение...'; 
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (JSON.stringify(this._values) === '{}') {            
                this._isSaving(true);    
               
                this._handleFormSubmit(this._getInputValues())
                    .then(() => { 
                        this.close() 
                    })
                    .catch(err => { 
                        console.log(`Ошибка при сохранении: ${err}`)
                    })
                    .finally(() => {
                        this._isSaving(false);
                    }
                );
            } else {
                this._handleFormSubmit(this._values)
                    .then(() => { 
                        this.close() 
                    })
                    .catch(err => { 
                        console.log(`Ошибка при сохранении: ${err}`)
                    })
            }
        })
    }

    close() {
        super.close();
        this._element.querySelector('.popup__form').reset();          
    }
}
