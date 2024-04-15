import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const userInfoSection = document.querySelector(".user-info");
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const profile = parameter.get("profile");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

endpoint = `/auction/profiles/${profile}`;
completeUrl = baseUrl + endpoint;
getData.getData(completeUrl, userInfoSection, getActions.makeUserProfile);
