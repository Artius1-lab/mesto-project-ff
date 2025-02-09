export default class ApiService {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  fetchData(endpoint, method = "GET", body = null) {
    return fetch(`${this.baseUrl}/${endpoint}`, {
      method,
      headers: this.headers,
      ...(body && { body: JSON.stringify(body) }),
    }).then(this.handleResponse);
  }
  getUserProfile() {
    return this.fetchData("users/me");
  }
  handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(`${response.status} ${response.statusText}`);
  }

  getCards() {
    return this.fetchData("cards");
  }

  addCard(cardData) {
    return this.fetchData("cards", "POST", cardData);
  }

  removeCard(cardId) {
    return this.fetchData(`cards/${cardId}`, "DELETE");
  }



  updateUserProfile(data) {
    return this.fetchData("users/me", "PATCH", data);
  }

  updateUserAvatar(data) {
    return this.fetchData("users/me/avatar", "PATCH", data);
  }

  likeCard(cardId) {
    return this.fetchData(`cards/${cardId}/likes`, "PUT");
  }

  unlikeCard(cardId) {
    return this.fetchData(`cards/${cardId}/likes`, "DELETE");
  }
}
