import * as headerFunctions from "./components/header.mjs";
import { navItems } from "./objects/navItems.mjs";

const navContainer = document.querySelector("nav");
const navUl = document.querySelector(".nav_ul");
const menuIcon = document.querySelector("#menu_icon");
headerFunctions.createNavigation(navUl, navItems);
menuIcon.addEventListener("click", () => {
  headerFunctions.showOrHideNavigation(navContainer);
});
