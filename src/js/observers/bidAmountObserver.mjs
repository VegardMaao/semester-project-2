/**
 * Observes changes to a DOM element, in this case the "bid now" prompt.
 * This is done in order to set the minimum amount a user can bid
 */
export const listingObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const bidInput = document.querySelector("#bidamount");
    const bidAmountString = document.querySelector(".bid-amount").innerHTML;
    if (bidAmountString === "Be the first to place a bid!") {
      bidInput.min = 1;
      bidInput.placeholder = "1 or  higher";
    } else {
      const minBid = document.querySelector(".highest-bid").innerHTML;
      bidInput.min = parseInt(minBid) + 1;
      bidInput.placeholder = `${parseInt(minBid) + 1} or higher`;
    }
  });
});
