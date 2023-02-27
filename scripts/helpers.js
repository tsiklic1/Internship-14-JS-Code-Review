function createElementWithTypeAndClass(type, className) {
  const element = document.createElement(type);
  element.classList.add(String(className));

  return element;
}

function getCurrentDateTime() {
  return (
    new Date().toLocaleDateString() + "--" + new Date().toLocaleTimeString()
  );
}

export { createElementWithTypeAndClass, getCurrentDateTime };
