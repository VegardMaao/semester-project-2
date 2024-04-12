import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";
import * as postActions from "../api-functions/post/postActions.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const singleListingDiv = document.querySelector(".single-listing");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint = `/auction/listings/${id}?_seller=true&_bids=true`;
let completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, singleListingDiv, getActions.singlePostContent);

const placeBidForm = document.querySelector(".make-a-bid");
const bidInput = document.querySelector("#bidamount");

placeBidForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const errorDiv = document.querySelector(".error-msg");
  endpoint = `/auction/listings/${id}/bids`;
  completeUrl = baseUrl + endpoint;
  const formData = new FormData(placeBidForm);
  const formdataOBj = {};
  formData.forEach((value, key) => (formdataOBj[key] = parseInt(value)));
  postActions.placeBid(completeUrl, formdataOBj, errorDiv);
});

const listingObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const bidAmountString = document.querySelector(".bid-amount").innerHTML;
    if (bidAmountString === "Be the first to place a bid!") {
      bidInput.min = 1;
      bidInput.placeholder = "1 or  higher";
    } else {
      const minBid = document.querySelector(".highest-bid").innerHTML;
      bidInput.min = parseInt(minBid) + 1;
      bidInput.placeholder = `${parseInt(minBid) + 1} or higher`;
    }
  });
});

const config = { attributes: true, childList: true, subtree: true };
listingObserver.observe(singleListingDiv, config);
