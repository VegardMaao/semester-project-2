import * as headerFunctions from "./components/navigation.mjs";

import * as navigationFunctions from "./visual-effects/navigationEffects.mjs";
import * as loginEffects from "./visual-effects/loginEffects.mjs";

import * as navigationObjects from "./objects/navItems.mjs";

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

const movingMain = document.querySelector(".moving-main");
// const logInSection = document.querySelector(".login-section");
const signUpSection = document.querySelector(".signup-secton");
const changeFormBtns = document.querySelectorAll(".show-signup-form-button");

changeFormBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    loginEffects.changeForm(movingMain, signUpSection);
  });
});
