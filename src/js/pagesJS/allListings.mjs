import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let completeUrl;

const allListingsDOM = document.querySelector(".all-listings");

endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, allListingsDOM, getActions.printFeed);

const searchOptions = document.querySelector(".options");
const searchForm = document.querySelector(".search-field");
const searchInp = document.querySelector("#site-search");
const searchBy = document.querySelector("#search-keys");
const sortingInp = document.querySelector("#sort-by");
const showInactivePosts = document.querySelector("#show-inactive");

searchOptions.onsubmit = (e) => {
  e.preventDefault();
};

showInactivePosts.addEventListener("change", (e) => {
  searchInp.value = "";
  sortingInp.value = "default";

  if (showInactivePosts.checked === true) {
    endpoint = "/auction/listings?_active=false&_seller=true&_bids=true";
    completeUrl = baseUrl + endpoint;
  } else {
    endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
    completeUrl = baseUrl + endpoint;
  }
  getData.getData(completeUrl, allListingsDOM, getActions.printFeed);
  sortingInp.value = "default";
});

sortingInp.addEventListener("change", (e) => {
  allListingsDOM.innerHTML = "";

  switch (sortingInp.value) {
    case "default":
      completeUrl = `${baseUrl}${endpoint}`;
      getData.getData(completeUrl, allListingsDOM, getActions.printFeed);
      break;
    case "newest-bids":
      completeUrl = `${baseUrl}${endpoint}&sort=created&sortOrder=desc`;
      getData.getData(completeUrl, allListingsDOM, getActions.printFeed);
      break;
    case "oldest-bids":
      completeUrl = `${baseUrl}${endpoint}&sort=created&sortOrder=asc`;
      getData.getData(completeUrl, allListingsDOM, getActions.printFeed);
      break;
    case "most-bids":
      getData.getData(
        completeUrl,
        allListingsDOM,
        getActions.sortArray,
        sortingInp.value
      );
      break;
    case "least-bids":
      getData.getData(
        completeUrl,
        allListingsDOM,
        getActions.sortArray,
        sortingInp.value
      );
      break;
    default:
      break;
  }
});

searchInp.onkeyup = () => {
  const willBeSearchParams = new FormData(searchForm);
  const searchParams = {};
  willBeSearchParams.forEach((value, key) => (searchParams[key] = value));
  getData.getData(
    completeUrl,
    allListingsDOM,
    getActions.searchArray,
    searchParams
  );
};
