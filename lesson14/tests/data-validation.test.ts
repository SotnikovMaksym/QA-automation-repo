describe('Jokes API - Data Validation and Edge Cases', () => {
    test('Should validate joke schema compliance', async () => {
        const response = await jokesApi.getRandomJoke();

        expect(response.status).toBe(200);
        const joke = response.data;

        expect(joke).toHaveProperty('id');
        expect(joke).toHaveProperty('type');
        expect(joke).toHaveProperty('setup');
        expect(joke).toHaveProperty('punchline');

        expect(typeof joke.id).toBe('number');
        expect(typeof joke.type).toBe('string');
        expect(typeof joke.setup).toBe('string');
        expect(typeof joke.punchline).toBe('string');

        expect(joke.type.trim()).not.toBe('');
        expect(joke.setup.trim()).not.toBe('');
        expect(joke.punchline.trim()).not.toBe('');

        expect(joke.id).toBeGreaterThan(0);
    });

    test('Should handle boundary values for random jokes count', async () => {
        const responseMin = await jokesApi.getRandomJokes(1);
        expect(responseMin.status).toBe(200);
        expect(responseMin.data).toBeValidJokeArray(1);

        const responseZero = await jokesApi.getRandomJokes(0);
        expect(responseZero.status).toBe(200);
        expect(typeof responseZero.data).toBe('string');
        expect(responseZero.data).toContain('not a number');
    });

    test('Should verify content quality of jokes', async () => {
        const response = await jokesApi.getTenRandomJokes();

        expect(response.status).toBe(200);
        const jokes = response.data;

        jokes.forEach((joke) => {
            expect(joke.setup.trim().length).toBeGreaterThan(5);
            expect(joke.punchline.trim().length).toBeGreaterThan(1);

            expect(['general', 'programming', 'dad', 'knock-knock'].some((type) => joke.type.includes(type))).toBeTruthy();
        });
    });

    test('Should verify joke uniqueness in multiple requests', async () => {
        const requests = 3;
        const jokesPerRequest = 5;
        const allJokes = [];

        for (let i = 0; i < requests; i++) {
            const response = await jokesApi.getRandomJokes(jokesPerRequest);
            expect(response.status).toBe(200);
            allJokes.push(...response.data);
        }

        const totalJokes = allJokes.length;
        const uniqueIds = new Set(allJokes.filter(joke => typeof joke === 'object' && joke !== null).map((joke) => (joke as { id: number }).id));

        expect(uniqueIds.size).toBeGreaterThan(1);
        expect(totalJokes).toBe(requests * jokesPerRequest);
    });

    test('Should maintain consistent API response format across endpoints', async () => {
        const singleJoke = await jokesApi.getRandomJoke();
        const multipleJokes = await jokesApi.getRandomJokes(3);
        const tenJokes = await jokesApi.getTenRandomJokes();

        expect(singleJoke.status).toBe(200);
        expect(multipleJokes.status).toBe(200);
        expect(tenJokes.status).toBe(200);

        [singleJoke, multipleJokes, tenJokes].forEach((response) => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        expect(singleJoke.data).toBeValidJoke();
        expect(multipleJokes.data).toBeValidJokeArray(3);
        expect(tenJokes.data).toBeValidJokeArray(10);
    });
});
