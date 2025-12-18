import type { Page, Locator } from '@playwright/test';

export class ExpenseTrackerPage {
    public readonly page: Page;
    public readonly expenseInput: Locator;
    public readonly amountInput: Locator;
    public readonly addButton: Locator;
    public readonly expenseList: Locator;
    public readonly totalBalance: Locator;
    public readonly totalIncome: Locator;
    public readonly totalExpense: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.expenseInput = page.locator('input[type="text"]').first();
        this.amountInput = page.locator('input[type="number"]').first();
        this.addButton = page.locator('button[type="submit"], button').first();
        this.expenseList = page.locator('ul, .list, [class*="transaction"]').first();
        this.totalBalance = page
            .locator('h1, h2, h3')
            .filter({ hasText: /balance/i })
            .first();
        this.totalIncome = page
            .locator('h2, h3, h4')
            .filter({ hasText: /income/i })
            .first();
        this.totalExpense = page
            .locator('h2, h3, h4')
            .filter({ hasText: /expense/i })
            .first();
    }

    public async goto(): Promise<void> {
        const baseURL = process.env.BASE_URL || 'http://localhost:3000';
        await this.page.goto(baseURL);
        await this.page.waitForLoadState('networkidle');
    }

    public async addExpense(name: string, amount: number): Promise<void> {
        await this.expenseInput.fill(name);
        await this.amountInput.fill(amount.toString());
        await this.addButton.click();
    }

    public async getExpenseItems(): Promise<number> {
        return await this.expenseList.locator('li, div').count();
    }

    public async isExpenseVisible(name: string): Promise<boolean> {
        return await this.page.locator(`:text("${name}")`).isVisible();
    }

    public async deleteExpense(name: string): Promise<void> {
        const expenseRow = this.page.locator(`:has-text("${name}")`).first();
        const deleteButton = expenseRow.locator('button:has-text("Delete"), button:has-text("×")').first();
        await deleteButton.click();
    }
}
