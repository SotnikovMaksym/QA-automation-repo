describe('Jokes API - Ten Jokes Endpoint', () => {
    test('Should get exactly 10 random jokes', async () => {
        const response = await jokesApi.getTenRandomJokes();

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data).toBeValidJokeArray(10);
    });

    test('Should return jokes with unique IDs in ten jokes response', async () => {
        const response = await jokesApi.getTenRandomJokes();

        expect(response.status).toBe(200);
        const jokes = response.data;
        const ids = jokes.map((joke) => joke.id);
        const uniqueIds = new Set(ids);

        expect(uniqueIds.size).toBe(jokes.length);
        expect(jokes.length).toBe(10);
    });

    test('Should have response time under 1 second for ten jokes', async () => {
        const startTime = Date.now();
        const response = await jokesApi.getTenRandomJokes();
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(response.status).toBe(200);
        expect(responseTime).toBeLessThan(1000);
    });
});
