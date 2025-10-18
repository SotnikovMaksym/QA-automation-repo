import { IRechargeable } from './abstractions/i-car';
import { GasCar } from './gas-car';

export class HybridCar extends GasCar implements IRechargeable {
    private batteryPercent = 30;
    private readonly batteryKwh: number;

    public constructor(brand: string, model: string, maxSpeed: number, color: string, tankCapacityL = 43, initialFuelL = 20) {
        super(brand, model, maxSpeed, color, tankCapacityL, initialFuelL);
        this.batteryKwh = 12;
    }

    public chargeBattery(): void {
        this.batteryPercent = Math.min(100, this.batteryPercent + 15);
        console.log(`[PHEV] Battery charged to ${this.batteryPercent}%`);
    }

    public override getEnergyLevel(): number {
        const fuelPct = super.getEnergyLevel();
        return Math.round((fuelPct + this.batteryPercent) / 2);
    }
}
