import {
  createElementWithTypeAndClass,
  getCurrentDateTime,
} from "./helpers.js";

const baseUrl = "https://homework-server1.onrender.com/";

const key = "tsiklic1";

const headers = { key };

(async (baseUrl, headers) => {
  try {
    const response = await fetch(`${baseUrl}code`, { headers });
    const json = await response.json();

    console.log("ucitalo se");

    const codeLines = json.code.split("\n");

    const codeLinesWithTabs = codeLines.map((line) =>
      line.replace(/\s/g, "\u00A0")
    );

    codeLinesWithTabs.forEach((line, index) => {
      let lineWrapper = createElementWithTypeAndClass("div", "line-wrapper");

      let lineContainer = createElementWithTypeAndClass(
        "div",
        "line-container"
      );

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
      let commentWrapper = createElementWithTypeAndClass(
        "div",
        "comment-wrapper"
      );

      let commentInput = createElementWithTypeAndClass(
        "textarea",
        "comment-textarea"
      );

      let commentWrapperBottom = createElementWithTypeAndClass(
        "div",
        "comment-wrapper--bottom"
      );

      let cancelButton = createElementWithTypeAndClass(
        "button",
        "button--cancel"
      );
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

      lineWrappers[index].appendChild(commentWrapper);
    });

    const commentWrappers = document.querySelectorAll(".comment-wrapper");
    const commentTextareas = document.querySelectorAll(".comment-textarea");

    lineIndexes.forEach((lineIndex, index) => {
      lineIndex.addEventListener("click", function (e) {
        if (
          !commentWrappers[index].classList.contains("comment-wrapper--shown")
        ) {
          commentWrappers[index].classList.add("comment-wrapper--shown");
        }
      });
    });

    const cancelButtons = document.querySelectorAll(".button--cancel");

    cancelButtons.forEach((cancelButton, index) => {
      cancelButton.addEventListener("click", function (e) {
        commentWrappers[index].classList.remove("comment-wrapper--shown");
        commentTextareas[index].value = "";
      });
    });

    //send comment
    const sendButtons = document.querySelectorAll(".button--send");

    sendButtons.forEach((sendButton, index) => {
      sendButton.addEventListener("click", function (e) {
        const commentContent = commentTextareas[index].value;

        // if (!commentContent) {
        //   alert("Comment can't be empty");
        //   return;
        // }

        const comment = {
          line: index,
          text: commentContent,
        };

        (async () => {
          try {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                key,
              },
              body: JSON.stringify(comment),
            };

            const response = await fetch(`${baseUrl}create`, options);
            const json = await response.json();
            console.log(json.comment);
          } catch (err) {
            console.log(err);
          }
        })();
      });
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
})(baseUrl, headers);

const codeWrapper = document.querySelector(".code-wrapper");

// fetch(`${baseUrl}comments/:id`, { headers: { key } })
//   .then((response) => response.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));

// fetch(`${baseUrl}create`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     key,
//   },
//   body: JSON.stringify({
//     firstName: "test",
//     lastName: "testis",
//   }),
// })
//   .then((response) => response.json())
//   .then((json) => {
//     if (!json.userId) throw "Error no user";
//   })
//   .catch((error) => console.log(err));
