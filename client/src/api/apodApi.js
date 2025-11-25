const BASE_URL = "http://localhost:4000/api/apod";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API request failed");
  return res.json();
}

export const fetchTodayApod = () => request(`${BASE_URL}/today`);

export const fetchApodByDate = (date) =>
  request(`${BASE_URL}/by-date?date=${date}`);

export const fetchRecentApods = (days = 8) =>
  request(`${BASE_URL}/recent?days=${days}`);
