export function changeForm(container) {
  const containerClass = container.classList;

  if (containerClass.contains("visible")) {
    container.style.cssText = "position: relative; top: -100vh;";
    container.classList.remove("visible");
  } else {
    container.style.cssText = "position: relative; top: 0;";
    container.classList.add("visible");
  }
}
