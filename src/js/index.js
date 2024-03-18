import * as headerFunctions from "./components/navigation.mjs";

import * as navigationFunctions from "./visual-effects/navigationEffects.mjs";
import * as loginEffects from "./visual-effects/loginEffects.mjs";
import * as formValidation from "./visual-effects/formValidation.mjs";

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

const fieldset1 = document.querySelector(".first-form").elements;
const btn1 = document.querySelector("#sign-in-btn");
const fieldset2 = document.querySelector(".second-form").elements;
const btn2 = document.querySelector("#sign-up-btn");

for (let i = 0; i < fieldset1.length; i++) {
  const input = fieldset1[i];
  input.onkeyup = () => formValidation.formCheck(fieldset1, btn1);
}

for (let i = 0; i < fieldset2.length; i++) {
  const input = fieldset2[i];
  input.onkeyup = () => formValidation.formCheck(fieldset2, btn2);
}

const movingMain = document.querySelector(".moving-main");
const signUpSection = document.querySelector(".signup-secton");
const changeFormBtns = document.querySelectorAll(".show-signup-form-button");

changeFormBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    loginEffects.changeForm(movingMain, signUpSection);
  });
});
