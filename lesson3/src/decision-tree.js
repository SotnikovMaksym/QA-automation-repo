let a = 100;
let b = 200;
let c = true;
let d = false;
const e = 'Hello';
const f = '33';
const j = {a1: 100};

if (a > b) {
    console.log('a is bigger than b');
} else if (b > a || j != f) {
    console.log('b is bigger than a');
} else {
    console.log('b is equal a');
};
//one line record
console.log(a > b ? 'a is bigger than b' : (b > a || j != f) ? 'b is bigger than a' : 'b is equal a');

a = 90;
b = 55;
if (a > b && e != f) {
    console.log('a is bigger than b');
} else if (b > a) {
    console.log('b is bigger than a');
} else {
    console.log('b is equal a');
};
//one line record
console.log(a > b ? 'a is bigger than b' : (b > a) ? 'b is bigger than a' : 'b is equal a');

a = 1;
b = 1;
if (a > b) {
    console.log('a is bigger than b');
} else if (b > a) {
    console.log('b is bigger than a');
} else {
    console.log('b is equal a');
};

if (c >= d) {
    console.log('true');
} else if (c <= d) {
    console.log('false');
} else {
    console.log('Wrong result');
};

c = false;
d = true;
if (c >= d) {
    console.log('true');
} else if (c <= d) {
    console.log('false');
} else {
    console.log('Wrong result');
};

c = 1;
d = 'true';
if (c >= d) {
    console.log('true');
} else if (c <= d) {
    console.log('false');
} else {
    console.log('Wrong result');
};

if (typeof c == 'number' && typeof d == 'string') {
    console.log('Everything is right');
} else if (c <= d) {
    console.log('false');
} else {
    console.log('Wrong result');
};
