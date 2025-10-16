import { ICar } from './abstractions/i-car';
import { ElectricCar } from './electric-car';
import { GasCar } from './gas-car';

function demoDrive(car: ICar): void {
    car.move(50);
    console.log('Speed:', car.getCurrentSpeed(), 'km/h');
    console.log('Energy level:', car.getEnergyLevel(), '%');
    car.stop();

    car.refill(20);
    console.log('Energy level after refill:', car.getEnergyLevel(), '%');
    console.log('---');
}

const tesla = new ElectricCar('Tesla', 'Model 3', 225, 'white');
const corolla = new GasCar('Toyota', 'Corolla', 190, 'blue', 50, 15);

demoDrive(tesla);
demoDrive(corolla);
