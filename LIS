const getLongestIncreasingSubsequence = (arr: number[]) => {

	// store longest LIS length that end at index i, initial 1
	const longests = new Array(arr.length).fill(1);

	// store the position of the previous item added to the list
	const prevPositions: number[] = [];

        // the index where the LIS ends
	let lastIdx = 0;

	let longestLisLength = 0;

	for (let i = 0; i < arr.length; ++i) {
                 // initially it is its position on the array
		prevPositions[i] = i;

		for (let j = 0; j < i; ++j) {
			if (arr[j] < arr[i] && longests[j] + 1 > longests[i]) {
				longests[i] = longests[j] + 1;
				prevPositions[i] = j;
			}
		}

		if (longests[i] > longestLisLength) {
			longestLisLength = longests[i];
			lastIdx = i;
		}
	}

	// LIS creation
	const lis = [arr[lastIdx]];

	for (let i = lastIdx; i !== prevPositions[i]; ) {
		i = prevPositions[i];
		lis.unshift(arr[i]);
	}

	console.log({ lis, longestLisLength });

	return { lis, longestLisLength };
};
