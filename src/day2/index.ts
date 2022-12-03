import {readFileSync} from 'fs';
export const secondDay = () => {
	const arrayData = readFileSync('src/day2/static-data.txt', {
		encoding: 'utf-8',
	})
		.toString()
		.split(/\n/);

	// A, X rock
	// B, Y paper
	// C, Z scissor

	const resultMatrix: Record<string, number> = {
		'A X': 3,
		'A Y': 6,
		'A Z': 0,

		'B X': 0,
		'B Y': 3,
		'B Z': 6,

		'C X': 6,
		'C Y': 0,
		'C Z': 3,
	};

	const valueMatrix: Record<string, number> = {
		X: 1,
		Y: 2,
		Z: 3,
	};
	const valueWinMatrix: Record<string, number> = {
		X: 0,
		Y: 3,
		Z: 6,
	};

	let firstResult = 0;

	arrayData.forEach((pair) => {
		let localResult = resultMatrix[pair];
		localResult += valueMatrix[pair.charAt(2)];
		firstResult = firstResult + localResult;
	});

	let secondResult = 0;
	arrayData.forEach((pair) => {
		let localResult = valueWinMatrix[pair.charAt(2)];

		let potentialResults = [];
		for (const property in resultMatrix) {
			if (resultMatrix[property] === localResult) {
				potentialResults.push(property);
			}
		}

		const tuple = potentialResults.filter((value) => value.charAt(0) === pair.charAt(0));

		secondResult += localResult + valueMatrix[tuple[0].charAt(2)];
	});

	return {
		firstResult,
		secondResult,
	};
};
