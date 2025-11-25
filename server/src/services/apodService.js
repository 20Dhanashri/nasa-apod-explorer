const axios = require("axios");
const LRUCache = require("../utils/lruCache");

const API_URL = "https://api.nasa.gov/planetary/apod";

const API_KEY = process.env.NASA_API_KEY;
const CACHE_MAX_SIZE = Number(process.env.CACHE_MAX_SIZE || 200);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 3600000);

const cache = new LRUCache(CACHE_MAX_SIZE, CACHE_TTL_MS);

// Generate a unique key for caching
function makeKey(params) {
  return JSON.stringify(params);
}

async function fetchFromNasa(params = {}) {
  const key = makeKey(params);
  const cached = cache.get(key);

  if (cached) return cached;

  const response = await axios.get(API_URL, {
    params: {
      api_key: API_KEY,
      ...params,
    },
  });

  cache.set(key, response.data);
  return response.data;
}

function format(apod) {
  return {
    date: apod.date,
    title: apod.title,
    explanation: apod.explanation,
    media_type: apod.media_type,
    url: apod.url,
    hdurl: apod.hdurl || null,
    copyright: apod.copyright || "N/A",
  };
}

module.exports = {
  async getToday() {
    const data = await fetchFromNasa();
    return format(data);
  },

  async getByDate(date) {
    const data = await fetchFromNasa({ date });
    return format(data);
  },

  async getRange(start_date, end_date) {
    const data = await fetchFromNasa({ start_date, end_date });
    return data.map(format);
  },

  async getRecent(days = 8) {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - days);

    const to = today.toISOString().slice(0, 10);
    const from = past.toISOString().slice(0, 10);

    return this.getRange(from, to);
  },
};
