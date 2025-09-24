const a = 2;
let b = 11;
let c = 100;
const d = 1.5;
const e = (a + b + c) / d;
const f = true;
const j = false;
let g;
const k = null;
const greeting = 'Hello, ';
const myName = 'Max';
const surname = '123';
const funString = '1';
const age = 30;
const testQA = {
    name: 'Max',
    age: 30,
    position: 'Lead'
};
const testObject = {a1: 'abc'};

console.log('-----Number and number-----');
console.log(a + b);
console.log(a + b - c);

c = 10;
console.log(c * a);
console.log(a / c);
console.log((a + b - c) * d);
console.log(e);
b += b;
console.log(b);
b -= b;
console.log(b);
b = 10;
b *= b;
console.log(b);
b ** b;
console.log(b);
b /= b;
console.log(b);
const p = b++;
console.log(p);
const m = b--;
console.log(m);

console.log('-----Boolean and number-----');
console.log(j + f);
console.log(a + f + j);

console.log('-----Undefined and null-----');
console.log(g);
console.log(g + k);

console.log('-----Undefined/null and number-----');
console.log(a + k);
console.log(a - k);
console.log(a * k);
console.log(g + a);

console.log('-----String and number-----');
console.log(greeting + myName + ' is ' + age + ' y.o.');
console.log(a + myName);
console.log(a + surname);
console.log(a - myName);
console.log(a - surname);
console.log(funString + - surname);
console.log(funString - + surname);

console.log('-----String and boolean-----');
console.log(greeting + f);
console.log(greeting - f);
console.log(greeting - j);
console.log(surname * j);
console.log(surname * f);

console.log('-----Operations with object-----');
console.log(testQA);
console.log(testQA.name);
console.log(testQA.age);
console.log(testQA.position);
console.log(testQA + testObject);
console.log(testQA.name + a);
console.log(testQA.name - a);
console.log(testQA - a);
console.log(testQA + f);
console.log(testQA - f);
console.log(testQA + greeting);
console.log(testQA - greeting);
console.log(testQA + testObject);
