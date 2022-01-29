export default async function requestPUT({ url, data }) {
  try {
    const response = await fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new TypeError("Failed PUT request");
    }
    return response.json();
  } catch (e) {
    throw new TypeError("Failed PUT request");
  }
}
