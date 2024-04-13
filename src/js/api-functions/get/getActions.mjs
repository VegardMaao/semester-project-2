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
  let shorterDescription = "";
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
      created,
    } = listingsArray[i];
    const highestBid = bids[bids.length - 1];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");
    if (description) {
      shorterDescription = description.substring(0, 50);
    }

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
      <p class="item-description">${description}</p>
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
      <p>${created}</p>
    </div>
    </div>
            `;
    }
  }
}

/**
 *
 * @param {object} domElement - where to print out the featured listing
 * @param {array} listingsArray - array of all listings
 *
 * Here I first loop throuh my original array of active listings and  remove all results with 0 bids.
 * Then I create a new array of listings, with only the highest bid of each listing
 * Lastly, I sort the new array based on the highest amount and print out a featured object based  on  this
 */
export function featuredListing(domElement, listingsArray) {
  let arrayWithBidsAndID = [];
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
    if (bids >= 0) {
      continue;
    }
    arrayWithBidsAndID.push({
      bidAmount: parseInt(bids[bids.length - 1].amount),
      id: id,
      title: title,
      description: description,
      media: media,
      _count: _count,
      endsAt: endsAt,
      tags: tags,
      seller: seller,
    });
  }
  const arrayByHighestBid = arrayWithBidsAndID.sort(function (x, y) {
    return y.bidAmount - x.bidAmount;
  });
  const {
    title,
    description,
    media,
    id,
    _count,
    endsAt,
    tags,
    bidAmount,
    seller,
  } = arrayByHighestBid[0];
  const endsDate = endsAt.replaceAll("-", ".");
  const slicedEndsDateAndTime = endsDate
    .slice(0, endsDate.length - 4)
    .split("T");
  const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
  const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");

  domElement.innerHTML = `
    <div class="hero-image">
          <div class="hero_story">
          <a href="/pages/single-listing.html?id=${id}">
          <h1>${title}</h1>
      </a>
            <p>
              This is the featured listing right now!
            </p>
            <p>
              ${description}
            </p>
            <p>Currently going at ${bidAmount}. Bidding ends the ${endDate} at ${endTime}</p>
            <a href="/pages/single-listing.html?id=${id}" class="cta-btn">Place a bid!</a>
          </div>
        </div>
        `;

  domElement.style.backgroundImage = `url(${media})`;
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
    case "default":
      printFeed(domElement, listingsArray);
      break;
    case "newest-bids":
      printFeed(domElement, listingsArray);
    case "oldest-bids":
      printFeed(domElement, listingsArray);
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
      const { title = "", description = "", tags = [] } = listing;
      console.log(title, description, tags);
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseBody = description.toLowerCase();
      const lowerCaseTags = tags.map((v) => v.toLowerCase()).toString();
      return (
        lowerCaseTitle.includes(searchWord) ||
        lowerCaseBody.includes(searchWord) ||
        lowerCaseTags.includes(searchWord)
      );
    });
  } else {
    filteredArray = listingsArray.filter((listing) => {
      const { title, description, tags } = listing;
      let searchObject = {
        title: title.toLowerCase(),
        description: description.toLowerCase(),
        tags: tags.map((v) => v.toLowerCase()).toString(),
      };
      return searchObject[searchIn].includes(searchWord);
    });
  }
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
