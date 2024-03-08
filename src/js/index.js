import { createNavigation } from "./components/header.mjs";
import { navItems } from "./objects/navItems.mjs";

const navContainer = document.querySelector(".nav_ul");
createNavigation(navContainer, navItems);
