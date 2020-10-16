export default class Card {
    constructor(item, cardSelector, userId, handleCardClick, handleDeleteClick, handleAddLike, handleDeleteLike) {
		this._name = item.name;
        this._link = item.link;
        this._owner = item.owner;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick; 
        this._handleDeleteClick = handleDeleteClick;
        this._handleAddLike = handleAddLike;
        this._handleDeleteLike = handleDeleteLike;
        this._likes = item.likes;
        this._id = item._id;
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
        
        this._refreshLike(this._likes);
        if (this._owner._id === this._userId) {
            this._addDeleteButton()
        }
        
        this._setEventListeners();
    
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-button')
            .addEventListener('click', () => {
                this._handleDeleteClick(this)
            });

        this._element.querySelector('.element__like-button').addEventListener('click', () => { 
            this._addLike()
        });
        
        this._element.querySelector('.element__image')
            .addEventListener('click', (evt) => this._handleCardClick(evt));
    }
    
    deleteElement() {
        this._element.remove();
        this._element = null;
    }

    _addLike() {
        const userLike = this._element.querySelector('.element__like-button')
            .classList.contains('element__like-button_checked');
        if (!userLike) { 
            this._handleAddLike(this._id)
                .then(result => {
                    this._refreshLike(result.likes);           
                })
                .catch(err => { 
                    console.log(`Ошибка при установке лайка: ${err}`)
                }); 
        } else {
            this._handleDeleteLike(this._id)
                .then(result => {
                    this._refreshLike(result.likes);               
                })
                .catch(err => { 
                    console.log(`Ошибка при снятии лайка: ${err}`)
                });         
        }        
    }

    _refreshLike(likes) {
        this._setLikesCount(likes);
        this._toddleLike(likes); 
    }
    
    _toddleLike(likes) {       
        const likeButton = this._element.querySelector('.element__like-button');
        const checkUserLike = (like) => like._id === this._userId;
        
        if (likes.some(checkUserLike)) {            
            likeButton.classList.add('element__like-button_checked');
        } else {
            likeButton.classList.remove('element__like-button_checked');
        }        
    }

    _setLikesCount(likes) {
        this._element.querySelector('.element__likes').textContent = likes.length;    
    }

    _addDeleteButton() {
        this._element.querySelector('.element__delete-button')
            .classList.toggle('element__delete-button_active')
    }

    getId() {
        return this._id  
    }
}
