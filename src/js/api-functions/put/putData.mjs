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
 * @param {string} url - Where to send the put request
 * @param {*} formData - what to send
 * @returns {object} - an edit to the existing post
 * Lets you edit data on the server
 */
export async function putData(url, formData) {
  let error;

  const headerData = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey.data.key,
  };
  const dataForPut = {
    method: "PUT",
    headers: headerData,
    body: JSON.stringify(formData),
  };
  try {
    const fetchResponse = await fetch(url, dataForPut);
    const finishedResponse = await fetchResponse.json();
    if (finishedResponse.statusCode > 399) {
      error = finishedResponse.errors[0].message;
      throw error;
    }
    return finishedResponse;
  } catch (error) {
    console.log(error);
  }
}
