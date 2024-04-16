import { errorMsg } from "../../formActions/errorMsg.mjs";
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
    if (finishedResponse.data.statusCode > 399) {
      error = finishedResponse.errors[0].message;
      throw error;
    }
    if (finishedResponse.data.accessToken) {
      localStorage.setItem(
        `accessToken`,
        `${finishedResponse.data.accessToken}`
      );
      localStorage.setItem("userName", `${finishedResponse.data.name}`);
    }
    // if (action) {
    //   action(actionParam);
    // }
    return finishedResponse;
  } catch (error) {
    errorMsg(divForError, error);
  }
}

export async function createAPIKey() {
  const token = localStorage.getItem("accessToken");
  const createKeyURL = "https://v2.api.noroff.dev/auth/create-api-key";
  const dataForPostRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: "My API Key",
    }),
  };
  console.log(dataForPostRequest);
  const fetchResponse = await fetch(createKeyURL, dataForPostRequest);
  const finishedResponse = await fetchResponse.json();
  console.log(finishedResponse);
  // Not sure what to do with the API Key, saving it to localstorage seems unsafe
  // And if it's in a gitIgnored .env file, I don't see the app working on Netlify (for example)
  // Besides, the function to get my API Key is public facing, so I don't know what the solution would be
  // I'll finish for now and get back to  it later
}
