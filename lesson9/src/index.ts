import { ICar, IRechargeable, IRefuelable } from './abstractions/i-car';
import { ElectricCar } from './electric-car';
import { GasCar } from './gas-car';
import { HybridCar } from './hybrid-car';

function isRechargeable(x: unknown): x is IRechargeable {
    return typeof (x as IRechargeable)?.chargeBattery === 'function';
}
function isRefuelable(x: unknown): x is IRefuelable {
    return typeof (x as IRefuelable)?.refill === 'function';
}

function demoDrive(car: ICar): void {
    car.move(50);
    console.log('Speed:', car.getCurrentSpeed(), 'km/h');
    console.log('Energy level:', car.getEnergyLevel(), '%');
    if (isRechargeable(car)) {
        car.chargeBattery();
        console.log('After charge:', car.getEnergyLevel(), '%');
    }
    if (isRefuelable(car)) {
        car.refill(10);
        console.log('After refill:', car.getEnergyLevel(), '%');
    }
    car.stop();
    console.log('---');
}

const tesla = new ElectricCar('Tesla', 'Model 3', 225, 'white');
const corolla = new GasCar('Toyota', 'Corolla', 190, 'blue', 50, 15);
const hybrid = new HybridCar('Toyota', 'Prius', 180, 'grey', 43, 20);

demoDrive(tesla);
demoDrive(corolla);
demoDrive(hybrid);
