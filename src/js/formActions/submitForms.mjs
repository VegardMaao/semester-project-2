/**
 *
 * @param {object} form - The HTMLForm which we create our object from
 * @param {string} url - where to send the data. This is parsed into
 * @param {function} action - what function to run
 * @param {object} divForError - OPTIONAL - a div where our error message will be output
 * @param {string} currentPage - OPTIONAL - the current documents title
 * This function sends data from a form to a given URL as JSON.
 * Gathers form data and inserts it into an empty object using a forEach, saving keys and values.
 * Then runs it through the login function below.
 */
export function submitForm(form, url, action, divForError, currentPage) {
  const formData = new FormData(form);
  const formdataOBj = {};
  formData.forEach((value, key) => (formdataOBj[key] = value));
  action(url, formdataOBj, divForError, currentPage);
}
