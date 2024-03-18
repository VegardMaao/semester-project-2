export function changeForm(container, signUpForm) {
  const containerClass = container.classList;

  if (containerClass.contains("visible")) {
    container.style.cssText = "position: relative; top: -100vh;";
    signUpForm.style.cssText = "display: flex";
    container.classList.remove("visible");
  } else {
    container.style.cssText = "position: relative; top: 0;";
    container.classList.add("visible");
    setTimeout(() => {
      signUpForm.style.cssText = "display: none";
    }, 500);
  }
}
