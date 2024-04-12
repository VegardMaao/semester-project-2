import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const featuredSection = document.querySelector(".featured-section");
const allListingsDOM = document.querySelector(".all-listings");
const searchOptions = document.querySelector(".options");
const searchForm = document.querySelector(".search-field");
const searchInp = document.querySelector("#site-search");
const searchBy = document.querySelector("#search-keys");
const sortingInp = document.querySelector("#sort-by");
const showInactivePosts = document.querySelector("#show-inactive");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let completeUrl;

endpoint = "/auction/listings?_active=true&_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, featuredSection, getActions.featuredListing);

getData.getData(completeUrl, allListingsDOM, getActions.printFeed);

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

// // For sorting after highest price, decending high -> low

// let highestListing = listingsArray.sort((a, b) => {
//   if (a.bids.length === 0) return 1;
//   if (b.bids.length === 0) return -1;
//   return b.bids[b.bids.length - 1].amount - a.bids[a.bids.length - 1].amount;
// })[0];

// // For sorting after highest price, decending high -> low

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
