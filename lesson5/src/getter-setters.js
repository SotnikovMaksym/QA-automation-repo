const person = {
    _name: 'John',
    _age: 29,
    _position: 'QA',
    _cars: [
        {
            _model: 'BMW'
        },
        {
            _model: 'Tesla'
        }
    ],
    get name() {
        return this._name.toLocaleUpperCase();
    },
    set name(value) {
        this._name = value.toLocaleLowerCase();
    },
    get position() {
        return this._position.toLocaleLowerCase();
    },
    set position(value) {
        this._position = value.toLocaleUpperCase();
    },
    getAllPersonInfo () {
        return (`Person: ${this.name} Age: ${this._age} Position: ${this.position} has: ${this._cars.map(c => c._model).join(',')}`);
    }
};
console.log(person._name, person.name, person.position, person._position);
console.log(person.getAllPersonInfo());

person.name = 'alice';
person._age = 45;
person.position = 'WEB DEV';
console.log(person.getAllPersonInfo());
