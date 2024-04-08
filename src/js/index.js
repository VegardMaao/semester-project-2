import * as headerFunctions from "./components/navigation.mjs";
import * as navigationFunctions from "./visual-effects/navigationEffects.mjs";
import * as navigationObjects from "./objects/navItems.mjs";

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
