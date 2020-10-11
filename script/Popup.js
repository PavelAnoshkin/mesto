export default class Popup {
	constructor(popupSelector) {
    this._element = document.querySelector(popupSelector); 
    }
    
    open() {          
        this._closeEsc = this._handleEscClose.bind(this);
        this._element.addEventListener('keydown', this._closeEsc);
        this._element.classList.add('popup_opened');
        this._element.focus();
    }
    
    close() {
        this._element.classList.remove('popup_opened');
        this._element.removeEventListener('keydown', this._closeEsc);   
    }

    setEventListeners() {
        this._element.querySelector('.popup__button_action_close')
            .addEventListener('click', () => this.close());

        this._element.addEventListener('click', (evt) => {
            if (evt.target === this._element) {
                this.close();
            }
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}
