const currentDate = new Date().toJSON();
let today = new Date(currentDate);

/**
 *
 * @param {Array} postsArray
 * @param {object} domElement
 *
 * This function takes the array of posts, and a DOM comment, then produces
 * HTML based on the array in  our given HTML-comment.
 *
 * Posts without title or content are skipped because I think they look ugly and don't
 * provide anything to the page.
 */
export function printFeed(domElement, postsArray) {
  domElement.innerHTML = "";
  const myUserName = localStorage.getItem("userName");
  for (let i = 0; i < postsArray.length; i++) {
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
    } = postsArray[i];
    const highestBid = bids[bids.length - 1];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");

    if (!highestBid) {
      domElement.innerHTML += `
      <div class="single-listing">
      <a href="/pages/single-listing.html?${id}"><img
      src="${media}"
    /></a>
    <a href="/pages/single-listing.html?${id}">
      <h3 class="item-title">${title}</h3>
      </a>
      <a href="/pages/profile.html?seller=${seller.name}"><p>By ${seller.name}</p></a>
      <p class="item-description">${description}</p>
      <p class="bids-amount">${_count.bids} bids</p>
      <p>Bidding ends the ${endDate} at ${endTime}</p>
      <a class="goto-bid" href="/pages/single-listing.html?${id}"><p>Make a bid</p></a>
      <div>
      <p>tags: ${tags}</p>
    </div>
    </div>
            `;
    } else {
      domElement.innerHTML += `
    <div class="single-listing">
    <a href="/pages/single-listing.html?${id}"><img
    src="${media}"
  /></a>
  <a href="/pages/single-listing.html?${id}">
    <h3 class="item-title">${title}</h3>
    </a>
    <a href="/pages/profile.html?seller=${seller.name}"><p>By ${seller.name}</p></a>
    <p class="item-description">${description}</p>
    <p class="bids-amount">${_count.bids} bids, last bid at ${highestBid.amount}</p>
    <p>Bidding ends the ${endDate} at ${endTime}</p>
    <a class="goto-bid" href="/pages/single-listing.html?${id}"><p>Make a bid</p></a>
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
 * @param {array} postsArray - array of posts from the API
 * @param {object} domElement - where in the DOM the new array is printed
 * @param {string} sortBy - how to sort the array
 * This function sorts my array before printing out the feed in a new order.
 */
export function sortArray(domElement, postsArray, sortBy) {
  switch (sortBy) {
    case "most-bids":
      const arrayByMostBids = postsArray.sort(function (x, y) {
        return y._count.bids - x._count.bids;
      });
      printFeed(domElement, arrayByMostBids);
      break;

    case "least-bids":
      const arrayByLeastBids = postsArray
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
