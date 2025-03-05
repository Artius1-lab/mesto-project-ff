const createApiService = ({ baseUrl, headers }) => {
  const fetchData = (endpoint, method = "GET", body = null) => {
    return fetch(`${baseUrl}/${endpoint}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    }).then(handleResponse);
  };

  const handleResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`${response.status} ${response.statusText}`);
  };

  return {
    getUserProfile: () => fetchData("users/me"),
    getCards: () => fetchData("cards"),
    addCard: (cardData) => fetchData("cards", "POST", cardData),
    removeCard: (cardId) => fetchData(`cards/${cardId}`, "DELETE"),
    updateUserProfile: (data) => fetchData("users/me", "PATCH", data),
    updateUserAvatar: (data) => fetchData("users/me/avatar", "PATCH", data),
    likeCard: (cardId) => fetchData(`cards/${cardId}/likes`, "PUT"),
    unlikeCard: (cardId) => fetchData(`cards/${cardId}/likes`, "DELETE"),
  };
};
export default createApiService
