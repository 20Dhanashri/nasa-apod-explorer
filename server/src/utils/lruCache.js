class LRUCache {
  constructor(maxSize = 100, ttlMs = 1000 * 60 * 60) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.map = new Map();
  }

  _isExpired(entry) {
    return Date.now() - entry.timestamp > this.ttlMs;
  }

  get(key) {
    if (!this.map.has(key)) return null;

    const entry = this.map.get(key);

    // Check expiration
    if (this._isExpired(entry)) {
      this.map.delete(key);
      return null;
    }

    // Refresh LRU order
    this.map.delete(key);
    this.map.set(key, entry);

    return entry.value;
  }

  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      // Delete LRU (first key)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }

    this.map.set(key, { value, timestamp: Date.now() });
  }
}

module.exports = LRUCache;
