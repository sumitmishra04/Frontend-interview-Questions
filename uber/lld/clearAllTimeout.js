(function () {
    const timeouts = new Set();
    const intervals = new Set();

    // Override setTimeout
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function (callback, delay, ...args) {
        const id = originalSetTimeout(callback, delay, ...args);
        timeouts.add(id);
        return id;
    };

    // Override clearTimeout
    const originalClearTimeout = window.clearTimeout;
    window.clearTimeout = function (id) {
        timeouts.delete(id);
        originalClearTimeout(id);
    };

    // Override setInterval
    const originalSetInterval = window.setInterval;
    window.setInterval = function (callback, delay, ...args) {
        const id = originalSetInterval(callback, delay, ...args);
        intervals.add(id);
        return id;
    };

    // Override clearInterval
    const originalClearInterval = window.clearInterval;
    window.clearInterval = function (id) {
        intervals.delete(id);
        originalClearInterval(id);
    };

    // Implement clearAllTimeout
    window.clearAllTimeout = function () {
        for (const id of timeouts) {
            originalClearTimeout(id);
        }
        timeouts.clear();
        
        for (const id of intervals) {
            originalClearInterval(id);
        }
        intervals.clear();
    };
})();

setTimeout(() => console.log("Timeout 1"), 1000);
setTimeout(() => console.log("Timeout 2"), 2000);
setInterval(() => console.log("Interval 1"), 500);

setTimeout(() => {
    console.log("Clearing all timeouts and intervals...");
    clearAllTimeout();
}, 1500);