class CacheWithTTL {
  constructor(cleanupInterval = 5000) {
    this.cache = new Map();

    // Run cleanup periodically
    this.cleanupInterval = setInterval(() => this.cleanup(), cleanupInterval);
  }

  set(key, value, ttlSeconds) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const data = this.cache.get(key);
    if (!data) return undefined;

    if (data.expiresAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    return data.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  size() {
    const now = Date.now();
    let count = 0;

    for (const [key, data] of this.cache.entries()) {
      if (data.expiresAt > now) count++;
      else this.cache.delete(key);
    }

    return count;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.cache.entries()) {
      if (data.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }

  // Optional: stop interval when destroying cache
  stopCleanup() {
    clearInterval(this.cleanupInterval);
  }
}
