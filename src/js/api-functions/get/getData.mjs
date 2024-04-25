const token = localStorage.getItem("accessToken");
const apiKey = {
  data: {
    name: "My API Key",
    status: "ACTIVE",
    key: "c57f1e08-71bf-4bea-8292-d1bc6abb1f29",
  },
  meta: {},
};

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
      "X-Noroff-API-Key": apiKey.data.key,
    },
  };

  try {
    const fetchResponse = await fetch(url, dataForPostRequest);
    const finishedResponse = await fetchResponse.json();
    action(domElement, finishedResponse.data, actionParam);
    return finishedResponse;
  } catch (error) {
    console.log(error);
  }
}
