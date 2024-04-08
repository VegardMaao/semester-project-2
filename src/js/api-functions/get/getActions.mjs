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
    const { title, description, media, id, _count, endsAt, tags } =
      postsArray[i];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1];
    domElement.innerHTML += `
      <div class="single-listing">
      <img
        src="${media}"
      />
      <h3>${title}</h3>
      <p>${description}</p>
      <p>BIDS ${_count.bids}</p>
      <p>Bidding ends the ${endDate} at ${endTime}</p>
      <div>
        <p>tags: ${tags}</p>
      </div>
    </div>
            `;
  }
}
