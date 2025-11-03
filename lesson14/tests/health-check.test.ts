describe('Jokes API - Health Check and Ping', () => {
    test('Should respond to ping endpoint', async () => {
        const response = await jokesApi.ping();

        expect(response.status).toBe(200);
        expect(response.data).toBe('pong');
    });

    test('Should have proper CORS headers', async () => {
        const response = await jokesApi.getRandomJoke();

        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    test('Should handle concurrent requests without issues', async () => {
        const concurrentRequests = 5;
        const promises = [];

        for (let i = 0; i < concurrentRequests; i++) {
            promises.push(jokesApi.getRandomJoke());
        }

        const responses = await Promise.all(promises);

        responses.forEach((response) => {
            expect(response.status).toBe(200);
            expect(response.data).toBeValidJoke();
        });

        const uniqueIds = new Set(responses.map((r) => r.data.id));
        expect(uniqueIds.size).toBeGreaterThan(1);
    });
});
