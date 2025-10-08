export {};
function sumElements(numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}
const result = sumElements([1, 100, -201, 0, 101]);
console.log(result);

const numbersArray = [1, 123, 44, 0, -10];
const stringArray = ['test', '2', 'QA', 'random string'];

function sumTwoArrays(numbers: number[], strings: string[]): number {
    const parsedStrings = strings.map(Number).filter(Number.isFinite);
    return [...numbers, ...parsedStrings].reduce((acc, n) => acc + n, 0);
}
const finalResult = sumTwoArrays(numbersArray, stringArray);
console.log(finalResult);

function connectTwoArrays(strings: string[], numbers: number[]): (string | number)[] {
    return ([...strings, ...numbers]);
}
const finalArray = connectTwoArrays(stringArray, numbersArray);
console.log(finalArray);

const isString = (v: unknown): v is string => typeof v === 'string';
function filterArrays (strings: string[], numbers: number[]): string[] {
    return [...strings, ...numbers].filter(isString);
}
const filteredArray = filterArrays(stringArray, numbersArray);
console.log(filteredArray);
