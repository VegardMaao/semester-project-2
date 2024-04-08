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

export function makeLogoBanner(container) {
  const token = localStorage.getItem("userName");
  if (!token) {
    container.innerHTML = `<a class="header_logo" href="../index.html">
    <img
      src="../src/image-resources/Auction-house-logo.PNG"
      alt="Auction House Logo"
      class="header_logo"
  /></a>

  <a href="../pages/login.html" class="login-btn"><i class="far fa-user"></i></a>

  <label for="hamburger_menu" class="menubox"
    ><i class="fas fa-bars" id="menu_icon"></i
  ></label>
  <input type="checkbox" name="hamburger_menu" id="hamburger_menu" />`;
  } else {
    container.innerHTML = `<a class="header_logo" href="../index.html">
          <img
            src="../src/image-resources/Auction-house-logo.PNG"
            alt="Auction House Logo"
            class="header_logo"
        /></a>

        <span></span>
        <label for="hamburger_menu" class="menubox"
          ><i class="fas fa-bars" id="menu_icon"></i
        ></label>
        <input type="checkbox" name="hamburger_menu" id="hamburger_menu" />`;
  }
}
