import { JokesApi } from '../api-objects/jokes-api';
import { Joke } from '../types/api.types';

declare global {
    var jokesApi: JokesApi;
}

jest.setTimeout(10000);

global.jokesApi = new JokesApi();
expect.extend({
    toBeValidJoke(received: unknown): jest.CustomMatcherResult {
        if (typeof received !== 'object' || received === null) {
            return {
                message: () => 'Expected received value to be an object',
                pass: false
            };
        }

        const joke = received as Record<string, unknown>;
        const requiredFields = ['id', 'type', 'setup', 'punchline'];
        const missingFields = requiredFields.filter((field) => !(field in joke));

        if (missingFields.length > 0) {
            return {
                message: () => `Expected joke object to have all required fields. Missing: ${missingFields.join(', ')}`,
                pass: false
            };
        }

        if (typeof joke.id !== 'number') {
            return {
                message: () => `Expected id to be a number, received ${typeof joke.id}`,
                pass: false
            };
        }

        const stringFields = ['type', 'setup', 'punchline'];
        for (const field of stringFields) {
            if (typeof joke[field] !== 'string' || (joke[field] as string).trim().length === 0) {
                return {
                    message: () => `Expected ${field} to be a non-empty string`,
                    pass: false
                };
            }
        }

        return {
            message: () => 'Expected received value not to be a valid joke object',
            pass: true
        };
    },

    toBeValidJokeArray(received: unknown, expectedLength?: number): jest.CustomMatcherResult {
        if (!Array.isArray(received)) {
            return {
                message: () => `Expected an array, received ${typeof received}`,
                pass: false
            };
        }

        if (expectedLength !== undefined && received.length !== expectedLength) {
            return {
                message: () => `Expected array length to be ${expectedLength}, received ${received.length}`,
                pass: false
            };
        }

        for (let i = 0; i < received.length; i++) {
            try {
                (expect(received[i]) as unknown as { toBeValidJoke: () => void }).toBeValidJoke();
            } catch (error) {
                return {
                    message: () => `Joke at index ${i} is invalid: ${(error as Error).message}`,
                    pass: false
                };
            }
        }

        const ids = received.map((joke: Joke) => joke.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            return {
                message: () => 'Expected all jokes to have unique IDs',
                pass: false
            };
        }

        return {
            message: () => 'Expected joke array to be invalid',
            pass: true
        };
    }
});
