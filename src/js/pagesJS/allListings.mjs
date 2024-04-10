import * as getActions from "../api-functions/get/getActions.mjs";
import * as getData from "../api-functions/get/getData.mjs";

const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint;
let completeUrl;

const allListingsDOM = document.querySelector(".all-listings");

endpoint = "/auction/listings?_seller=true&_bids=true";
completeUrl = baseUrl + endpoint;

getData.getData(completeUrl, allListingsDOM, getActions.printFeed);

const searchOptions = document.querySelector(".options");
const searchInp = document.querySelector("#site-search");
const searchBy = document.querySelector("#search-keys");
const sortingInp = document.querySelector("#sort-by");

searchOptions.onsubmit = (e) => {
  e.preventDefault();
};

sortingInp.addEventListener("change", (e) => {
  console.log(sortingInp.value);
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
