import React, { useEffect, useState } from "react";

const cities = [
  { name: "New York", temperatures: [20, 22, 24, 18, 21] },
  { name: "Los Angeles", temperatures: [25, 27, 28, 26, 29] },
  { name: "Chicago", temperatures: [15, 14, 13, 12, 16] },
];

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (window.Worker) {
      const worker = new Worker("/weatherWorker.js");

      worker.postMessage(cities); // Send data to Web Worker

      worker.onmessage = (event) => {
        setWeatherData(event.data); // Receive processed data
      };

      return () => worker.terminate(); // Clean up worker when component unmounts
    } else {
      console.error("Web Workers not supported in this browser.");
    }
  }, []);

  console.log("weatherData", weatherData);
  return (
    <div>
      <h1>Weather App</h1>
      <ul>
        {weatherData.map((city) => (
          <li key={city.name}>
            {city.name}: {city.avgTemp.toFixed(1)}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
