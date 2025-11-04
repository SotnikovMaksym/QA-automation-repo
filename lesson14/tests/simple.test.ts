import { JokesApi } from '../api-objects/jokes-api';
import { HttpClientConfig } from '../types/api.types';

describe('Simple TypeScript Test', () => {
    const config: HttpClientConfig = {
        baseURL: 'http://localhost:3005',
        timeout: 10000
    };

    const jokesApi = new JokesApi(config);

    test('should create JokesApi instance', () => {
        expect(jokesApi).toBeDefined();
        expect(jokesApi).toBeInstanceOf(JokesApi);
    });

    test('should have proper TypeScript types', () => {
        expect(typeof jokesApi.getRandomJoke).toBe('function');
        expect(typeof jokesApi.getTenRandomJokes).toBe('function');
        expect(typeof jokesApi.getRandomJokes).toBe('function');
        expect(typeof jokesApi.getRandomJokeByType).toBe('function');
        expect(typeof jokesApi.getTenJokesByType).toBe('function');
        expect(typeof jokesApi.ping).toBe('function');
        expect(typeof jokesApi.getJokeById).toBe('function');
        expect(typeof jokesApi.getJokeTypes).toBe('function');
    });

    test('should handle configuration correctly', () => {
        const testConfig: HttpClientConfig = {
            baseURL: 'https://test.com',
            timeout: 5000
        };

        const testApi = new JokesApi(testConfig);
        expect(testApi).toBeDefined();
    });
});
