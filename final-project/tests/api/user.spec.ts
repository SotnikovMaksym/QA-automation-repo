import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('User Profile and Settings Management', () => {
    const baseURL = 'https://new.fophelp.pro/api';

    test('01 - should get current user information', async ({ authenticatedAPI }) => {
        const response = await authenticatedAPI.get(`${baseURL}/react/authenticate/show`);

        expect(response.ok()).toBeTruthy();

        const rawData = await response.json();
        const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

        expect(data).toHaveProperty('Status');
        expect(data.Status).toBe('Recieved');
        expect(data).toHaveProperty('Message');
        expect(data.Message).toContain('token=>');
        expect(data.Message).toContain('Id =>');
    });

    test('02 - should check admin status', async ({ authenticatedAPI }) => {
        const response = await authenticatedAPI.get(`${baseURL}/react/authenticate/checkadmin`);

        expect(response.ok()).toBeTruthy();

        const isAdmin = await response.json();
        expect(typeof isAdmin).toBe('boolean');
    });

    test('03 - should refresh authentication token', async ({ authenticatedAPI }) => {
        const response = await authenticatedAPI.get(`${baseURL}/react/authenticate/refresh`);

        expect(response.ok()).toBeTruthy();
    });

    test('04 - should verify session persistence', async ({ authenticatedAPI }) => {
        const firstCheck = await authenticatedAPI.get(`${baseURL}/react/authenticate/show`);
        expect(firstCheck.ok()).toBeTruthy();

        const firstData = await firstCheck.json();

        await new Promise(resolve => setTimeout(resolve, 2000));

        const secondCheck = await authenticatedAPI.get(`${baseURL}/react/authenticate/show`);
        expect(secondCheck.ok()).toBeTruthy();

        const secondData = await secondCheck.json();

        expect(firstData.Message).toBe(secondData.Message);
    });
});
