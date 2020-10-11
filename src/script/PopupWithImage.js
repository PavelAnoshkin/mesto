import Popup from '../script/Popup.js'

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
        super(popupSelector);
    }
    
    open(data) {  
        const popupPicture = this._element.querySelector('.popup__picture');
        const popupPictureCaption = this._element.querySelector('.popup__picture-caption');
       
        popupPicture.src = data.url;
        popupPicture.alt = data.name;
        popupPictureCaption.textContent = data.name;
        
        super.open();
    }
}   
