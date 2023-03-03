function localStorageLike(
  privateNoteDisplayWrapper,
  localStorageKeys,
  index,
  localStorageObject
) {
  let privateNoteLikeButton = privateNoteDisplayWrapper.querySelector(
    ".private-note-button--like"
  );
  privateNoteLikeButton.addEventListener("click", function (e) {
    const id = localStorageKeys[index];
    if (localStorageObject.isLiked) {
      localStorageObject.isLiked = false;
      localStorage.setItem(id, JSON.stringify(localStorageObject));
      privateNoteLikeButton.innerHTML = "Like";

      privateNoteLikeButton.classList.remove("button--like__red");
      privateNoteLikeButton.classList.add("button--like__green");
    } else {
      localStorageObject.isLiked = true;
      localStorage.setItem(id, JSON.stringify(localStorageObject));
      privateNoteLikeButton.innerHTML = "Unlike";

      privateNoteLikeButton.classList.remove("button--like__green");
      privateNoteLikeButton.classList.add("button--like__red");
    }
  });
}

export { localStorageLike };
