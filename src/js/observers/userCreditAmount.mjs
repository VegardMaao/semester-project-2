import { getUserCredits } from "../api-functions/get/getActions.mjs";
import { getData } from "../api-functions/get/getData.mjs";

const myUserName = localStorage.getItem("userName");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

export const userCreditAmount = new MutationObserver(function (mutations, obs) {
  obs.disconnect();
  mutations.forEach(function () {
    const creditSpan = document.querySelector(".users-credits");
    endpoint = `/auction/profiles/${myUserName}?_listings=true&_wins=true`;
    completeUrl = baseUrl + endpoint;
    getData(completeUrl, creditSpan, getUserCredits);
  });
});
