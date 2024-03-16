/**
 * @description Creates a series of li elements with links to other pages. Used for both navigation in header and footer
 * @param {object} container - DOM element
 * @param {array} array - an array containing; links, target and a title
 *
 * @example
 * // Define what DOM-element the li elements should be produced within, then makes said li elements
 * const navContainer = document.querySelector(".nav_ul");
 * createNavigation(navContainer, navItems);
 * // Produces the following:
 * <li><a href="index.html#about" target="_self">About me</a></li>
 * <li><a href="index.html#portfolio" target="_self">Portfolio</a></li>
 * <li><a href="index.html#contact" target="_self">Contact</a></li>
 */
export function createNavigation(container, array) {
  for (let i = 0; i < array.length; i++) {
    container.innerHTML += `<li><a href="${array[i].link}" target="${array[i].target}">${array[i].title}</a></li>`;
  }
}

/**
 *
 * @param {object} container
 *
 * Accepts a container and sets the css top value based on wheter
 * or not it has a class called "visible"
 */
export function showOrHideNavigation(container, menuIcon) {
  const containerClass = container.classList;
  if (containerClass.length) {
    container.style.cssText = "top: -500px;";
    container.classList.remove("visible");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  } else {
    container.style.cssText = "top: -50px;";
    container.classList.add("visible");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  }
}

// export function changeMenuIcon(domElement) {
//   console.dir(domElement);
//   domElement.classList
// }
