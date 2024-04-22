import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";
import * as postActions from "../api-functions/post/postActions.mjs";
import { deleteListingObserver } from "../observers/deleteListingObserver.mjs";
import { listingObserver } from "../observers/bidAmountObserver.mjs";
import { editListingObserver } from "../observers/editListingObserver.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const singleListingDiv = document.querySelector(".single-listing");
const placeBidForm = document.querySelector(".make-a-bid");
const errorDiv = document.querySelector(".error-msg");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint = `/auction/listings/${id}?_seller=true&_bids=true`;
let completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, singleListingDiv, getActions.singlePostContent);

placeBidForm.addEventListener("submit", (e) => {
  e.preventDefault();
  endpoint = `/auction/listings/${id}/bids`;
  completeUrl = baseUrl + endpoint;
  const formData = new FormData(placeBidForm);
  const formdataOBj = {};
  formData.forEach((value, key) => (formdataOBj[key] = parseInt(value)));
  postActions.placeBid(completeUrl, formdataOBj, errorDiv);
});

const config = { attributes: true, childList: true, subtree: true };
listingObserver.observe(singleListingDiv, config);
deleteListingObserver.observe(singleListingDiv, config);
editListingObserver.observe(singleListingDiv, config);
