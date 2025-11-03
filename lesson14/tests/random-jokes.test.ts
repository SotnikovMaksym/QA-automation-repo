describe('Jokes API - Random Jokes', () => {
    test('Should get a single random joke with valid structure', async () => {
        const response = await jokesApi.getRandomJoke();

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data).toBeValidJoke();
    });

    test('Should get multiple random jokes when count is specified', async () => {
        const count = 5;

        const response = await jokesApi.getRandomJokes(count);

        expect(response.status).toBe(200);
        expect(response.data).toBeValidJokeArray(count);
    });

    test('Should return error when requesting more jokes than available', async () => {
        const excessiveCount = 999999;

        const response = await jokesApi.getRandomJokes(excessiveCount);

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('string');
        expect(response.data as string).toContain('exceeds the number of jokes');
    });

    test('Should return error when count parameter is not a number', async () => {
        const invalidCount = 'invalid' as unknown as number;

        const response = await jokesApi.getRandomJokes(invalidCount);

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('string');
        expect(response.data as string).toContain('not a number');
    });
});
