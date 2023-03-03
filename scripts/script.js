import {
  createElementWithTypeAndClass,
  getCurrentDateTime,
  createHTMLforCodeBlock,
  createHTMLforCommentWrapper,
  createHTMLforCommentDisplayWrapper,
  createHTMLforPrivateNoteDisplayWrapper,
} from "./helpers.js";

import {
  likeCommentFetch,
  unlikeCommentFetch,
  postCommentFetch,
} from "./fetch.js";

import { localStorageLike } from "./localStorage.js";

const baseUrl = "https://homework-server1.onrender.com/";
const key = "tsiklic1";
const headers = { key };

(async (baseUrl, headers) => {
  let localStorageKey = 0;
  try {
    const response = await fetch(`${baseUrl}code`, { headers });
    const json = await response.json();

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
        postCommentFetch(commentContent, baseUrl, key, index);

        commentTextareas[index].value = "";
        commentWrappers[index].classList.remove("comment-wrapper--shown");
      });
    });

    const savePrivateNoteButtons = document.querySelectorAll(".button--save");
    savePrivateNoteButtons.forEach((savePrivateNoteButton, index) => {
      savePrivateNoteButton.addEventListener("click", function (e) {
        if (!commentTextareas[index].value) {
          alert("Private note can't be empty");
          return;
        }

        const privateNote = {
          isLiked: false,
          text: commentTextareas[index].value,
          createdAt: getCurrentDateTime(),
          line: index,
        };

        if (localStorage.length) {
          let maxKey = -1;
          for (let i = 0; i < localStorage.length; i++) {
            if (+localStorage.key(i) > maxKey) {
              maxKey = +localStorage.key(i);
            }
          }
          localStorageKey = maxKey + 1;
        }
        localStorage.setItem(
          JSON.stringify(localStorageKey),
          JSON.stringify(privateNote)
        );
        commentTextareas[index].value = "";
        commentWrappers[index].classList.remove("comment-wrapper--shown");
      });
    });

    const localStorageItems = { ...localStorage };
    const localStorageObjectStrings = Object.values(localStorageItems);
    const localStorageObjects = localStorageObjectStrings.map((objectString) =>
      JSON.parse(objectString)
    );
    const localStorageKeysStrings = Object.keys(localStorageItems);
    const localStorageKeys = localStorageKeysStrings.map((keyString) =>
      parseInt(keyString)
    );

    localStorageObjects.forEach((localStorageObject, index) => {
      let privateNoteDisplayWrapper = createHTMLforPrivateNoteDisplayWrapper(
        localStorageObject,
        baseUrl,
        key
      );
      lineWrappers[localStorageObject.line].appendChild(
        privateNoteDisplayWrapper
      );
      let privateNoteDeleteButton = privateNoteDisplayWrapper.querySelector(
        ".private-note-button--delete"
      );

      privateNoteDeleteButton.addEventListener("click", function (e) {
        localStorage.removeItem(localStorageKeys[index]);
        privateNoteDisplayWrapper.classList.add(
          "comment-display-wrapper--removed"
        );
      });

      localStorageLike(
        privateNoteDisplayWrapper,
        localStorageKeys,
        index,
        localStorageObject
      );
    });

    (async () => {
      try {
        const response = await fetch(`${baseUrl}comments`, {
          headers: { key },
        });
        const json = await response.json();

        if (!response.ok) {
          throw json.message;
        }

        json.comments.forEach((comment, index) => {
          let commentDisplayWrapper = createHTMLforCommentDisplayWrapper(
            comment,
            key,
            baseUrl
          );

          lineWrappers[comment.line - 1].appendChild(commentDisplayWrapper);
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

                if (!response.ok) {
                  const json = await response.json();
                  throw json.message;
                }

                commentDisplayWrapper.classList.add(
                  "comment-display-wrapper--removed"
                );
              } catch (err) {
                console.log("ERROR:", err);
                alert("Error", err);
              }
            })();
          });

          commentLikeToggleButton.addEventListener("click", function (e) {
            (async () => {
              try {
                const response = await fetch(
                  `${baseUrl}comments/${comment.id}`, //comment.id
                  {
                    headers,
                  }
                );
                const fetchedComment = await response.json();

                if (!response.ok) {
                  throw fetchedComment.message;
                }

                if (!fetchedComment.comment.isLiked) {
                  likeCommentFetch(
                    commentLikeToggleButton,
                    baseUrl,
                    key,
                    comment
                  );
                } else {
                  unlikeCommentFetch(
                    commentLikeToggleButton,
                    baseUrl,
                    key,
                    comment
                  );
                }
              } catch (err) {
                alert("error", err);
              }
            })();
          });
        });
      } catch (err) {
        console.log(err);
        alert(err);
      }
    })();
  } catch (error) {
    console.log("ERROR:", error);
  }
})(baseUrl, headers);

const codeWrapper = document.querySelector(".code-wrapper");
