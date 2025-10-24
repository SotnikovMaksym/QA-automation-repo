import { expect } from 'chai';
import sinon from 'sinon';
import { ElectricCar } from '../src/electric-car';

describe('ElectricCar with mocks', () => {
    let electricCar: ElectricCar;
    let consoleLogSpy: sinon.SinonSpy;

    beforeEach(() => {
        electricCar = new ElectricCar('Tesla', 'Model 3', 250, 'red', 75);
        consoleLogSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleLogSpy.restore();
    });

    it('should correctly log movement message when moving', () => {
        electricCar.move(100);

        expect(consoleLogSpy.calledWith('[EV] Tesla Model 3 moving at 100 km/h')).to.be.true;
        expect(electricCar.getCurrentSpeed()).to.equal(100);
    });

    it('should limit speed to maxSpeed when moving faster', () => {
        electricCar.move(300);

        expect(electricCar.getCurrentSpeed()).to.equal(250);
        expect(consoleLogSpy.calledWith('[EV] Tesla Model 3 moving at 250 km/h')).to.be.true;
    });

    it('should correctly update battery capacity when charging', () => {
        electricCar.capacity = 50;

        electricCar.chargeBattery();

        expect(electricCar.getEnergyLevel()).to.equal(60);
        expect(consoleLogSpy.calledWith('[EV] Charging... 60%')).to.be.true;
    });

    it('should not exceed 100% battery capacity when charging', () => {
        electricCar.capacity = 95;

        electricCar.chargeBattery();

        expect(electricCar.getEnergyLevel()).to.equal(100);
        expect(consoleLogSpy.calledWith('[EV] Charging... 100%')).to.be.true;
    });

    it('should correctly calculate estimated range based on consumption', () => {
        const mockClamp = sinon.stub(Object.getPrototypeOf(electricCar), 'clamp').returns(80);
        electricCar.capacity = 80;

        const range = electricCar.estimateRange(15);

        expect(range).to.equal(400);
        mockClamp.restore();
    });

    it('should stop the car and log the message', () => {
        electricCar.move(100);

        electricCar.stop();

        expect(electricCar.getCurrentSpeed()).to.equal(0);
        expect(consoleLogSpy.calledWith('[EV] Car stopped')).to.be.true;
    });
});
