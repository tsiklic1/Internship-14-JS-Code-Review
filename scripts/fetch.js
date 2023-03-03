function likeCommentFetch(commentLikeToggleButton, baseUrl, key, comment) {
  const isLikedTrueObject = {
    isLiked: true,
  };
  commentLikeToggleButton.innerHTML = "Unlike";
  commentLikeToggleButton.classList.remove("button--like__green");

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
}

function unlikeCommentFetch(commentLikeToggleButton, baseUrl, key, comment) {
  const isLikedFalseObject = {
    isLiked: false,
  };
  commentLikeToggleButton.innerHTML = "Like";

  commentLikeToggleButton.classList.remove("button--like__red");
  commentLikeToggleButton.classList.add("button--like__green");

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

function postCommentFetch(commentContent, baseUrl, key, index) {
  const comment = {
    line: index + 1,
    text: commentContent,
  };

  (async () => {
    try {
      console.log(comment);

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
}

export { likeCommentFetch, unlikeCommentFetch, postCommentFetch };
