import React, { useState, useEffect } from 'react';
import { Calculator, Wifi, WifiOff } from 'lucide-react';

function Workers() {
  const [numbers, setNumbers] = useState([]);
  const [primes, setPrimes] = useState([]);
  const [calculating, setCalculating] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [worker] = useState(() => new Worker(
    new URL('../workers/calculation.worker.js', import.meta.url),
    { type: 'module' }
  ));

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Web Worker message handler
  useEffect(() => {
    worker.onmessage = (e) => {
      setPrimes(e.data.primes);
      setCalculating(false);
    };

    return () => {
      worker.terminate();
    };
  }, [worker]);

  const generateNumbers = () => {
    const newNumbers = Array.from(
      { length: 100000 },
      (_, i) => i + 1
    );
    setNumbers(newNumbers);
    setCalculating(true);
    worker.postMessage({ numbers: newNumbers });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold mb-4">Web Workers & Service Workers Demo</h1>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <><Wifi className="text-green-500" /> <span>Online</span></>
            ) : (
              <><WifiOff className="text-red-500" /> <span>Offline</span></>
            )}
          </div>
        </div>

        {/* Web Worker Demo */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="text-blue-500" />
            <h2 className="text-xl font-semibold">Web Worker Demo - Prime Numbers</h2>
          </div>

          <p className="mb-4 text-gray-600">
            This demo uses a Web Worker to calculate prime numbers up to 100,000 without blocking the main thread.
          </p>

          <button
            onClick={generateNumbers}
            disabled={calculating}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {calculating ? 'Calculating...' : 'Calculate Prime Numbers'}
          </button>

          {primes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Found {primes.length} prime numbers</h3>
              <div className="bg-gray-50 p-4 rounded max-h-40 overflow-auto">
                <p className="text-sm text-gray-600">
                  {primes.slice(0, 100).join(', ')}
                  {primes.length > 100 && '...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Service Worker Demo */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Service Worker Demo - Image Caching</h2>

          <p className="mb-4 text-gray-600">
            The service worker caches images from Unsplash. Try going offline and refreshing - the image will still load!
          </p>

          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1742590794643-5b401ed198b4?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Demo"
              width="500px"
              height="500px"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workers;