import {
  createElementWithTypeAndClass,
  getCurrentDateTime,
  createHTMLforCodeBlock,
  createHTMLforCommentWrapper,
  createHTMLforCommentDisplayWrapper,
} from "./helpers.js";

const baseUrl = "https://homework-server1.onrender.com/";

const key = "tsiklic1";

const headers = { key };

(async (baseUrl, headers) => {
  try {
    console.log("fetching");
    const response = await fetch(`${baseUrl}code`, { headers });
    const json = await response.json();

    console.log("Loaded");

    const codeLines = json.code.split("\n");

    const codeLinesWithTabs = codeLines.map((line) =>
      line.replace(/\s/g, "\u00A0")
    );

    codeLinesWithTabs.forEach((line, index) => {
      let lineWrapper = createHTMLforCodeBlock(line, index);

      codeWrapper.appendChild(lineWrapper);
    });

    const lineContainers = document.querySelectorAll(".line-container");
    const lineWrappers = document.querySelectorAll(".line-wrapper");
    const lineIndexes = document.querySelectorAll(".line-index");

    lineIndexes.forEach((lineIndex, index) => {
      let commentWrapper = createHTMLforCommentWrapper(index);

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

    const sendButtons = document.querySelectorAll(".button--send");

    sendButtons.forEach((sendButton, index) => {
      sendButton.addEventListener("click", function (e) {
        const commentContent = commentTextareas[index].value;

        console.log(commentTextareas[index].value);

        if (!commentContent) {
          alert("Comment can't be empty");
          return;
        }

        const comment = {
          line: index,
          text: commentContent,
        };

        console.log(comment);

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
            console.log("Posted comment", json);
          } catch (err) {
            console.log(err);
          }
        })();
      });
    });

    (async () => {
      try {
        const response = await fetch(`${baseUrl}comments`, {
          headers: { key },
        });
        const json = await response.json();

        console.log(json);

        json.comments.forEach((comment, index) => {
          let commentDisplayWrapper = createHTMLforCommentDisplayWrapper(
            comment,
            key,
            baseUrl
          );

          console.log(comment.id);

          lineWrappers[comment.line].appendChild(commentDisplayWrapper);

          let commentDeleteButton =
            commentDisplayWrapper.querySelector(".button--delete");
          console.log(index, commentDeleteButton);

          commentDeleteButton.addEventListener("click", function (e) {
            (async () => {
              try {
                const options = {
                  method: "DELETE",
                  headers: { key },
                };

                const response = await fetch(
                  `${baseUrl}remove/${comment.id}`,
                  options
                );
                console.log("Delete response: ", response);
                // const json = await response.json();
                // console.log(json);
              } catch (err) {
                console.log("ERROR:", err);
              }
            })();
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();

    // deleting comments with id
    // (async () => {
    //   try {
    //     const options = {
    //       method: "DELETE",
    //       headers: { key },
    //     };

    //     const response = await fetch(`${baseUrl}remove/39`, options);
    //     console.log("Delete response: ", response);
    //     // const json = await response.json();
    //     // console.log(json);
    //   } catch (err) {
    //     console.log("ERROR:", err);
    //   }
    // })();
  } catch (error) {
    console.log("ERROR:", error);
  }
})(baseUrl, headers);

const codeWrapper = document.querySelector(".code-wrapper");
