const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

export const editListingObserver = new MutationObserver(function (mutations) {
  const queryString = document.location.search;
  const parameter = new URLSearchParams(queryString);
  const id = parameter.get("id");
  endpoint = `/auction/listings/${id}`;
  completeUrl = baseUrl + endpoint;
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
