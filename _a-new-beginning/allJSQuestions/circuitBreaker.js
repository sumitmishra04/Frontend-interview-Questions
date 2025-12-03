function circuitBreaker(fn, retryCount, halt) {
    let lastFailureAt = 0;       // timestamp of last failure (ms) or 0 if none
    let failedAttempts = 0;      // consecutive failures
    let halted = false;

    return function (...args) {
        // if currently halted, check if halt period elapsed
        if (halted) {
            const now = Date.now();
            const resumeAt = lastFailureAt + halt;
            if (now >= resumeAt) {
                // resume
                failedAttempts = 0;
                halted = false;
            } else {
                const remaining = resumeAt - now;
                console.log('Halted — retry after', remaining + 'ms');
                return;
            }
        }

        try {
            const result = fn(...args);
            // success: reset counters
            failedAttempts = 0;
            lastFailureAt = 0;
            return result;
        } catch (e) {
            // record failure
            lastFailureAt = Date.now();
            failedAttempts++;
            console.log('Function failed — attempt', failedAttempts);
            if (failedAttempts >= retryCount) {
                halted = true;
                console.log('Circuit opened — halting for', halt + 'ms');
            }
            // optionally rethrow or swallow; here we swallow
        }
    };
}



const testFunction = () => {
    let count = 0;
    return function (id) {
        count++;
        if (count < 4) {
            console.log('error from backend', id);
            throw 'error'
        } else {
            console.log('data received', id);
        }
    };
};

const tf = testFunction();
const cb = circuitBreaker(tf, 3, 2000);
cb(1);
cb(2);
cb(3);
cb(4);
cb(5);
setTimeout(() => {
    cb(6);
}, 3000);
