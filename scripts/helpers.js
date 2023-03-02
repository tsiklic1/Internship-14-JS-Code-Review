function createElementWithTypeAndClass(type, className) {
  const element = document.createElement(type);
  element.classList.add(String(className));

  return element;
}

function getCurrentDateTime() {
  return String(
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

function createHTMLforCommentDisplayWrapper(comment, baseUrl, key) {
  let commentDisplayWrapper = createElementWithTypeAndClass(
    "div",
    "comment-display-wrapper"
  );

  let commentText = createElementWithTypeAndClass("p", "comment-text");
  let commentTextNode = document.createTextNode(comment.text);
  commentText.appendChild(commentTextNode);

  let commentDisplayBottom = createElementWithTypeAndClass(
    "div",
    "comment-display--bottom"
  );

  let commentDate = createElementWithTypeAndClass("p", "comment-date");
  let commentDateNode = document.createTextNode(comment.createdAt);
  commentDate.appendChild(commentDateNode);

  let commentLikeToggleButton = createElementWithTypeAndClass(
    "button",
    "button--like"
  );

  let commentLikeToggleButtonNode;

  if (comment.isLiked) {
    commentLikeToggleButtonNode = document.createTextNode("Unlike");
    commentLikeToggleButton.classList.add("button--like__red");
  } else {
    commentLikeToggleButtonNode = document.createTextNode("Like");
    commentLikeToggleButton.classList.add("button--like__green");
  }

  commentLikeToggleButton.appendChild(commentLikeToggleButtonNode);

  let commentDeleteButton = createElementWithTypeAndClass(
    "button",
    "button--delete"
  );
  let commentDeleteButtonNode = document.createTextNode("Delete");
  commentDeleteButton.appendChild(commentDeleteButtonNode);

  commentDisplayBottom.appendChild(commentDate);
  commentDisplayBottom.appendChild(commentLikeToggleButton);
  commentDisplayBottom.appendChild(commentDeleteButton);

  commentDisplayWrapper.appendChild(commentText);
  commentDisplayWrapper.appendChild(commentDisplayBottom);

  return commentDisplayWrapper;
}

function createHTMLforPrivateNoteDisplayWrapper(privateNote, baseUrl, key) {
  let privateNoteDisplayWrapper = createElementWithTypeAndClass(
    "div",
    "private-note-display-wrapper"
  );

  let privateNoteText = createElementWithTypeAndClass("p", "comment-text");
  let privateNoteTextNode = document.createTextNode(privateNote.text);
  privateNoteText.appendChild(privateNoteTextNode);

  let privateNoteDisplayBottom = createElementWithTypeAndClass(
    "div",
    "private-note-display--bottom"
  );

  let privateNoteDate = createElementWithTypeAndClass("p", "comment-date");
  let privateNoteDateNode = document.createTextNode(privateNote.createdAt);
  privateNoteDate.appendChild(privateNoteDateNode);

  let privateNoteLikeToggleButton = createElementWithTypeAndClass(
    "button",
    "private-note-button--like"
  );

  let privateNoteLikeToggleButtonNode;

  if (privateNote.isLiked) {
    privateNoteLikeToggleButtonNode = document.createTextNode("Unlike");
    privateNoteLikeToggleButton.classList.add("private-note-button--like__red");
  } else {
    privateNoteLikeToggleButtonNode = document.createTextNode("Like");
    privateNoteLikeToggleButton.classList.add(
      "private-note-button--like__green"
    );
  }

  privateNoteLikeToggleButton.appendChild(privateNoteLikeToggleButtonNode);

  let privateNoteDeleteButton = createElementWithTypeAndClass(
    "button",
    "private-note-button--delete"
  );
  let privateNoteDeleteButtonNode = document.createTextNode("Delete");
  privateNoteDeleteButton.appendChild(privateNoteDeleteButtonNode);

  privateNoteDisplayBottom.appendChild(privateNoteDate);
  privateNoteDisplayBottom.appendChild(privateNoteLikeToggleButton);
  privateNoteDisplayBottom.appendChild(privateNoteDeleteButton);

  privateNoteDisplayWrapper.appendChild(privateNoteText);
  privateNoteDisplayWrapper.appendChild(privateNoteDisplayBottom);

  return privateNoteDisplayWrapper;
}
export {
  createElementWithTypeAndClass,
  getCurrentDateTime,
  createHTMLforCodeBlock,
  createHTMLforCommentWrapper,
  createHTMLforCommentDisplayWrapper,
  createHTMLforPrivateNoteDisplayWrapper,
};
