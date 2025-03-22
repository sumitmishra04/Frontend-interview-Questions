self.onmessage = function (event) {
    const { data } = event;

    // Simulating heavy data processing
    const processedData = data.map(city => ({
        name: city.name,
        avgTemp: city.temperatures.reduce((a, b) => a + b, 0) / city.temperatures.length,
    }));

    self.postMessage(processedData);
};
