import * as getActions from "../api-functions/get/getActions/makeUser.mjs";
import * as getData from "../api-functions/get/getData.mjs";
import * as formValidation from "../visual-effects/formValidation.mjs";
import { submitForm } from "../formActions/submitForms.mjs";
import { putData } from "../api-functions/put/putData.mjs";
import { config } from "../observers/config/config.mjs";
import { editProfileObserver } from "../observers/editProfileObserver.mjs";

const userInfoSection = document.querySelector(".user-info");
const userListings = document.querySelector(".user-listings");
const userWins = document.querySelector(".user-wins");
const updateProfileSection = document.querySelector(".update-profile");
const updateProfileForm = document.querySelector(".update-profile-form");
const updateProfileFieldsetElem = document.querySelector(
  ".update-profile-fieldset"
).elements;
const bioTextAreaInp = document.querySelector("#bio-text-area");
const counter = document.querySelector(".counter");
const maxValText = document.querySelector(".max-val");
const updateProfileBtn = document.querySelector(".update-profile-btn");
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const profile = parameter.get("profile");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

endpoint = `/auction/profiles/${profile}?_listings=true&_wins=true`;
completeUrl = baseUrl + endpoint;
getData.getData(
  completeUrl,
  userInfoSection,
  getActions.makeUserProfileSummary
);

getData.getData(completeUrl, userListings, getActions.makeUserListings);
getData.getData(completeUrl, userWins, getActions.makeUserWins);

editProfileObserver.observe(userInfoSection, config);

for (let i = 0; i < updateProfileFieldsetElem.length; i++) {
  const input = updateProfileFieldsetElem[i];
  input.onkeyup = () =>
    formValidation.formCheck(updateProfileFieldsetElem, updateProfileBtn);
}

bioTextAreaInp.onkeyup = () =>
  formValidation.characterCount(
    bioTextAreaInp.value,
    counter,
    maxValText,
    500,
    10
  );

updateProfileSection.addEventListener("submit", (e) => {
  e.preventDefault();
  endpoint = `/auction/profiles/${profile}`;
  completeUrl = baseUrl + endpoint;
  submitForm(updateProfileForm, completeUrl, putData, updateProfileForm, "");
  setTimeout(() => {
    location.reload();
  }, 1500);
});
