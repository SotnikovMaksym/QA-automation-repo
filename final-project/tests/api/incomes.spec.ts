import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('Incomes API - Full CRUD with Real Data', () => {
    const apiBase = process.env.API_BASE_URL || 'https://new.fophelp.pro/api';
    const basePath = `${apiBase}/v2/incomes`;

    test('01 - should create new income via API', async ({ authenticatedAPI }) => {
        const today = new Date().toISOString().split('T')[0];

        const payload = {
            date: today,
            income: '25000',
            currency: 'UAH',
            comment: 'API Test - Consulting Services',
            cash: false
        };

        const response = await authenticatedAPI.post(`${basePath}/add`, { data: payload });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('02 - should get all incomes via API', async ({ authenticatedAPI: request }) => {
        const response = await request.get(`${basePath}`);

        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        expect(typeof data).toBe('object');

        const allIncomes = Object.values(data).flat();
        expect(allIncomes.length).toBeGreaterThan(0);
    });

    test('03 - should create USD income with auto-conversion', async ({ authenticatedAPI: request }) => {
        const today = new Date().toISOString().split('T')[0];

        const response = await request.post(`${basePath}/add`, {
            data: {
                date: today,
                income: '1000',
                currency: 'USD',
                comment: 'API Test - USD Payment',
                cash: false
            }
        });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('04 - should create EUR income with auto-conversion', async ({ authenticatedAPI: request }) => {
        const today = new Date().toISOString().split('T')[0];

        const response = await request.post(`${basePath}/add`, {
            data: {
                date: today,
                income: '800',
                currency: 'EUR',
                comment: 'API Test - EUR Payment',
                cash: false
            }
        });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('05 - should create cash income', async ({ authenticatedAPI: request }) => {
        const today = new Date().toISOString().split('T')[0];

        const response = await request.post(`${basePath}/add`, {
            data: {
                date: today,
                income: '5000',
                currency: 'UAH',
                comment: 'API Test - Cash Payment',
                cash: true
            }
        });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('06 - should update income via API', async ({ authenticatedAPI: request }) => {
        const listResponse = await request.get(`${basePath}`);
        const listData = await listResponse.json();

        const allIncomes = Object.values(listData).flat() as { id: string; comment: string }[];
        const testIncome = allIncomes.find(inc => inc.comment?.includes('API Test - Consulting'));

        if (testIncome) {
            const updateResponse = await request.post(`${basePath}/update`, {
                data: {
                    id: testIncome.id,
                    date: new Date().toISOString().split('T')[0],
                    income: '28000',
                    currency: 'UAH',
                    comment: 'API Test - Updated Consulting Services',
                    cash: false
                }
            });

            const updateText = await updateResponse.text();
            expect(updateResponse.ok()).toBeTruthy();
            expect(updateText).toContain('Successfully');
        }
    });

    test('07 - should delete income via API', async ({ authenticatedAPI: request }) => {
        const listResponse = await request.get(`${basePath}`);
        const listData = await listResponse.json();

        const allIncomes = Object.values(listData).flat() as { id: string; comment: string }[];
        const testIncome = allIncomes.find(inc => inc.comment?.includes('API Test'));

        if (testIncome) {
            const deleteResponse = await request.post(`${basePath}/delete`, {
                data: { id: testIncome.id }
            });

            const deleteText = await deleteResponse.text();
            expect(deleteResponse.ok()).toBeTruthy();
            expect(deleteText).toContain('Successfully deleted');
        }
    });

    test('08 - should handle invalid data validation', async ({ authenticatedAPI: request }) => {
        const response = await request.post(`${basePath}/add`, {
            data: {
                date: 'invalid-date',
                income: '-1000',
                currency: 'INVALID',
                comment: '',
                cash: false
            }
        });

        expect(response.ok()).toBeFalsy();
    });
});
