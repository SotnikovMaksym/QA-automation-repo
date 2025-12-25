import { test, expect } from '../../src/fixtures/e2e.fixture';
import { IncomesPage } from '../../src/pages/incomes.page';
import { TEST_DATA, ROUTES } from '../../src/config/test-data';

test.describe('Income Management - Full CRUD', () => {
    let incomesPage: IncomesPage;

    test.beforeEach(async ({ page }) => {
        incomesPage = new IncomesPage(page);
        await incomesPage.open();
    });

    test('01 - should navigate to incomes page', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(ROUTES.incomes));
        await expect(incomesPage['addIncomeButton']).toBeVisible();
    });
    test('02 - should create new income successfully', async ({ page }) => {
        await incomesPage.clickAddIncome();

        const today = new Date().toISOString().split('T')[0];
        await incomesPage.fillIncomeForm({
            date: today,
            currency: TEST_DATA.income.currencies.uah,
            amount: TEST_DATA.income.amounts.default,
            comment: TEST_DATA.income.comments.automated
        });

        await incomesPage.submitIncomeForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.incomes));
    });
    test('03 - should create cash income', async ({ page }) => {
        await incomesPage.clickAddIncome();

        const today = new Date().toISOString().split('T')[0];
        await incomesPage.fillIncomeForm({
            date: today,
            amount: TEST_DATA.income.amounts.cash,
            comment: TEST_DATA.income.comments.cash,
            isCash: true
        });

        await incomesPage.submitIncomeForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.incomes));
    });
    test('04 - should display incomes list', async () => {
        const isTableVisible = await incomesPage.isIncomeTableVisible();
        expect(isTableVisible).toBe(true);
    });
    test('05 - should create income with USD currency', async ({ page }) => {
        await incomesPage.clickAddIncome();

        const today = new Date().toISOString().split('T')[0];
        await incomesPage.fillIncomeForm({
            date: today,
            currency: TEST_DATA.income.currencies.usd,
            amount: TEST_DATA.income.amounts.usd,
            comment: TEST_DATA.income.comments.usd
        });

        await incomesPage.submitIncomeForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.incomes));
    });
    test('06 - should create income with EUR currency', async ({ page }) => {
        await incomesPage.clickAddIncome();

        const today = new Date().toISOString().split('T')[0];
        await incomesPage.fillIncomeForm({
            date: today,
            currency: TEST_DATA.income.currencies.eur,
            amount: TEST_DATA.income.amounts.eur,
            comment: TEST_DATA.income.comments.eur
        });

        await incomesPage.submitIncomeForm();
        await expect(page).toHaveURL(new RegExp(ROUTES.incomes));
    });
    test('07 - should filter by year', async () => {
        await incomesPage.filterByYear();
    });
});
