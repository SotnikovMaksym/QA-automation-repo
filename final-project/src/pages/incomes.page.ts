import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class IncomesPage extends BasePage {
    private readonly pageHeading: Locator;
    private readonly addIncomeButton: Locator;
    private readonly modal: Locator;

    public constructor(page: Page) {
        super(page);

        this.pageHeading = page
            .locator('h1, h2, h3')
            .filter({ hasText: /прибутки|incomes|дохід/i })
            .first();

        this.addIncomeButton = page
            .locator(
                [
                    'button:has-text("Додати")',
                    'button:has-text("додати")',
                    'button:has-text("Add")',
                    'button:has-text("Create")',
                    'a:has-text("Додати")',
                    '[data-testid="add-income"]',
                    '.add-income-btn'
                ].join(', ')
            )
            .first();

        this.modal = page.locator(['dialog[open]', '.modal.show', '[role="dialog"]', '.modal-content'].join(', ')).first();
    }

    public async open(): Promise<void> {
        await this.goto('/incomes');
        await this.waitForIncomesPageLoad();
    }

    private async waitForIncomesPageLoad(): Promise<void> {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            await this.addIncomeButton.waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    public async clickAddIncome(): Promise<void> {
        await this.waitForElement(this.addIncomeButton);
        await this.clickElement(this.addIncomeButton);
        await this.waitForModal();
    }

    private async waitForModal(): Promise<void> {
        try {
            await this.modal.waitFor({ state: 'visible', timeout: 5000 });
        } catch {
            // No modal detected
        }
    }

    public async fillIncomeForm(data: {
        date: string;
        currency?: string;
        amount: string;
        comment: string;
        isCash?: boolean;
    }): Promise<void> {
        await this.page.locator('#date').fill(data.date);

        if (data.currency) {
            await this.page.locator('#currency').selectOption(data.currency);
        }

        await this.page.locator('#amount').fill(data.amount);
        await this.page.locator('#comment').fill(data.comment);

        if (data.isCash) {
            const cashCheckbox = this.page.locator('input[type="checkbox"]').nth(1);
            await cashCheckbox.check();
        }
    }

    public async submitIncomeForm(): Promise<void> {
        const modal = this.page.locator('.modal-content, [role="dialog"]').first();
        const submitButton = modal
            .locator('button')
            .filter({ hasText: /зберегти|save|додати/i })
            .first();
        await submitButton.click();
    }

    public async isIncomeTableVisible(): Promise<boolean> {
        const table = this.page.locator('table, .table, .incomes-list').first();
        try {
            await expect(table).toBeVisible({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    public async filterByYear(year?: number): Promise<void> {
        const yearButton = this.page
            .locator('button')
            .filter({ hasText: /всі роки|роки/i })
            .first();
        const isVisible = await yearButton.isVisible();

        if (!isVisible) {
            return;
        }

        await yearButton.click();

        const targetYear = year || new Date().getFullYear();
        const yearOption = this.page
            .locator('label, div, li')
            .filter({ hasText: new RegExp(targetYear.toString()) })
            .first();

        const optionVisible = await yearOption.isVisible({ timeout: 3000 });
        if (optionVisible) {
            await yearOption.click();
        }
    }
}
