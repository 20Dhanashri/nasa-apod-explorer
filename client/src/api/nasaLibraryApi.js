const BASE_URL = "http://localhost:4000/api/library";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("NASA Library request failed");
  return res.json();
}

export function searchNasaLibrary(query, page = 1) {
  const q = encodeURIComponent(query);
  return request(`${BASE_URL}/search?query=${q}&page=${page}`);
}
