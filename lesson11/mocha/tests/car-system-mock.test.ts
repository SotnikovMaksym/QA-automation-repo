import { expect } from 'chai';
import sinon from 'sinon';
import { ElectricCar } from '../src/electric-car';
import { GasCar } from '../src/gas-car';
import { ICar } from '../src/abstractions/i-car';

class CarSystem {
    private cars: ICar[] = [];

    public addCar(car: ICar): void {
        this.cars.push(car);
    }

    public startAllCars(speed: number): void {
        this.cars.forEach(car => car.move(speed));
    }

    public stopAllCars(): void {
        this.cars.forEach(car => car.stop());
    }

    public getTotalEnergy(): number {
        return this.cars.reduce((sum, car) => sum + car.getEnergyLevel(), 0);
    }
}

describe('Car System with Mocks', () => {
    let carSystem: CarSystem;
    let electricCarMock: sinon.SinonStubbedInstance<ElectricCar>;
    let gasCarMock: sinon.SinonStubbedInstance<GasCar>;

    beforeEach(() => {
        electricCarMock = sinon.createStubInstance(ElectricCar);
        gasCarMock = sinon.createStubInstance(GasCar);

        carSystem = new CarSystem();
    });

    it('should call move() on all cars when starting', () => {
        carSystem.addCar(electricCarMock);
        carSystem.addCar(gasCarMock);

        carSystem.startAllCars(50);

        expect(electricCarMock.move.calledOnceWith(50)).to.be.true;
        expect(gasCarMock.move.calledOnceWith(50)).to.be.true;
    });

    it('should call stop() on all cars when stopping', () => {
        carSystem.addCar(electricCarMock);
        carSystem.addCar(gasCarMock);

        carSystem.stopAllCars();

        expect(electricCarMock.stop.calledOnce).to.be.true;
        expect(gasCarMock.stop.calledOnce).to.be.true;
    });

    it('should calculate total energy correctly', () => {
        electricCarMock.getEnergyLevel.returns(80);
        gasCarMock.getEnergyLevel.returns(60);
        carSystem.addCar(electricCarMock);
        carSystem.addCar(gasCarMock);

        const totalEnergy = carSystem.getTotalEnergy();

        expect(totalEnergy).to.equal(140);
        expect(electricCarMock.getEnergyLevel.calledOnce).to.be.true;
        expect(gasCarMock.getEnergyLevel.calledOnce).to.be.true;
    });
});

describe('Car Interaction Mocks', () => {
    it('should mock sequential method calls on ElectricCar', () => {
        const car = new ElectricCar('Tesla', 'Model S', 250, 'black');
        const moveStub = sinon.stub(car, 'move');
        const chargeStub = sinon.stub(car, 'chargeBattery');

        car.move(100);
        car.chargeBattery();

        expect(moveStub.calledWith(100)).to.be.true;
        expect(chargeStub.calledOnce).to.be.true;

        moveStub.restore();
        chargeStub.restore();
    });

    it('should mock and verify complex interaction sequence', () => {
        const car = new ElectricCar('Tesla', 'Model 3', 250, 'red');
        const moveSpy = sinon.spy(car, 'move');
        const stopSpy = sinon.spy(car, 'stop');
        const getSpeedSpy = sinon.spy(car, 'getCurrentSpeed');

        car.move(50);
        car.getCurrentSpeed();
        car.move(0);
        car.stop();

        expect(moveSpy.callCount).to.equal(2);
        expect(moveSpy.firstCall.args[0]).to.equal(50);
        expect(moveSpy.secondCall.args[0]).to.equal(0);
        expect(stopSpy.calledOnce).to.be.true;
        expect(stopSpy.calledAfter(moveSpy)).to.be.true;
        expect(getSpeedSpy.calledOnce).to.be.true;

        moveSpy.restore();
        stopSpy.restore();
        getSpeedSpy.restore();
    });
});
