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

lineIndexes.forEach((lineIndex, i) => {
  lineIndex.addEventListener("focus", function (e) {
    // const inputBox = document.createElement("input");
    // lineWrappers[i].appendChild(inputBox);

    // const commentWrapper = document.createElement("div");
    // commentWrapper.classList.add("comment-wrapper");

    const commentWrapper = createElementWithTypeAndClass(
      "div",
      "comment-wrapper"
    );

    const commentInput = document.createElement("input");
    commentInput.classList.add("comment-input");

    const commentWrapperBottom = document.createElement("div");
    commentInput.classList.add("comment-wrapper--bottom");

    const sendButton = document.createElement;
  });
});
