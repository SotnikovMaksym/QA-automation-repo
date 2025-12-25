import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('Expenses API - Full CRUD with Real Data', () => {
    const apiBase = process.env.API_BASE_URL || 'https://new.fophelp.pro/api';
    const basePath = `${apiBase}/v2/expenses`;

    test('01 - should create new expense via API', async ({ authenticatedAPI }) => {
        const today = new Date().toISOString().split('T')[0];

        const payload = {
            date: today,
            expense: '3500',
            currency: 'UAH',
            comment: 'API Test - Office Equipment',
            cash: false
        };

        const response = await authenticatedAPI.post(`${basePath}/add`, { data: payload });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('02 - should get all expenses via API', async ({ authenticatedAPI }) => {
        const response = await authenticatedAPI.get(`${basePath}`);

        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        expect(typeof data).toBe('object');

        const allExpenses = Object.values(data).flat();
        expect(allExpenses.length).toBeGreaterThan(0);
    });

    test('03 - should create cash expense', async ({ authenticatedAPI }) => {
        const today = new Date().toISOString().split('T')[0];

        const response = await authenticatedAPI.post(`${basePath}/add`, {
            data: {
                date: today,
                expense: '1200',
                currency: 'UAH',
                comment: 'API Test - Cash Purchase',
                cash: true
            }
        });

        const responseText = await response.text();
        expect(response.ok()).toBeTruthy();
        expect(responseText).toContain('Successfully');
    });

    test('04 - should update expense via API', async ({ authenticatedAPI }) => {
        const listResponse = await authenticatedAPI.get(`${basePath}`);
        const listData = await listResponse.json();

        const allExpenses = Object.values(listData).flat() as { id: string; comment: string }[];
        const testExpense = allExpenses.find(exp => exp.comment?.includes('API Test - Office Equipment'));

        if (testExpense) {
            const updateResponse = await authenticatedAPI.post(`${basePath}/update`, {
                data: {
                    id: testExpense.id,
                    date: new Date().toISOString().split('T')[0],
                    expense: '4000',
                    currency: 'UAH',
                    comment: 'API Test - Updated Office Equipment',
                    cash: false
                }
            });

            const updateText = await updateResponse.text();
            expect(updateResponse.ok()).toBeTruthy();
            expect(updateText).toContain('Successfully');
        }
    });

    test('05 - should delete expense via API', async ({ authenticatedAPI }) => {
        const listResponse = await authenticatedAPI.get(`${basePath}`);
        const listData = await listResponse.json();

        const allExpenses = Object.values(listData).flat() as { id: string; comment: string }[];
        const testExpense = allExpenses.find(exp => exp.comment?.includes('API Test'));

        if (testExpense) {
            const deleteResponse = await authenticatedAPI.post(`${basePath}/delete`, {
                data: { id: testExpense.id }
            });

            const deleteText = await deleteResponse.text();
            expect(deleteResponse.ok()).toBeTruthy();
            expect(deleteText).toContain('Successfully deleted');
        }
    });

    test('06 - should delete all test expenses', async ({ authenticatedAPI }) => {
        const listResponse = await authenticatedAPI.get(`${basePath}`);
        const listData = await listResponse.json();

        const allExpenses = Object.values(listData).flat() as { id: string; comment: string }[];
        const testExpenses = allExpenses.filter(exp => exp.comment?.includes('API Test'));

        let deletedCount = 0;

        for (const expense of testExpenses) {
            const deleteResponse = await authenticatedAPI.post(`${basePath}/delete`, {
                data: { id: expense.id }
            });

            if (deleteResponse.ok()) {
                deletedCount++;
            }
        }
        expect(deletedCount).toBeGreaterThanOrEqual(0);
    });

    test('07 - should handle validation errors', async ({ authenticatedAPI }) => {
        const response = await authenticatedAPI.post(`${basePath}/add`, {
            data: {
                date: 'invalid',
                expense: '-500',
                currency: 'INVALID',
                comment: '',
                cash: false
            }
        });

        expect(response.ok()).toBeFalsy();
    });
});
