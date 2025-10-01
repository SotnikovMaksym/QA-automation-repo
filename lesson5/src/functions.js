function sumElements (arr) {
    return arr.reduce((acc, n) => acc + n, 0);
}
const result = sumElements([1, 100, -201, 0, 101]);
console.log(result);

const numbersArray = [1, 123, 44, 0, -10];
const stringArray = ['test', '2', 'QA', 'random string'];
function sumTwoArrays (stringArray, numbersArray) {
    return ([...stringArray, ...numbersArray].reduce((acc, n) => acc + n, 0));
}
const finalResult = sumTwoArrays(stringArray, numbersArray);
console.log(finalResult);

function connectTwoArrays (stringArray, numbersArray) {
    return ([...stringArray, ...numbersArray]);
}
const finalArray = connectTwoArrays(stringArray, numbersArray);
console.log(finalArray);

function filterArrays (stringArray, numbersArray) {
    return [...stringArray, ...numbersArray].filter (value => typeof value === 'string');
}
const filteredArray = filterArrays(stringArray, numbersArray);
console.log(filteredArray);
