function createElementWithTypeAndClass(type, className) {
  const element = document.createElement(type);
  element.classList.add(String(className));

  return element;
}

export { createElementWithTypeAndClass };
