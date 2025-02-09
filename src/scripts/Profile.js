export default class Profile {
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
  }

  getProfileData() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  updateProfile({ name, about, avatar, _id }) {
    this._userId = _id;
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = name;
    }
  }

  getUserId() {
    return this._userId;
  }
}
