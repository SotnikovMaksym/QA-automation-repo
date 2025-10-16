import { ICar } from './abstractions/i-car';

export class GasCar implements ICar {
    public currentSpeed = 0;
    public capacity: number;
    private readonly tankCapacityL: number;

    public constructor(
        public readonly brand: string,
        public readonly model: string,
        public readonly maxSpeed: number,
        public readonly color: string,
        tankCapacityL = 50,
        initialFuelL  = 20
    ) {
        this.tankCapacityL = tankCapacityL;
        this.capacity = this.clamp(initialFuelL, 0, this.tankCapacityL);
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

    public chargeBattery(): void {
        console.log('[Gas] No battery to charge');
    }

    public refill(amount: number): void {
        this.capacity = this.clamp(this.capacity + amount, 0, this.tankCapacityL);
        console.log(`[Gas] refueled: ${this.capacity}/${this.tankCapacityL} L`);
    }

    public getEnergyLevel(): number {
        return Math.round((this.capacity / this.tankCapacityL) * 100);
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }
}
