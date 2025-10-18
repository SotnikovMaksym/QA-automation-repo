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
    getEnergyLevel(): number;
}

export interface IRechargeable {
    chargeBattery(): void;
}

export interface IRefuelable {
    refill(amount: number): void;
}
