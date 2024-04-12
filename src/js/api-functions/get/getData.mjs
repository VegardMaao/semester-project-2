const token = localStorage.getItem("token");

/**
 *
 * @param {string} url - url for the fetch request
 * @param {object} domElement - where to print the retured data
 * @param {function} action - what function to pass the data into
 * @param {string} actionParam - optional - how to treat the data, if passed into search or sort functions
 * @returns
 */
export async function getData(url, domElement, action, actionParam) {
  const dataForPostRequest = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const fetchResponse = await fetch(url, dataForPostRequest);
    const finishedResponse = await fetchResponse.json();
    action(domElement, finishedResponse, actionParam);
    return finishedResponse;
  } catch (error) {
    console.log(error);
  }
}
