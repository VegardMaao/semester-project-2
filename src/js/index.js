import * as headerFunctions from "./components/navigation.mjs";
import * as navigationFunctions from "./visual-effects/navigationEffects.mjs";
import * as navigationObjects from "./objects/navItems.mjs";
import * as setFormMinDate from "./visual-effects/setFormMinDate.mjs";
import * as moving from "./visual-effects/moveNewListingForm.mjs";
import { logout } from "./api-functions/logout/logout.mjs";

const logoBanner = document.querySelector(".logo_banner");
headerFunctions.makeLogoBanner(logoBanner);

const navContainer = document.querySelector("nav");
const navUl = document.querySelector(".nav_ul");
const menuIcon = document.querySelector("#menu_icon");
headerFunctions.createNavigation(navUl, navigationObjects.navItems);
menuIcon.addEventListener("click", () => {
  navigationFunctions.showOrHideNavigation(navContainer, menuIcon);
});

const footerIconsContainer = document.querySelector(".footer-icons-ul");
const footerTextContainer = document.querySelector(".footer-text-ul");
headerFunctions.createNavigation(
  footerIconsContainer,
  navigationObjects.footerIcons,
);

headerFunctions.createNavigation(
  footerTextContainer,
  navigationObjects.footerText,
);

const formDate = document.querySelector("#ends-at");
setFormMinDate.setFormMinDate(formDate);

const logoutObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const navList = document.querySelector(".nav_ul");
    console.dir(navList);
    const logOutBtn = navList.lastChild;
    logOutBtn.addEventListener("click", () => {
      logout();
    });
  });
});

const config = { attributes: true, childList: true, subtree: true };
logoutObserver.observe(navContainer, config);

const newListingContainer = document.querySelector(".new-listing-container");
const plusIcon = document.querySelector(".plus-icon");
const newListingForm = document.querySelector(".add-new-listing-form");
const crossIcon = document.querySelector(".cross-icon");
const token = localStorage.getItem("accessToken");

if (!token) {
  newListingContainer.style.cssText = "display:none;";
}

plusIcon.addEventListener("click", () => {
  moving.swapSides(plusIcon, newListingForm);
});

crossIcon.addEventListener("click", () => {
  moving.swapSides(plusIcon, newListingForm);
});
