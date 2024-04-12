const myUserName = localStorage.getItem("userName");

/**
 *
 * @param {Array} listingsArray
 * @param {object} domElement
 *
 * This function takes the array of posts, and a DOM comment, then produces
 * HTML based on the array in  our given HTML-comment.
 *
 * Posts without title or content are skipped because I think they look ugly and don't
 * provide anything to the page.
 */
export function printFeed(domElement, listingsArray) {
  domElement.innerHTML = "";
  for (let i = 0; i < listingsArray.length; i++) {
    const {
      title,
      description,
      media,
      id,
      _count,
      endsAt,
      tags,
      bids,
      seller,
    } = listingsArray[i];
    const highestBid = bids[bids.length - 1];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");
    const shorterDescription = description.substring(0, 50);

    if (!highestBid) {
      domElement.innerHTML += `
      <div class="single-listing">
      <a href="/pages/single-listing.html?id=${id}"><img
      src="${media}"
    /></a>

    <div>
    <a href="/pages/single-listing.html?id=${id}">
      <h3 class="item-title">${title}</h3>
      </a>
      <a href="/pages/profile.html?seller=${seller.name}"><p>By ${seller.name}</p></a>
      <p class="item-description">${shorterDescription}</p>
      <p class="bids-amount">${_count.bids} bids</p>
      <p>Bidding ends the ${endDate} at ${endTime}</p>
      </div>

      <a class="goto-bid" href="/pages/single-listing.html?id=${id}"><p>Make a bid</p></a>
      <div>
      <p>tags: ${tags}</p>
    </div>
    </div>
            `;
    } else {
      domElement.innerHTML += `
      <div class="single-listing">
      <a href="/pages/single-listing.html?id=${id}"><img
      src="${media}"
    /></a>

    <div>
    <a href="/pages/single-listing.html?id=${id}">
      <h3 class="item-title">${title}</h3>
      </a>
      <a href="/pages/profile.html?seller=${seller.name}"><p>By ${seller.name}</p></a>
      <p class="item-description">${shorterDescription}</p>
      <p class="bids-amount">${_count.bids} bids</p>
      <p>Bidding ends the ${endDate} at ${endTime}</p>
      </div>

      <a class="goto-bid" href="/pages/single-listing.html?id=${id}"><p>Make a bid</p></a>
      <div>
      <p>tags: ${tags}</p>
    </div>
    </div>
            `;
    }
  }
}

/**
 * Sorts an array before creating HTML
 * @param {array} listingsArray - array of posts from the API
 * @param {object} domElement - where in the DOM the new array is printed
 * @param {string} sortBy - how to sort the array
 * This function sorts my array before printing out the feed in a new order.
 */
export function sortArray(domElement, listingsArray, sortBy) {
  switch (sortBy) {
    case "most-bids":
      const arrayByMostBids = listingsArray.sort(function (x, y) {
        return y._count.bids - x._count.bids;
      });
      printFeed(domElement, arrayByMostBids);
      break;

    case "least-bids":
      const arrayByLeastBids = listingsArray
        .sort(function (x, y) {
          return y._count.bids - x._count.bids;
        })
        .slice()
        .reverse();
      printFeed(domElement, arrayByLeastBids);
      break;

    default:
      break;
  }
}

/**
 *
 * @param {array} listingsArray - an array containing all posts
 * @param {object} domElement - the object where I print my HTML, only there to be passed down to printFeed();
 * @param {object} searchQuery - an object containing both what I am searching in (title, body or both) and what string I want the post to includce
 *
 * This function lets me search my array by title, body or both.
 */
export function searchArray(domElement, listingsArray, searchQuery) {
  let filteredArray;
  const searchWord = searchQuery.searchText.toLowerCase();
  const searchIn = searchQuery.searchKeys;

  if (!searchWord) {
    domElement.innerHTML = "";
    printFeed(domElement, listingsArray);
  }

  if (!searchIn) {
    filteredArray = listingsArray.filter((listing) => {
      const { title, description, tags } = listing;
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseBody = description.toLowerCase();
      const lowerCaseTags = tags.map((v) => v.toLowerCase()).toString();
      console.log(lowerCaseTags);
      if (title && description && tags) {
        return (
          lowerCaseTitle.includes(`${searchWord}`) ||
          lowerCaseBody.includes(`${searchWord}`) ||
          lowerCaseTags.includes(`${searchWord}`)
        );
      } else if (!description) {
        return lowerCaseTitle.includes(`${searchWord}`);
      }
    });
  } else {
    filteredArray = listingsArray.filter((listing) => {
      const { title, description } = listing;
      if (searchIn === "title") {
        return lowerCaseTitle.includes(`${searchWord}`);
      } else if (searchIn === "description" && description) {
        return lowerCaseBody.includes(`${searchWord}`);
      } else if (searchIn === "tags" && tags) {
        lowerCaseTags.includes(`${searchWord}`);
      }
    });
  }
  console.log(filteredArray);
  domElement.innerHTML = "";
  printFeed(domElement, filteredArray);
}

/**
 * @param {object} domElement - where to print HTML
 * @param {array} listingData - what HTML to print
 *
 * This function prints HTML to the single post DOM element
 */
export function singlePostContent(domElement, listingData) {
  const { title, description, media, created, endsAt, seller, _count, bids } =
    listingData;
  const creationDate = created.replaceAll("-", ".");
  const formattedDate = creationDate
    .slice(0, creationDate.length - 14)
    .split(".")
    .reverse()
    .join(".");

  const highestBid = bids[bids.length - 1];
  const endsDate = endsAt.replaceAll("-", ".");
  const slicedEndsDateAndTime = endsDate
    .slice(0, endsDate.length - 4)
    .split("T");
  const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
  const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");

  if (bids >= 0) {
    domElement.innerHTML = `
    <div class="listing">
    <img src="${media}" alt="${description}">
        <h1>${title}</h1>
        <p class="description">${description}</p>
        <p class="description bid-amount">Be the first to place a bid!</p>
        <p class="description">Bidding ends the ${endDate} at ${endTime}</p>
        
        <p>Posted the ${formattedDate} by <a href="/pages/profile.html?${seller.name}">${seller.name}</a></p>
    </div>
    `;
  } else {
    domElement.innerHTML = `
    <div class="listing">
    <img src="${media}" alt="${description}">
        <h1>${title}</h1>
        <p class="description">${description}</p>
        <p class="description bid-amount">Currently going at <span class="highest-bid">${highestBid.amount}</span></p>
        <p class="description">Bidding ends the ${endDate} at ${endTime}</p>
        <p>Posted the ${formattedDate} by <a href="/pages/profile.html?${seller.name}">${seller.name}</a></p>
    </div>
    `;
  }

  if (seller.name === myUserName) {
    domElement.innerHTML += `
        <div >
            <button class="delete" id="${id}">delete post</button><button class="edit">edit post</button>
        </div>`;
  }
}
