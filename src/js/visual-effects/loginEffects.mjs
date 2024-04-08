export function changeForm(container) {
  const containerClass = container.classList;
  if (containerClass.contains("visible")) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    containerClass.remove("visible");
  } else {
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    containerClass.add("visible");
  }
}
