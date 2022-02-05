export default async function requestDELETE({ url }) {
  try {
    const response = await fetch(url, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new TypeError("Failed DELETE request");
    }
    return response.json();
  } catch (e) {
    throw new TypeError("Failed DELETE request");
  }
}
