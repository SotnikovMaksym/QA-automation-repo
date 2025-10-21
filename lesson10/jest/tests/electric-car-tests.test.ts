import * as chai from 'chai';
const chaiExpect = chai.expect;
import { ElectricCar } from '../src/electric-car';

describe('ElectricCar', () => {
    let car: ElectricCar;
    const maxSpeed = 120;
    const batteryCapacityKwh = 85;

    beforeEach(() => {
        car = new ElectricCar('E-Brand', 'E-Model', maxSpeed, 'red', batteryCapacityKwh);
    });

    it('constructor sets basic properties', () => {
        expect(car.brand).toBe('E-Brand');
        chaiExpect(car.brand).to.equal('E-Brand');

        expect(car.model).toBe('E-Model');
        chaiExpect(car.model).to.equal('E-Model');

        expect(car.maxSpeed).toBe(maxSpeed);
        chaiExpect(car.maxSpeed).to.equal(maxSpeed);

        expect(car.color).toBe('red');
        chaiExpect(car.color).to.equal('red');

        expect(car.getCurrentSpeed()).toBe(0);
        chaiExpect(car.getCurrentSpeed()).to.equal(0);
    });

    it('move sets currentSpeed clamped to range', () => {
        car.move(60);
        expect(car.getCurrentSpeed()).toBe(60);
        chaiExpect(car.getCurrentSpeed()).to.equal(60);

        car.move(200);
        expect(car.getCurrentSpeed()).toBe(maxSpeed);
        chaiExpect(car.getCurrentSpeed()).to.equal(maxSpeed);

        car.move(-10);
        expect(car.getCurrentSpeed()).toBe(0);
        chaiExpect(car.getCurrentSpeed()).to.equal(0);
    });

    it('stop sets speed to 0', () => {
        car.move(50);
        expect(car.getCurrentSpeed()).toBe(50);
        chaiExpect(car.getCurrentSpeed()).to.equal(50);

        car.stop();
        expect(car.getCurrentSpeed()).toBe(0);
        chaiExpect(car.getCurrentSpeed()).to.equal(0);
    });

    it('chargeBattery increases capacity up to 100 and respects clamp', () => {
        expect(car.getEnergyLevel()).toBe(80);
        chaiExpect(car.getEnergyLevel()).to.equal(80);

        car.chargeBattery();
        expect(car.getEnergyLevel()).toBe(90);
        chaiExpect(car.getEnergyLevel()).to.equal(90);

        car.chargeBattery();
        expect(car.getEnergyLevel()).toBe(100);
        chaiExpect(car.getEnergyLevel()).to.equal(100);

        car.chargeBattery();
        expect(car.getEnergyLevel()).toBe(100);
        chaiExpect(car.getEnergyLevel()).to.equal(100);
    });

    it('estimateRange computes expected distance with default and custom consumption', () => {
        const capacity = car.getEnergyLevel();
        const availableKwh = (capacity / 100) * batteryCapacityKwh;
        const expectedDefault = Math.round((availableKwh / 18) * 100);
        expect(car.estimateRange()).toBe(expectedDefault);
        chaiExpect(car.estimateRange()).to.equal(expectedDefault);

        const customConsumption = 20;
        const expectedCustom = Math.round((availableKwh / customConsumption) * 100);
        expect(car.estimateRange(customConsumption)).toBe(expectedCustom);
        chaiExpect(car.estimateRange(customConsumption)).to.equal(expectedCustom);
    });
});
