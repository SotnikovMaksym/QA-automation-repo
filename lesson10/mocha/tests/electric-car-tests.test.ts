import { expect } from 'chai';
import { ElectricCar } from '../src/electric-car';

describe('ElectricCar', () => {
    let car: ElectricCar;
    const maxSpeed = 120;
    const batteryCapacityKwh = 85;

    beforeEach(() => {
        car = new ElectricCar('E-Brand', 'E-Model', maxSpeed, 'red', batteryCapacityKwh);
    });

    it('move sets currentSpeed clamped to range', () => {
        car.move(60);
        expect(car.getCurrentSpeed()).to.equal(60);

        car.move(200);
        expect(car.getCurrentSpeed()).to.equal(maxSpeed);

        car.move(-10);
        expect(car.getCurrentSpeed()).to.equal(0);
    });

    it('stop sets speed to 0', () => {
        car.move(50);
        expect(car.getCurrentSpeed()).to.equal(50);
        car.stop();
        expect(car.getCurrentSpeed()).to.equal(0);
    });

    it('chargeBattery increases capacity up to 100 and respects clamp', () => {
        expect(car.getEnergyLevel()).to.equal(80);
        car.chargeBattery();
        expect(car.getEnergyLevel()).to.equal(90);
        car.chargeBattery();
        expect(car.getEnergyLevel()).to.equal(100);
        car.chargeBattery();
        expect(car.getEnergyLevel()).to.equal(100);
    });

    it('estimateRange computes expected distance with default and custom consumption', () => {
        const capacity = car.getEnergyLevel();
        const availableKwh = (capacity / 100) * batteryCapacityKwh;
        const expectedDefault = Math.round((availableKwh / 18) * 100);
        expect(car.estimateRange()).to.equal(expectedDefault);
        const customConsumption = 20;
        const expectedCustom = Math.round((availableKwh / customConsumption) * 100);
        expect(car.estimateRange(customConsumption)).to.equal(expectedCustom);
        car.chargeBattery();
        const availableAfterCharge = (car.getEnergyLevel() / 100) * batteryCapacityKwh;
        const expectedAfterCharge = Math.round((availableAfterCharge / customConsumption) * 100);
        expect(car.estimateRange(customConsumption)).to.equal(expectedAfterCharge);
    });
});
