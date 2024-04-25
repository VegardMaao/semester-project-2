export const editListingObserver = new MutationObserver(function (mutations) {
  const currentPost = document.querySelector(".single-listing");
  const editFormDiv = document.querySelector(".edit-listing-container");
  const makeBidForm = document.querySelector(".make-a-bid");
  mutations.forEach(function () {
    const editBtn = document.querySelector(".edit");
    editBtn.addEventListener("click", () => {
      currentPost.style.cssText = "display: none;";
      makeBidForm.style.cssText = "display: none;";
      editFormDiv.style.cssText = "display: flex;";
    });
  });
});
