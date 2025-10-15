interface IHuman {
    name: string;
    height: number;
    weight: number;
    age: number;
    dateOfBirth: string;
    gender: string;
    coefficient: number;

    getSummaryInfo(): string;
    getProportions(): number;
}

abstract class Human implements IHuman {
    public name: string;
    public height: number;
    public weight: number;
    public age: number;
    public dateOfBirth: string;
    public gender: string;
    public coefficient: number;

    public constructor(
        name: string,
        height: number,
        weight: number,
        age: number,
        dateOfBirth: string,
        gender: string,
        coefficient: number
    ) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.coefficient = coefficient;
    }

    public getIdealWeight(): number {
        return +(this.height * this.coefficient).toFixed(1);
    }

    public getProportions(): number {
        const ideal = this.getIdealWeight();
        return +(this.weight - ideal).toFixed(1);
    }

    public getSummaryInfo(): string {
        const ideal = this.getIdealWeight();
        const diff = this.getProportions();
        const sign = diff > 0 ? '+' : '';
        return `${this.name} (${this.gender}), ${this.height} cm, ${this.weight} kg. Ideal: ${ideal} kg. difference: ${sign}${diff} kg.`;
    }
}

class Men extends Human {
    public constructor(
        name: string,
        height: number,
        weight: number,
        age: number,
        dateOfBirth: string,
        coefficient = 0.47
    ) {
        super(name, height, weight, age, dateOfBirth, 'male', coefficient);
    }
}

class Women extends Human {
    public constructor(
        name: string,
        height: number,
        weight: number,
        age: number,
        dateOfBirth: string,
        coefficient = 0.43
    ) {
        super(name, height, weight, age, dateOfBirth, 'female', coefficient);
    }
}

const max = new Men('Max', 180, 82, 28, '1997-03-01');
const carla = new Women('Carla', 165, 60, 26, '1999-11-20');

console.log(max.getSummaryInfo());
console.log(carla.getSummaryInfo());
