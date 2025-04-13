export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  if (options.id) {
    element.id = options.id;
  }
  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }

  return element;
};
