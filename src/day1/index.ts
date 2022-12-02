import {readFileSync} from 'fs';

export const main = async () => {
	const array = readFileSync('src/day1/static-data.txt', {encoding: 'utf-8'})
		.toString()
		.split(/\n\n/gi);

	const numbers = array.map((stringValue) => stringValue.split(/\n/g));

	const values = numbers.map((numberArray) => {
		let sum = 0;
		numberArray.forEach((string) => {
			sum = sum + Number(string);
		});

		return sum;
	});

	const sortedValue = values.sort((a, b) => b - a);
	return {top: sortedValue[0], topThree: sortedValue[0] + sortedValue[1] + sortedValue[2]};
};
