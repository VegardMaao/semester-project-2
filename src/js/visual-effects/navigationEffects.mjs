/**
 *
 * @param {object} container
 * @param {object} menuIcon
 *
 * Accepts a container and sets the css top value based on wheter
 * or not it has a class called "visible" + changes menu  icon to cross
 * or bars depending on state
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
