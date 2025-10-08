const sumElements = (numbers: number[]): number => numbers.reduce((acc, n) => acc + n, 0);
const result = sumElements([1, 100, -201, 0, 101]);
console.log(result);

const numbersArray = [1, 123, 44, 0, -10];
const stringArray = ['test', '2', 'QA', 'random string'];

const sumTwoArrays = (strings: string[], numbers: number[]): number =>
    [...numbers, ...strings.map(Number).filter((n): n is number => Number.isFinite(n))]
        .reduce((acc, n) => acc + n, 0);
const finalResult = sumTwoArrays(stringArray, numbersArray);
console.log(finalResult);

const connectTwoArrays = (strings: string[], numbers: number[]): (string | number)[] => [...strings, ...numbers];
const finalArray = connectTwoArrays(stringArray, numbersArray);
console.log(finalArray);

const filterArrays = (strings: string[], numbers: number[]): string[] => [...strings, ...numbers].filter((value): value is string => typeof value === 'string');
const filteredArray = filterArrays(stringArray, numbersArray);
console.log(filteredArray);
