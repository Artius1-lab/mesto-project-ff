const createSection = (containerSelector, renderer) => {
  const _container = document.querySelector(containerSelector);

  const renderItems = (items) => {
    _container.innerHTML = "";
    items.forEach(item => _container.prepend(renderer(item)));
  };

  const addItem = (item) => {
    _container.prepend(renderer(item));
  };

  return { renderItems, addItem };
};
export default createSection