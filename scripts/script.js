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

        if (!commentContent) {
          alert("Comment can't be empty");
          return;
        }

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
            console.log("Posted comment", json);
          } catch (err) {
            console.log(err);
          }
        })();
        commentTextareas[index].value = "";
        commentWrappers[index].classList.remove("comment-wrapper--shown");
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

          let commentLikeToggleButton =
            commentDisplayWrapper.querySelector(".button--like");

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
              } catch (err) {
                console.log("ERROR:", err);
              }
            })();

            commentDisplayWrapper.classList.add(
              "comment-display-wrapper--removed"
            );
          });

          console.log(index, commentLikeToggleButton);

          commentLikeToggleButton.addEventListener("click", function (e) {
            console.log(commentLikeToggleButton);
            console.log("glavni", comment);
            (async () => {
              try {
                const response = await fetch(
                  `${baseUrl}comments/${comment.id}`,
                  {
                    headers,
                  }
                );
                const fetchedComment = await response.json();

                console.log("fetchedComment: ", fetchedComment);

                if (!fetchedComment.comment.isLiked) {
                  console.log("fetchedComment not liked");
                  const isLikedTrueObject = {
                    isLiked: true,
                  };
                  commentLikeToggleButton.innerHTML = "Unlike";
                  commentLikeToggleButton.classList.remove(
                    "button--like__green"
                  );

                  commentLikeToggleButton.classList.add("button--like__red");
                  (async () => {
                    try {
                      const options = {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          key,
                        },
                        body: JSON.stringify(isLikedTrueObject),
                      };

                      const response = await fetch(
                        `${baseUrl}update-is-liked/${comment.id}`,
                        options
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  })();
                } else {
                  console.log("fetchedComment is liked");

                  commentLikeToggleButton.innerHTML = "Like";
                  console.log("lajkan");

                  commentLikeToggleButton.classList.remove("button--like__red");
                  commentLikeToggleButton.classList.add("button--like__green");

                  const isLikedFalseObject = {
                    isLiked: false,
                  };
                  (async () => {
                    try {
                      const options = {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          key,
                        },
                        body: JSON.stringify(isLikedFalseObject),
                      };

                      const response = await fetch(
                        `${baseUrl}update-is-liked/${comment.id}`,
                        options
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  })();
                }
              } catch (err) {
                console.log(err);
              }
            })();
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
  } catch (error) {
    console.log("ERROR:", error);
  }
})(baseUrl, headers);

const codeWrapper = document.querySelector(".code-wrapper");
