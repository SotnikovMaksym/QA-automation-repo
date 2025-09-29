const obj = {};

obj.name = 'Max';
obj.surname = 'Sotnikov';
obj.position = 'QA';
obj.children = [
    {
        name: 'John',
        gender: null,
        age: 15
    },
    {
        name: 'Clara',
        gender: null,
        age: 3
    }
];
console.log(obj);
console.log(JSON.stringify(obj));

const singleLevelCopy = {...obj};
singleLevelCopy.name = 'changed value';
console.log('----- Single Level -----');
console.log(singleLevelCopy, obj);
singleLevelCopy.children[0].name = 'changed children name';
console.log('----- Single Level with deep change -----');
console.log(singleLevelCopy, obj);

const deepCopy = structuredClone(obj);
deepCopy.name = 'Maksym';
deepCopy.children[0].gender = 'M';
deepCopy.children[1].gender = 'F';
console.log('----- Deep Copy -----');
console.log(deepCopy, obj);

console.log('----- Methods -----');
const objKeys = Object.keys(obj);
const objValues = Object.values(obj);
const objEntries = Object.entries(obj);
const objEntries2 = Object.entries(obj.children[0]);
const objEntries3 = Object.entries(obj.children[1]);
console.log(objKeys, objValues, objEntries, objEntries2, objEntries3);

console.log('----- Object and Methods -----');
const objWithMethod = structuredClone(obj);

objWithMethod.objWithMethod = function () {
    console.log(this);
};
objWithMethod.objWithMethod();

objWithMethod.getName = function () {
    console.log(this.name);
};
objWithMethod.getName();

objWithMethod.getChildrenCounts = function () {
    console.log('Counter: ' + this.children.length);
};
objWithMethod.getChildrenCounts();

objWithMethod.getSecondChildName = function () {
    console.log(this.children[1].name);
};
objWithMethod.getSecondChildName();

