let a = 20;
const b = 'Hello';
let b1 = '19.9';
const c = true;
const c1 = false;
const d = null;
let e;
const f = {a1: 7};
console.log(typeof a, typeof b, typeof c, typeof d, typeof e, typeof f);

console.log('-----String and Number-----');
console.log(a > b);
console.log(a < b);
console.log(a > b1);
console.log(a < b1);

b1 = '20.1';
console.log(a < b1);
console.log(a == b1);

b1 = '20';
console.log(a >= b1);
console.log(a <= b1);
console.log(b1 == a);
console.log(a != b1);

console.log('-----String and Boolean-----');
console.log(c > c1);
console.log(c <= c1);
console.log(c > c);
console.log(b < c);
console.log(c1 != c);

b1 = '1';
console.log(c1 >= b1);
console.log(c <= b1);
console.log(c < b1);

b1 = 0;
console.log(c > b1);

console.log('-----Object and others-----');
console.log(f >= c);
console.log(f >= c1);
console.log(f <= c);
console.log(f <= c1);
console.log(f > a);
console.log(f != b);

console.log('----- Logical -----');
console.log(a > b1 && c > c1);

b1 = 1;
console.log(c == b1 || c1 > c);
console.log(b1 >= a && a > b1);
console.log(f == e || b1 > b);
console.log(b1 != 0 && a == 20);
console.log(!b1 != 0 && !a == 20);
console.log(!!a == false);
console.log(!!a == c);

b1 = 0;
console.log(!!b1 == c1);

a = 19.9;
b1 = '19.9';
console.log(a == b1);
console.log(a === b1);
