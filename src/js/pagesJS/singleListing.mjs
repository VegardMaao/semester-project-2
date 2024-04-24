import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";
import * as postActions from "../api-functions/post/postActions.mjs";
import { putData } from "../api-functions/put/putData.mjs";
import { formCheck } from "../visual-effects/formValidation.mjs";
import { submitForm } from "../formActions/submitForms.mjs";
import { deleteListingObserver } from "../observers/deleteListingObserver.mjs";
import { listingObserver } from "../observers/bidAmountObserver.mjs";
import { editListingObserver } from "../observers/editListingObserver.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const id = parameter.get("id");
const singleListingDiv = document.querySelector(".single-listing");
const placeBidForm = document.querySelector(".make-a-bid");
const editListingForm = document.querySelector(".edit-listing-form");
const cancelEdit = document.querySelector(".cross-icon-edit");
const editListFieldsetElem = document.querySelector(
  ".edit-listing-fieldset"
).elements;
const submitBtn = document.querySelector(".submit-edit");
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

for (let i = 0; i < editListFieldsetElem.length; i++) {
  const input = editListFieldsetElem[i];
  input.onkeyup = () => formCheck(editListFieldsetElem, submitBtn);
}

editListingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  endpoint = `/auction/listings/${id}`;
  completeUrl = baseUrl + endpoint;
  submitForm(editListingForm, completeUrl, putData, editListingForm, "");
  setTimeout(() => {
    location.reload();
  }, 2500);
});

cancelEdit.addEventListener("click", () => {
  const currentPost = document.querySelector(".single-listing");
  const editFormDiv = document.querySelector(".edit-listing-container");
  const makeBidForm = document.querySelector(".make-a-bid");
  currentPost.style.cssText = "display: block;";
  makeBidForm.style.cssText = "display: flex;";
  editFormDiv.style.cssText = "display: none;";
});

const config = { attributes: true, childList: true, subtree: true };
listingObserver.observe(singleListingDiv, config);
deleteListingObserver.observe(singleListingDiv, config);
editListingObserver.observe(singleListingDiv, config);
