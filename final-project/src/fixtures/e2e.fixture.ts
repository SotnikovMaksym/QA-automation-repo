import { test as base, expect } from '@playwright/test';
import { ExpensesPage } from '../pages/expenses.page';
import { IncomesPage } from '../pages/incomes.page';

interface E2EFixtures {
    expensesPage: ExpensesPage;
    incomesPage: IncomesPage;
}

export const test = base.extend<E2EFixtures>({
    expensesPage: async ({ page }, use) => {
        const expensesPage = new ExpensesPage(page);
        await use(expensesPage);
    },

    incomesPage: async ({ page }, use) => {
        const incomesPage = new IncomesPage(page);
        await use(incomesPage);
    }
});

export { expect };
