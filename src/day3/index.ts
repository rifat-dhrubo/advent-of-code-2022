import {readFileSync} from 'fs';

export const solutionDay3 = () => {
	const arrayData = readFileSync('src/day3/static-data.txt', {
		encoding: 'utf-8',
	})
		.toString()
		.split(/\n/);
	//a-z
	let stringValueMap: Record<string, number> = {};
	for (let index = 0; index < 26; index++) {
		const char = String.fromCharCode(97 + index);
		stringValueMap[char] = index + 1;
	}
	// A-Z
	for (let index = 0; index < 26; index++) {
		const char = String.fromCharCode(65 + index);
		stringValueMap[char] = index + 1 + 26;
	}

	function calculate(array: string[]) {
		let result = 0;
		array.forEach((line) => {
			const midPoint = Math.ceil((line.length - 1) / 2);
			const firstHalf = line.substring(0, midPoint);
			const secondHalf = line.substring(midPoint);

			const firstHalfArray = firstHalf.split('');
			const secondHalfArray = secondHalf.split('');
			const common = firstHalfArray.filter((value) => secondHalfArray.includes(value));

			result += stringValueMap[common[0]];
		});
		return result;
	}
	const firstResult = calculate(arrayData);

	let groupedData: string[][] = [];
	for (let index = 0; index < arrayData.length; index += 3) {
		groupedData.push([arrayData[index], arrayData[index + 1], arrayData[index + 2]]);
	}

	let secondResult = 0;
	groupedData.forEach((group) => {
		const [first, second, third] = group;
		const firstArray = first.split('');
		const secondArray = second.split('');
		const thirdArray = third.split('');

		let common = '';
		for (let index = 0; index < firstArray.length; index++) {
			const element = firstArray[index];
			if (secondArray.includes(element) && thirdArray.includes(element)) {
				common = element;
				break;
			}
		}

		secondResult += stringValueMap[common];
	});

	return {firstResult, secondResult};
};
