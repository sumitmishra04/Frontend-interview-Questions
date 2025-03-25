// This is a Web Worker for heavy computations
self.onmessage = (e) => {
    const { numbers } = e.data;

    // Simulate heavy computation (finding prime numbers)
    const isPrime = (num) => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return num > 1;
    };

    const primes = numbers.filter(isPrime);

    // Send result back to main thread
    self.postMessage({ primes });
};