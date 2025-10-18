import { ICar, IRechargeable } from './abstractions/i-car';

export class ElectricCar implements ICar, IRechargeable {
    public currentSpeed = 0;
    public capacity = 80;
    public readonly brand: string;
    public readonly model: string;
    public readonly maxSpeed: number;
    public readonly color: string;
    private readonly batteryCapacityKwh: number;

    public constructor(brand: string, model: string, maxSpeed: number, color: string, batteryCapacityKwh = 60) {
        this.brand = brand;
        this.model = model;
        this.maxSpeed = maxSpeed;
        this.color = color;
        this.batteryCapacityKwh = batteryCapacityKwh;
    }

    public move(targetSpeed: number): void {
        this.currentSpeed = this.clamp(targetSpeed, 0, this.maxSpeed);
        console.log(`[EV] ${this.brand} ${this.model} moving at ${this.currentSpeed} km/h`);
    }

    public stop(): void {
        this.currentSpeed = 0;
        console.log('[EV] Car stopped');
    }

    public getCurrentSpeed(): number {
        return this.currentSpeed;
    }

    public chargeBattery(): void {
        this.capacity = this.clamp(this.capacity + 10, 0, 100);
        console.log(`[EV] Charging... ${this.capacity}%`);
    }

    public getEnergyLevel(): number {
        return this.capacity;
    }

    public estimateRange(consumptionKwhPer100 = 18): number {
        const availableKwh = (this.capacity / 100) * this.batteryCapacityKwh;
        return Math.round((availableKwh / consumptionKwhPer100) * 100);
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }
}
