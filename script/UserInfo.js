export default class UserInfo {
	constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector)  
    }
    
    getUserInfo() {
        const data = {};        
        data.name = this._name.textContent; 
        data.job = this._job.textContent;       
        return data;
    }

    setUserInfo(data) {
        this._name.textContent = data.profileName; 
        this._job.textContent = data.profileJob;
    }
}    


