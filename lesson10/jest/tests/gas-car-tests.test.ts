import * as chai from 'chai';
const chaiExpect = chai.expect;
import { GasCar } from '../src/gas-car';

describe('GasCar', () => {
    let car: GasCar;
    const brand = 'G-Brand';
    const model = 'G-Model';
    const maxSpeed = 180;
    const color = 'blue';
    const tankCapacity = 50;
    const initialFuel = 20;

    beforeEach(() => {
        car = new GasCar(brand, model, maxSpeed, color, tankCapacity, initialFuel);
    });

    it('constructor sets basic properties and initial energy level', () => {
        expect(car.brand).toBe(brand);
        chaiExpect(car.brand).to.equal(brand);

        expect(car.model).toBe(model);
        chaiExpect(car.model).to.equal(model);

        expect(car.maxSpeed).toBe(maxSpeed);
        chaiExpect(car.maxSpeed).to.equal(maxSpeed);

        expect(car.color).toBe(color);
        chaiExpect(car.color).to.equal(color);

        const expectedPercent = Math.round((initialFuel / tankCapacity) * 100);
        expect(car.getEnergyLevel()).toBe(expectedPercent);
        chaiExpect(car.getEnergyLevel()).to.equal(expectedPercent);
    });

    it('move sets currentSpeed clamped to range', () => {
        car.move(60);
        expect(car.getCurrentSpeed()).toBe(60);
        chaiExpect(car.getCurrentSpeed()).to.equal(60);

        car.move(999);
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

    it('refill increases fuel level and updates capacity (clamped by tank capacity)', () => {
        car.refill(10);
        const fuelAfterRefill = Math.min(initialFuel + 10, tankCapacity);
        const expectedAfterRefill = Math.round((fuelAfterRefill / tankCapacity) * 100);

        expect(car.getEnergyLevel()).toBe(expectedAfterRefill);
        chaiExpect(car.getEnergyLevel()).to.equal(expectedAfterRefill);

        car.refill(1000);
        expect(car.getEnergyLevel()).toBe(100);
        chaiExpect(car.getEnergyLevel()).to.equal(100);

        car.refill(-1000);
        expect(car.getEnergyLevel()).toBe(0);
        chaiExpect(car.getEnergyLevel()).to.equal(0);
    });

    it('getEnergyLevel returns current capacity percent after small refill', () => {
        expect(car.getEnergyLevel()).toBe(Math.round((initialFuel / tankCapacity) * 100));
        chaiExpect(car.getEnergyLevel()).to.equal(Math.round((initialFuel / tankCapacity) * 100));

        car.refill(5);
        const expectedLevel = Math.round((Math.min(initialFuel + 5, tankCapacity) / tankCapacity) * 100);
        expect(car.getEnergyLevel()).toBe(expectedLevel);
        chaiExpect(car.getEnergyLevel()).to.equal(expectedLevel);
    });
});
