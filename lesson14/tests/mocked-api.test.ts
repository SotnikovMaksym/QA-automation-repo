import { JokesApi } from '../api-objects/jokes-api';
import { HttpClientConfig, Joke, ApiResponse } from '../types/api.types';

jest.mock('../services/http-client');

interface MockHttpClient {
    get: jest.Mock;
}

describe('JokesApi TypeScript Tests (Mocked)', () => {
    let jokesApi: JokesApi;
    let mockHttpClient: MockHttpClient;

    const mockJoke: Joke = {
        id: 1,
        type: 'programming',
        setup: 'Why do programmers prefer dark mode?',
        punchline: 'Because light attracts bugs!'
    };

    const mockApiResponse: ApiResponse<Joke> = {
        status: 200,
        data: mockJoke,
        headers: { 'content-type': 'application/json' }
    };

    const mockJokesArray: Joke[] = [
        mockJoke,
        {
            id: 2,
            type: 'programming',
            setup: 'Why do Java developers wear glasses?',
            punchline: 'Because they cannot C#!'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        const config: HttpClientConfig = {
            baseURL: 'http://localhost:3005',
            timeout: 10000
        };

        jokesApi = new JokesApi(config);

        mockHttpClient = (jokesApi as unknown as { httpClient: MockHttpClient }).httpClient;

        mockHttpClient.get = jest.fn();
    });

    describe('getRandomJoke', () => {
        it('should return a single joke with proper TypeScript typing', async () => {
            mockHttpClient.get.mockResolvedValue(mockApiResponse);

            const result = await jokesApi.getRandomJoke();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/jokes/random');
            expect(result).toEqual(mockApiResponse);
            expect(result.data).toMatchObject({
                id: expect.any(Number),
                type: expect.any(String),
                setup: expect.any(String),
                punchline: expect.any(String)
            });
        });
    });

    describe('getRandomJokes', () => {
        it('should return multiple jokes with proper typing', async () => {
            const mockResponse: ApiResponse<Joke[]> = {
                status: 200,
                data: mockJokesArray,
                headers: { 'content-type': 'application/json' }
            };

            mockHttpClient.get.mockResolvedValue(mockResponse);

            const result = await jokesApi.getRandomJokes(5);

            expect(mockHttpClient.get).toHaveBeenCalledWith('/jokes/random/5');
            expect(result.data).toHaveLength(2);
            expect(Array.isArray(result.data)).toBe(true);
        });

        it('should handle error responses with proper typing', async () => {
            const errorResponse: ApiResponse<string> = {
                status: 400,
                data: 'Invalid count parameter',
                headers: { 'content-type': 'text/plain' }
            };

            mockHttpClient.get.mockResolvedValue(errorResponse);

            const result = await jokesApi.getRandomJokes(-1);

            expect(mockHttpClient.get).toHaveBeenCalledWith('/jokes/random/-1');
            expect(typeof result.data).toBe('string');
        });
    });

    describe('getTenRandomJokes', () => {
        it('should return exactly ten jokes', async () => {
            const mockTenJokes = Array.from({ length: 10 }, (_, index) => ({
                ...mockJoke,
                id: index + 1
            }));

            const mockResponse: ApiResponse<Joke[]> = {
                status: 200,
                data: mockTenJokes,
                headers: { 'content-type': 'application/json' }
            };

            mockHttpClient.get.mockResolvedValue(mockResponse);

            const result = await jokesApi.getTenRandomJokes();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/jokes/ten');
            expect(result.data).toHaveLength(10);
            expect(
                result.data.every(
                    (joke: Joke) =>
                        typeof joke.id === 'number' &&
                        typeof joke.type === 'string' &&
                        typeof joke.setup === 'string' &&
                        typeof joke.punchline === 'string'
                )
            ).toBe(true);
        });
    });

    describe('getRandomJokeByType', () => {
        it('should fetch jokes by specific type with proper typing', async () => {
            const mockResponse: ApiResponse<Joke[]> = {
                status: 200,
                data: [mockJoke],
                headers: { 'content-type': 'application/json' }
            };

            mockHttpClient.get.mockResolvedValue(mockResponse);

            const result = await jokesApi.getRandomJokeByType('programming');

            expect(mockHttpClient.get).toHaveBeenCalledWith('/jokes/programming/random');
            expect(Array.isArray(result.data)).toBe(true);
            expect(result.data[0].type).toBe('programming');
        });
    });

    describe('ping', () => {
        it('should return health check response', async () => {
            const mockPingResponse: ApiResponse<string> = {
                status: 200,
                data: 'pong',
                headers: { 'content-type': 'text/plain' }
            };

            mockHttpClient.get.mockResolvedValue(mockPingResponse);

            const result = await jokesApi.ping();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ping');
            expect(typeof result.data).toBe('string');
            expect(result.status).toBe(200);
        });
    });
});
