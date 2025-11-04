describe('Jokes API - Programming Jokes', () => {
    test('Should get a random programming joke', async () => {
        const response = await jokesApi.getRandomJokeByType('programming');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        const jokes = response.data;
        expect(jokes).toHaveLength(1);
        expect(jokes[0]).toBeValidJoke();
        expect(jokes[0].type).toBe('programming');
    });

    test('Should get ten programming jokes', async () => {
        const response = await jokesApi.getTenJokesByType('programming');

        expect(response.status).toBe(200);
        const jokes = response.data;
        expect(jokes).toBeValidJokeArray(10);

        jokes.forEach((joke) => {
            expect(joke.type).toBe('programming');
        });
    });

    test('Should handle non-existent joke type gracefully', async () => {
        const nonExistentType = 'nonexistent';

        const response = await jokesApi.getRandomJokeByType(nonExistentType);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data).toHaveLength(0);
    });
});
