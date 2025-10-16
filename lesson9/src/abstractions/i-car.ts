export interface ICar {
    brand: string;
    model: string;
    maxSpeed: number;
    color: string;
    capacity: number;
    currentSpeed: number;

    move(targetSpeed: number): void;
    stop(): void;
    getCurrentSpeed(): number;
    chargeBattery(): void;
    refill(amount: number): void;
    getEnergyLevel(): number;
}
