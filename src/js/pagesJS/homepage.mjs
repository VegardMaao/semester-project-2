import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const featuredSection = document.querySelector(".featured-section");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let completeUrl;

endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, featuredSection, getActions.featuredListing);
