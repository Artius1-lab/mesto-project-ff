const createProfile = ({ nameElement, aboutElement, avatarElement }) => {
  let _userId;

  const getProfileData = () => ({
    name: nameElement.textContent,
    about: aboutElement.textContent
  });

  const updateProfile = ({ name, about, avatar, _id }) => {
    if (name) nameElement.textContent = name;
    if (about) aboutElement.textContent = about;
    if (avatar) {
      avatarElement.src = avatar;
      avatarElement.alt = name;
    }
    if (_id) _userId = _id;
  };

  return { getProfileData, updateProfile, getUserId: () => _userId };
};

export default createProfile