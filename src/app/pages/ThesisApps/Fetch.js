export default async function Fetch(uri = "", method = "GET", body = null) {
  const init = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const request = await fetch(`http://localhost:3001/api/v1${uri}`, init);
  const result = await request.json();

  return result;
}
