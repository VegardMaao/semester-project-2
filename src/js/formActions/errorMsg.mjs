/**
 *
 * @param {object} domElement
 * @param {string} error
 *
 * prints error message into a domElement
 */
export function errorMsg(domElement, error) {
  domElement.innerHTML = `<p>${error}</p>`;
}
