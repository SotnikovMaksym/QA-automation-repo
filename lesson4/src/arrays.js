console.log('----- Create string array -----');
const onlyString = ['Max', 'Hello', 'Age', 'Name', 'Surname', 'Max', 'Max'];
console.log(onlyString);
console.log(onlyString[0], onlyString[1], onlyString[2], onlyString[3], onlyString[4]);
onlyString[0] = 'John';
console.log(onlyString);

console.log('----- Filter array -----');
const filteredArr = onlyString.filter((el) => el === 'Name');
console.log(filteredArr);

console.log('----- Find element in array -----');
const findElement = onlyString.find((el) => typeof el === 'string');
console.log(findElement);

console.log('----- Operations with array -----');
onlyString.push('new value');
console.log(onlyString);
console.log(onlyString[5]);

onlyString.pop();
console.log(onlyString);

onlyString.shift();
console.log(onlyString);

onlyString.unshift('first');
console.log(onlyString);

console.log('----- ForEach -----');
onlyString.forEach ((value) => {
    console.log(value);
});

onlyString.forEach ((value, index) => {
    console.log(index);
});

onlyString.forEach ((value, index) => {
    console.log(value, index);
});

console.log('----- Map -----');
const onlyString2 = onlyString.map((value) => {
    if (value == 'Max') {
        return 'Max is here';
    }
    return 'not Max';
});
console.log(onlyString2);

console.log('----- Create number array -----');
const onlyNumber = [1, 10, 2, 1000, -2, 4, 0];
console.log(onlyNumber);

console.log('----- Operations with array -----');
const sortedArr = onlyNumber.sort((a, b) => b - a);
console.log(sortedArr);

const sortedArr2 = onlyNumber.sort((a, b) => a - b);
console.log(sortedArr2);

const includedArr = onlyNumber.includes(2);
console.log(includedArr);

console.log('----- ForEach -----');
let sum = 0;
onlyNumber.forEach(value => {
    sum += value;
});
console.log(sum);

console.log('----- Map -----');
const onlyNumber2 = onlyNumber.map(value => value * 2);
console.log(onlyNumber);
console.log(onlyNumber2);

console.log('----- Reduce -----');
const sum1 = onlyNumber.reduce((acc, n) => acc + n, 0);
console.log(sum1);

console.log('----- Create boolean array -----');
const onlyBooleanArr = [true, false, false, true];
onlyBooleanArr.push(false);
onlyBooleanArr.push(false);
console.log(onlyBooleanArr);

const onlyBooleanArr2 = onlyBooleanArr.filter((el) => el == true);
console.log(onlyBooleanArr2);

console.log('----- ForEach -----');
let countFalse = 0;
onlyBooleanArr.forEach((value) => {
    if (!value) countFalse++;
});
console.log(countFalse);

console.log('----- Mix array ForEach/Map/Slice -----');
const mixArr = [true, false, 1, 'Hello', 0, 'Bye'];
const a = [];
mixArr.forEach((value) => {
    if (typeof value === 'number') {
        a.push(value);
    }
});
console.log(a);

const b = mixArr.map((value, index) => {
    if (index <= 5) {
        return value;
    }
});
console.log(b);

const firstTwo = mixArr.slice(0, 2);
console.log(firstTwo);

const lastTwo = mixArr.slice(-2);
console.log(lastTwo);
