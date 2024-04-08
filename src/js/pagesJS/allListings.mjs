import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let completeUrl;

const allListingsDOM = document.querySelector(".all-listings");

endpoint = "/auction/listings";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, allListingsDOM, getActions.printFeed);
