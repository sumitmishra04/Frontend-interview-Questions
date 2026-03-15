function createWeightedPicker(w) {
    const prefixSum = [];
    let totalSum = 0;

    for (let weight of w) {
        totalSum += weight;
        prefixSum.push(totalSum);
    }

    return function pickIndex() {
        const target = Math.random() * totalSum;

        let left = 0;
        let right = prefixSum.length - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (target >= prefixSum[mid]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    };
}

/*
Time Complexity:

Constructor → O(n)

pickIndex → O(log n)

Space Complexity:

O(n)
*/