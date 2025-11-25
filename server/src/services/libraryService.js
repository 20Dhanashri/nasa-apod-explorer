const axios = require("axios");
const LRUCache = require("../utils/lruCache");

const LIBRARY_URL = "https://images-api.nasa.gov/search";
const CACHE_MAX_SIZE = Number(process.env.CACHE_MAX_SIZE || 200);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 3600000);

const cache = new LRUCache(CACHE_MAX_SIZE, CACHE_TTL_MS);

function makeKey(params) {
  return JSON.stringify(params);
}

async function fetchFromLibrary(params = {}) {
  const key = makeKey(params);
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await axios.get(LIBRARY_URL, { params });
  cache.set(key, res.data);
  return res.data;
}

function formatItem(item) {
  const data = item.data && item.data[0] ? item.data[0] : {};
  const links = item.links && item.links[0] ? item.links[0] : {};
  const date = data.date_created ? data.date_created.slice(0, 10) : null;

  return {
    source: "nasa-library",
    nasa_id: data.nasa_id,
    date,
    title: data.title || "Untitled NASA Image",
    explanation: data.description || "No description available.",
    media_type: "image",
    url: links.href,
    hdurl: null,
    copyright: data.photographer || data.center || "NASA",
  };
}

module.exports = {
  async searchImages(query, page = 1) {
    if (!query) return [];
    const data = await fetchFromLibrary({
      q: query,
      media_type: "image",
      page,
    });

    const items = (data.collection && data.collection.items) || [];
    return items.map(formatItem).filter((x) => !!x.url);
  },
};
