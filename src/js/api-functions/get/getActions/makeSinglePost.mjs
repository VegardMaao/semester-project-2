const myUserName = localStorage.getItem("userName");

/**
 * @param {object} domElement - where to print HTML
 * @param {array} listingData - what HTML to print
 *
 * This function prints HTML to the single post DOM element
 */
export function singlePostContent(domElement, listingData) {
  const makeBidDom = document.querySelector(".make-a-bid");
  if (!listingData) {
    domElement.innerHTML = `<h1>Page does not exist<h1>`;
    makeBidDom.style.cssText = "display:none;";
  }

  const {
    id,
    title,
    description = "default",
    media = [
      {
        url: "https://cannons.com/wp-content/uploads/2013/09/Talk-Like-a-Pirate-Day-at-Cannons-Marina-925x1024.jpg",
        alt: "",
      },
    ],
    created,
    endsAt,
    seller,
    _count,
    bids,
  } = listingData;

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

  if (!media.length) {
    media.push(" ");
  }

  if (!myUserName) {
    domElement.innerHTML = `
    <div class="listing">
      <img src="${media[0].url || ""}" alt="${media[0].alt || ""}">
          <h1>${title}</h1>
          <p class="description">${description || ""}</p>
          <p class="description bid-amount"><a href="../pages/login.html"> Sign up or log in to place a bid! </a>!</p>
          <p class="description">Bidding ends the ${endDate} at ${endTime}</p>
  
          <p>Posted the ${formattedDate} by <a href="/pages/profile.html?profile=${seller.name}">${seller.name}</a></p>
      </div>
    `;
  } else if (bids >= 0) {
    domElement.innerHTML = `
      <div class="listing">
      <img src="${media[0].url || ""}" alt="${media[0].alt || ""}">
          <h1>${title}</h1>
          <p class="description">${description || ""}</p>
          <p class="description bid-amount">Be the first to place a bid!</p>
          <p class="description">Bidding ends the ${endDate} at ${endTime}</p>
  
          <p>Posted the ${formattedDate} by <a href="/pages/profile.html?profile=${seller.name}">${seller.name}</a></p>
      </div>
      `;
  } else {
    domElement.innerHTML = `
      <div class="listing">
      <img src="${media[0].url || ""}" alt="${media[0].alt || ""}">
          <h1>${title}</h1>
          <p class="description">${description || ""}</p>
          <p class="description bid-amount">Currently going at <span class="highest-bid">${highestBid.amount}</span></p>
          <p class="description">Bidding ends the ${endDate} at ${endTime}</p>
          <p>Posted the ${formattedDate} by <a href="/pages/profile.html?profile=${seller.name}">${seller.name}</a></p>
      </div>
      `;

    if (bids[bids.length - 1].bidder.name === myUserName) {
      domElement.insertAdjacentHTML(
        "afterend",
        `<div><p class="important-note">You have the highest bid!</p></div>`
      );
    }
  }

  if (seller.name === myUserName) {
    domElement.innerHTML += `
          <div class="listing">
              <button class="delete" id="${id}">delete listing</button><button class="edit">edit listing</button>
          </div>`;

    makeBidDom.style.cssText = "display:none;";
  }
}
