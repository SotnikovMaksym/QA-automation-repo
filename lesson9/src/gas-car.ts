import { ICar, IRefuelable } from './abstractions/i-car';

export class GasCar implements ICar, IRefuelable {
    public currentSpeed = 0;
    public capacity: number;
    public readonly brand: string;
    public readonly model: string;
    public readonly maxSpeed: number;
    public readonly color: string;
    private readonly tankCapacityL: number;
    private fuelL: number;

    public constructor(brand: string, model: string, maxSpeed: number, color: string, tankCapacityL = 50, initialFuelL = 20) {
        this.brand = brand;
        this.model = model;
        this.maxSpeed = maxSpeed;
        this.color = color;
        this.tankCapacityL = tankCapacityL;
        this.fuelL = this.clamp(initialFuelL, 0, this.tankCapacityL);
        this.capacity = this.percentFromFuel(this.fuelL, this.tankCapacityL);
    }

    public move(targetSpeed: number): void {
        this.currentSpeed = this.clamp(targetSpeed, 0, this.maxSpeed);
        console.log(`[Gas] ${this.brand} ${this.model} moving at ${this.currentSpeed} km/h`);
    }

    public stop(): void {
        this.currentSpeed = 0;
        console.log('[Gas] Car stopped');
    }

    public getCurrentSpeed(): number {
        return this.currentSpeed;
    }

    public refill(amount: number): void {
        this.fuelL = this.clamp(this.fuelL + amount, 0, this.tankCapacityL);
        this.capacity = this.percentFromFuel(this.fuelL, this.tankCapacityL);
        console.log(`[Gas] Refueled: ${this.fuelL}/${this.tankCapacityL} L (${this.capacity}%)`);
    }

    public getEnergyLevel(): number {
        return this.capacity;
    }

    protected clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    private percentFromFuel(fuel: number, tank: number): number {
        return Math.round((fuel / tank) * 100);
    }
}
