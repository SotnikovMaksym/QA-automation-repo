import { test, expect } from '@playwright/test';
import { ExpenseTrackerPage } from '../../src/pages/expense-tracker/expense-tracker-page';

test.describe('Expense Tracker Application', () => {
    let expenseTracker: ExpenseTrackerPage;

    test.beforeEach(async ({ page }) => {
        expenseTracker = new ExpenseTrackerPage(page);
        await expenseTracker.goto();
    });

    test('should load the application successfully', async ({ page }) => {
        const inputs = page.locator('input');
        await expect(inputs.first()).toBeVisible({ timeout: 10_000 });

        const buttons = page.locator('button');
        await expect(buttons.first()).toBeVisible();
    });

    test('should add a new expense', async () => {
        const expenseName = 'Coffee';
        const expenseAmount = 5;

        await expenseTracker.addExpense(expenseName, expenseAmount);

        const isVisible = await expenseTracker.isExpenseVisible(expenseName);
        expect(isVisible).toBeTruthy();
    });

    test('should add multiple expenses', async () => {
        const expenses = [
            { name: 'Lunch', amount: 15 },
            { name: 'Transport', amount: 10 },
            { name: 'Books', amount: 25 }
        ];

        for (const expense of expenses) {
            await expenseTracker.addExpense(expense.name, expense.amount);
        }

        const itemCount = await expenseTracker.getExpenseItems();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('should not add expense with empty fields', async () => {
        const initialCount = await expenseTracker.getExpenseItems();

        await expenseTracker.addButton.click();

        const finalCount = await expenseTracker.getExpenseItems();
        expect(finalCount).toBe(initialCount);
    });

    test('should display expense list correctly', async () => {
        await expenseTracker.addExpense('Test Expense', 100);

        await expect(expenseTracker.expenseList).toBeVisible();

        const itemCount = await expenseTracker.getExpenseItems();
        expect(itemCount).toBeGreaterThan(0);
    });
});
