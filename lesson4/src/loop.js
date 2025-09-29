console.log('----- 0 ... 9 for -----');
for (let i = 0; i < 10; i++) {
    console.log(i);
}

console.log('----- 0 ... 9 while -----');
let a = 0;
while (a < 10) {
    console.log(a);
    a++;
}

console.log('----- 0 ... 9 do while -----');
let b = 0;
do {
    console.log(b);
    b++;
} while (b < 10);

console.log('----- 100 ... 0 for -----');
for (let i = 100; i >= 0; i -= 10) {
    console.log(i);
}

console.log('----- 100 ... 0 while -----');
let c = 100;
while (c >= 0) {
    console.log(c);
    c -= 10;
}

console.log('----- 100 ... 0 do while -----');
let d = 100;
do {
    console.log(d);
    d -= 10;
} while (d >= 0);
