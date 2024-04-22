// import {  } from "../api-functions/put/";

const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

export const editListingObserver = new MutationObserver(function (mutations) {
  const queryString = document.location.search;
  const parameter = new URLSearchParams(queryString);
  const id = parameter.get("id");
  endpoint = `/auction/listings/${id}`;
  completeUrl = baseUrl + endpoint;
  mutations.forEach(function () {
    const editBtn = document.querySelector(".edit");
    editBtn.addEventListener("click", () => {
      console.log("hello");
    });
  });
});
