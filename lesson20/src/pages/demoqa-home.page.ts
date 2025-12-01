import { Page, Locator } from '@playwright/test';

export class DemoQAHomePage {
    public constructor(private page: Page) {}

    public async navigate(): Promise<void> {
        await this.page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });
    }

    public getHeader(): Locator {
        return this.page.locator('.main-header, .home-banner, img[src*="Toolsqa"]').first();
    }

    public getCategoryCards(): Locator {
        return this.page.locator('.card-body, .category-cards .card');
    }

    public async clickCategoryCard(category: string): Promise<void> {
        const card = this.page.locator('.card').filter({ hasText: category }).first();
        await card.scrollIntoViewIfNeeded();
        await card.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async waitForElementsPage(): Promise<void> {
        await this.page.waitForURL('**/elements');
    }

    public async waitForFormsPage(): Promise<void> {
        await this.page.waitForURL('**/forms');
    }

    public getPageUrl(): string {
        return this.page.url();
    }

    public getPageHeading(): Locator {
        return this.page.locator('.main-header, h1, .text-center').first();
    }
}
