export function swapSides(element1, element2) {
  const afterelement2 = element2.nextElementSibling;
  const parent = element2.parentNode;
  element1.replaceWith(element2);
  parent.insertBefore(element1, afterelement2);
}
