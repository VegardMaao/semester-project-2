import { deleteListing } from "../api-functions/delete/deleteListing.mjs";

const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

export const deleteListingObserver = new MutationObserver(function (mutations) {
  const queryString = document.location.search;
  const parameter = new URLSearchParams(queryString);
  const id = parameter.get("id");
  endpoint = `/auction/listings/${id}`;
  completeUrl = baseUrl + endpoint;
  mutations.forEach(function () {
    const deleteBtn = document.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      deleteListing(completeUrl);
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  });
});
