export default class Api {
    constructor(data) {
		this._baseUrl = data.baseUrl;
		this._headers = data.headers;
    }
   
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res);
        })
    }

    patchInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileJob
            })
        })
        .then(res => {
            return this._checkResponse(res);
        })
    }
    
    patchAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            return this._checkResponse(res);
        })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res);
        })   
    }

    postCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(res => {
            return this._checkResponse(res);
        })
    }

    deleteCard(item) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res);
        })
    } 
    
    addLike(item) {
        return fetch(`${this._baseUrl}/cards/likes/${item}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res);
        })
    } 
    
    deleteLike(item) {
        return fetch(`${this._baseUrl}/cards/likes/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res);
        })
    } 

}    
