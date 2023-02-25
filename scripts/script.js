import { createElementWithTypeAndClass } from "./helpers.js";

const code = [
  "linija1",
  "linija2",
  "linija3",
  "linija4",
  "linija5",
  "linija6",
  "linija7",
  "linija8",
];

const codeWrapper = document.querySelector(".code-wrapper");

code.forEach((line, index) => {
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

  codeWrapper.appendChild(lineWrapper);
});

const lineContainers = document.querySelectorAll(".line-container");
const lineWrappers = document.querySelectorAll(".line-wrapper");
const lineIndexes = document.querySelectorAll(".line-index");

lineIndexes.forEach((lineIndex, index) => {
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
  let cancelButtonText = document.createTextNode("Cancel");
  cancelButton.appendChild(cancelButtonText);

  let sendButton = createElementWithTypeAndClass("button", "button--send");
  let sendButtonText = document.createTextNode("Send");
  sendButton.appendChild(sendButtonText);

  let savePrivateNoteButton = createElementWithTypeAndClass(
    "button",
    "button--save"
  );
  let savePrivateNoteText = document.createTextNode("Save private note");
  savePrivateNoteButton.appendChild(savePrivateNoteText);

  commentWrapperBottom.appendChild(cancelButton);
  commentWrapperBottom.appendChild(sendButton);
  commentWrapperBottom.appendChild(savePrivateNoteButton);

  commentWrapper.appendChild(commentInput);
  commentWrapper.appendChild(commentWrapperBottom);

  lineWrappers[index].appendChild(commentWrapper);
});

const commentWrappers = document.querySelectorAll(".comment-wrapper");

lineIndexes.forEach((lineIndex, index) => {
  lineIndex.addEventListener("click", function (e) {
    if (!commentWrappers[index].classList.contains("comment-wrapper--shown")) {
      commentWrappers[index].classList.add("comment-wrapper--shown");
    }
    console.log(commentWrappers[index]);
  });
});

const cancelButtons = document.querySelectorAll(".button--cancel");

cancelButtons.forEach((cancelButton, index) => {
  cancelButton.addEventListener("click", function (e) {
    commentWrappers[index].classList.remove("comment-wrapper--shown");
  });
});
