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
  if (url === "https://v2.api.noroff.dev/auction/listings") {
    const mediaURLs = formData.getAll("media.url");
    const mediaAlts = formData.getAll("media.alt");
    const media = mediaURLs.map((url, i) => ({ url, alt: mediaAlts.at(i) }));
    const tags = formData.getAll("tags");
    formData.forEach((value, key) => (formdataOBj[key] = value));
    delete formdataOBj["media.url"];
    delete formdataOBj["media.alt"];
    delete formdataOBj["tags"];
    if (media[0].url.length) {
      formdataOBj.media = [media[0]];
    } else {
      delete formdataOBj.media;
    }
    const strTags = new String(tags);
    formdataOBj.tags = strTags.split(",");
  } else {
    formData.forEach((value, key) => (formdataOBj[key] = value));
  }
  action(url, formdataOBj, divForError, currentPage);
}
