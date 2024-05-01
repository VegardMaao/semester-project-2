import * as feed from "../api-functions/get/getActions/feed.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const featuredSection = document.querySelector(".featured-section");
const allListingsDOM = document.querySelector(".all-listings");
const searchOptions = document.querySelector(".options");
const searchForm = document.querySelector(".search-field");
const searchInp = document.querySelector("#site-search");
const searchBy = document.querySelector("#search-keys");
const sortingInp = document.querySelector("#sort-by");
const showInactivePosts = document.querySelector("#show-inactive");
const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, featuredSection, feed.featuredListing);

getData.getData(completeUrl, allListingsDOM, feed.printFeed);

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
  getData.getData(completeUrl, allListingsDOM, feed.printFeed);
  sortingInp.value = "default";
});

sortingInp.addEventListener("change", (e) => {
  allListingsDOM.innerHTML = "";
  switch (sortingInp.value) {
    case "default":
      completeUrl = `${baseUrl}${endpoint}`;
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    case "newest-bids":
      completeUrl = `${baseUrl}${endpoint}&sort=created&sortOrder=desc`;
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    case "oldest-bids":
      completeUrl = `${baseUrl}${endpoint}&sort=created&sortOrder=asc`;
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    case "highest-price":
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    case "most-bids":
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    case "least-bids":
      getData.getData(
        completeUrl,
        allListingsDOM,
        feed.sortArray,
        sortingInp.value
      );
      break;
    default:
      break;
  }
});

searchForm.addEventListener("change", (e) => {
  const willBeSearchParams = new FormData(searchForm);
  const searchParams = {};
  willBeSearchParams.forEach((value, key) => (searchParams[key] = value));
  getData.getData(completeUrl, allListingsDOM, feed.searchArray, searchParams);
});

searchInp.onkeyup = () => {
  const willBeSearchParams = new FormData(searchForm);
  const searchParams = {};
  willBeSearchParams.forEach((value, key) => (searchParams[key] = value));
  getData.getData(completeUrl, allListingsDOM, feed.searchArray, searchParams);
};
