import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(path = ''): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await this.waitForPageLoad();
    }

    public async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async clickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 15000 });
        await locator.click({ timeout: 15000 });
    }

    public async fillInput(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 15000 });
        await locator.clear();
        await locator.fill(value);
    }

    public async getElementText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: 15000 });
        return (await locator.textContent()) || '';
    }

    public async isVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return await locator.isVisible();
        } catch {
            return false;
        }
    }

    protected async waitForElement(locator: Locator, timeout = 15000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.waitFor({ state: 'attached', timeout });
    }
}
