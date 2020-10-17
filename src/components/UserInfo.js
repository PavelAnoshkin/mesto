export default class UserInfo {
	constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = '';  
    }
    
    getUserInfo() {
        const data = {
            name : this._name.textContent,
            job : this._job.textContent,      
            avatar : this._avatar.src,
            id: this._id 
        };
        return data;
    }

    setUserInfo(data) {
        this._name.textContent = data.profileName; 
        this._job.textContent = data.profileJob;
        this._avatar.src = data.profileAvatar;
        this._id = data.profileId;
    }

    setAvatarImage(data) {
        this._avatar.src = data.avatar;
    }
}    
