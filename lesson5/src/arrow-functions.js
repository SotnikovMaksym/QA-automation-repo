const sumElements = (arr) => arr.reduce((acc, n) => acc + n, 0);
const result = sumElements([1, 100, -201, 0, 101]);
console.log(result);

const numbersArray = [1, 123, 44, 0, -10];
const stringArray = ['test', '2', 'QA', 'random string'];

const sumTwoArrays = (stringArray, numbersArray) => ([...stringArray, ...numbersArray].reduce((acc, n) => acc + n, 0));
const finalResult = sumTwoArrays(stringArray, numbersArray);
console.log(finalResult);

const connectTwoArrays = (stringArray, numbersArray) => [...stringArray, ...numbersArray];
const finalArray = connectTwoArrays(stringArray, numbersArray);
console.log(finalArray);

const filterArrays = (stringArray, numbersArray) => [...stringArray, ...numbersArray].filter((value) => typeof value === 'string');
const filteredArray = filterArrays(stringArray, numbersArray);
console.log(filteredArray);
