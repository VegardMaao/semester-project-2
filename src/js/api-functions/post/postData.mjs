import { errorMsg } from "./errorMsg.mjs";

const token = localStorage.getItem("accessToken");
let error;

/**
 *
 * @param {string} url - an url where we
 * @param {object} formData - Data from submitForm.mjs
 * @param {object} headerData - data for the header of the request
 * @param {object} divForError - OPTIONAL - a div where our error message will be output
 * @param {function} action - OPTIONAL - addidional action to take after the request has been sent
 * @param {*} actionParam - OPTIONAL - argument for the action function. Data type depends on the function
 * @returns a finished response from our API Post request.
 *
 * This function takes an API URL and sends data from an object using a fetch (POST) request
 */
export async function postData(
  url,
  formData,
  headerData,
  divForError,
  action,
  actionParam
) {
  if (divForError) {
    divForError.innerHTML = "";
  }
  const dataForPostRequest = {
    method: "POST",
    headers: headerData,
    body: JSON.stringify(formData),
  };
  try {
    const fetchResponse = await fetch(url, dataForPostRequest);
    const finishedResponse = await fetchResponse.json();
    if (finishedResponse.statusCode > 399) {
      error = finishedResponse.errors[0].message;
      throw error;
    }
    if (finishedResponse.accessToken) {
      localStorage.setItem(`accessToken`, `${finishedResponse.accessToken}`);
      localStorage.setItem("userName", `${finishedResponse.name}`);
    }
    if (action) {
      action(actionParam);
    }
    return finishedResponse;
  } catch (error) {
    errorMsg(divForError, error);
  }
}
