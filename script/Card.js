export class Card {
    constructor(item, cardSelector) {
		this._name = item.name;
		this._link = item.link;
        this._cardSelector = cardSelector;
    }
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__header').textContent = this._name;
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._link;
        elementImage.alt = this._name;        
    
        this._setEventListeners();
    
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteElement()
        });

        this._element.querySelector('.element__like-button').addEventListener('click', () => { 
            this._addLike()
        });   
    }
    
    _deleteElement() {
        this._element.remove();
    }

    _addLike() {
        this._element.querySelector('.element__like-button')
            .classList.toggle('element__like-button_checked')
    }
}
