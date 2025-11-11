async function rateLimitRequests(tasks, batchSize, delayMs) {
    for (let i = 0; i < tasks.length; i += batchSize) {
        const batch = tasks.slice(i, i + batchSize);
        await Promise.all(batch.map(task => task())); // Run batch in parallel
        if (i + batchSize < tasks.length) {
            await new Promise(res => setTimeout(res, delayMs)); // Wait before next batch
        }
    }
}

const apiCall = (id) => () =>
    new Promise(res => setTimeout(() => res(`API Call ${id} done`), 500));

rateLimitRequests(
    [apiCall(1), apiCall(2), apiCall(3), apiCall(4), apiCall(5), apiCall(6)],
    2, 1000
).then(console.log);