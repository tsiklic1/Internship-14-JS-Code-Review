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

//adding html with js - example

// const para = document.createElement("p");
// const node = document.createTextNode("This is new.");
// para.appendChild(node);
// const element = document.querySelector(".code-wrapper");
// element.appendChild(para);

const codeWrapper = document.querySelector(".code-wrapper");

// code.forEach((line) => {
//   let lineElement = document.createElement("p");
//   let lineNode = document.createTextNode(line);
//   lineElement.appendChild(lineNode);
//   codeWrapper.appendChild(lineElement);
// });

code.forEach((line, index) => {
  let lineContainer = document.createElement("div");

  let lineIndex = document.createElement("p");
  let lineIndexNode = document.createTextNode(String(index + 1));
  lineIndex.appendChild(lineIndexNode);
  lineIndex.classList.add("line-index");

  let lineContent = document.createElement("p");
  let lineContentNode = document.createTextNode(line);
  lineContent.appendChild(lineContentNode);
  lineContent.classList.add("line-content");

  lineContainer.appendChild(lineIndex);
  lineContainer.appendChild(lineContent);
  lineContainer.classList.add("line-container");

  codeWrapper.appendChild(lineContainer);
});

const lines = document.querySelectorAll(".line-container");

const lineIndexes = document.querySelectorAll(".line-index");

// lineIndexes.forEach((lineIndex) => {
//   lineIndex.addEventListener("focus", function (e) {
//     lineIndex.style.color("red");
//   });
// });
