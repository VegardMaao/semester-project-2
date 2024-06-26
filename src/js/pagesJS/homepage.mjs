import * as getActions from "../api-functions/get/getActions/feed.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const featuredSection = document.querySelector(".featured-section");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, featuredSection, getActions.featuredListing);
