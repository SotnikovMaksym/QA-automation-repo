declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValidJoke(): R;
            toBeValidJokeArray(expectedLength?: number): R;
        }
    }
}

export {};
