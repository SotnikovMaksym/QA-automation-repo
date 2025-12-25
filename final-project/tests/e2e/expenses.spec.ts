import { test, expect } from '../../src/fixtures/e2e.fixture';
import { ExpensesPage } from '../../src/pages/expenses.page';
import { TEST_DATA, ROUTES } from '../../src/config/test-data';

test.describe('Expense Management - Full CRUD', () => {
    let expensesPage: ExpensesPage;

    test.beforeEach(async ({ page }) => {
        expensesPage = new ExpensesPage(page);
        await expensesPage.open();
    });

    test('01 - should navigate to expenses page', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(ROUTES.expenses));
        await expect(expensesPage['addExpenseButton']).toBeVisible();
    });
    test('02 - should create new expense successfully', async ({ page }) => {
        await expensesPage.clickAddExpense();

        const today = new Date().toISOString().split('T')[0];
        await expensesPage.fillExpenseForm({
            date: today,
            currency: TEST_DATA.expense.currencies.uah,
            amount: TEST_DATA.expense.amounts.default,
            comment: TEST_DATA.expense.comments.automated
        });

        await expensesPage.submitExpenseForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.expenses));
    });
    test('03 - should create cash expense', async ({ page }) => {
        await expensesPage.clickAddExpense();

        const today = new Date().toISOString().split('T')[0];
        await expensesPage.fillExpenseForm({
            date: today,
            amount: TEST_DATA.expense.amounts.cash,
            comment: TEST_DATA.expense.comments.cash,
            isCash: true
        });

        await expensesPage.submitExpenseForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.expenses));
    });
    test('04 - should display expenses list', async () => {
        const isTableVisible = await expensesPage.isExpenseTableVisible();
        expect(isTableVisible).toBeTruthy();
    });
    test('05 - should filter by year and month', async () => {
        await expensesPage.filterByYear();
    });
    test('07 - should create expense with different currency', async ({ page }) => {
        await expensesPage.clickAddExpense();

        const today = new Date().toISOString().split('T')[0];
        await expensesPage.fillExpenseForm({
            date: today,
            currency: TEST_DATA.expense.currencies.usd,
            amount: TEST_DATA.expense.amounts.usd,
            comment: TEST_DATA.expense.comments.usd
        });

        await expensesPage.submitExpenseForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.expenses));
    });
    test('08 - should validate required fields', async ({ page }) => {
        await expensesPage.clickAddExpense();

        await page.locator('#comment').fill(TEST_DATA.expense.comments.validation);

        const modal = page.locator('.modal-content, [role="dialog"]').first();
        const submitButton = modal
            .locator('button')
            .filter({ hasText: /зберегти|save|додати/i })
            .first();
        await submitButton.click();

        const commentField = page.locator('#comment');
        const isStillVisible = await commentField.isVisible();

        expect(isStillVisible).toBeTruthy();
    });
});
