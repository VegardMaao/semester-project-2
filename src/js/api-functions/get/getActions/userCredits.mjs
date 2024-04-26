export function getUserCredits(domElement, userInfo) {
  const { credits } = userInfo;
  domElement.innerHTML = `${credits} credits`;
}
