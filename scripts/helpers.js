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

function createHTMLforCodeBlock(line, index) {
  let lineWrapper = createElementWithTypeAndClass("div", "line-wrapper");

  let lineContainer = createElementWithTypeAndClass("div", "line-container");

  let lineIndex = createElementWithTypeAndClass("button", "line-index");
  let lineIndexNode = document.createTextNode(String(index + 1));
  lineIndex.appendChild(lineIndexNode);

  let lineContent = createElementWithTypeAndClass("p", "line-content");
  let lineContentNode = document.createTextNode(line);
  lineContent.appendChild(lineContentNode);

  lineContainer.appendChild(lineIndex);
  lineContainer.appendChild(lineContent);

  lineWrapper.appendChild(lineContainer);
  return lineWrapper;
}

function createHTMLforCommentWrapper(index) {
  let commentWrapper = createElementWithTypeAndClass("div", "comment-wrapper");

  let commentInput = createElementWithTypeAndClass(
    "textarea",
    "comment-textarea"
  );

  let commentWrapperBottom = createElementWithTypeAndClass(
    "div",
    "comment-wrapper--bottom"
  );

  let cancelButton = createElementWithTypeAndClass("button", "button--cancel");
  cancelButton.classList.add("button");
  let cancelButtonText = document.createTextNode("Cancel");
  cancelButton.appendChild(cancelButtonText);

  let sendButton = createElementWithTypeAndClass("button", "button--send");
  sendButton.classList.add("button");

  let sendButtonText = document.createTextNode("Send");
  sendButton.appendChild(sendButtonText);

  let savePrivateNoteButton = createElementWithTypeAndClass(
    "button",
    "button--save"
  );
  savePrivateNoteButton.classList.add("button");

  let savePrivateNoteText = document.createTextNode("Save private note");
  savePrivateNoteButton.appendChild(savePrivateNoteText);

  commentWrapperBottom.appendChild(cancelButton);
  commentWrapperBottom.appendChild(sendButton);
  commentWrapperBottom.appendChild(savePrivateNoteButton);

  commentWrapper.appendChild(commentInput);
  commentWrapper.appendChild(commentWrapperBottom);

  return commentWrapper;
}

export {
  createElementWithTypeAndClass,
  getCurrentDateTime,
  createHTMLforCodeBlock,
  createHTMLforCommentWrapper,
};
