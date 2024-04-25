const apiKey = {
  data: {
    name: "My API Key",
    status: "ACTIVE",
    key: "c57f1e08-71bf-4bea-8292-d1bc6abb1f29",
  },
  meta: {},
};

const token = localStorage.getItem("accessToken");

export async function deleteListing(url) {
  const token = localStorage.getItem("accessToken");
  const dataForPostRequest = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey.data.key,
    },
  };
  try {
    const fetchResponse = await fetch(url, dataForPostRequest);
    const finishedResponse = await fetchResponse.json();
    return finishedResponse;
  } catch (error) {
    console.log(error);
  }
}
