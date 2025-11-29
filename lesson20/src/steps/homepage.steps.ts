import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../features/support/world';

Given('I open DemoQA homepage', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForTimeout(2000);
});

Then('I should see the main header', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const header = this.page.locator('.main-header, .home-banner, img[src*="Toolsqa"]').first();
    await expect(header).toBeVisible({ timeout: 15000 });
});

Then('I should see {int} category cards displayed', async function (this: CustomWorld, count: number) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const cards = this.page.locator('.card-body, .category-cards .card');
    await expect(cards).toHaveCount(count, { timeout: 15000 });
});

When('I click on {string} category card', async function (this: CustomWorld, category: string) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const card = this.page.locator('.card').filter({ hasText: category }).first();
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await this.page.waitForLoadState('domcontentloaded');
});

Then('I should be on Elements page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.waitForURL('**/elements', { timeout: 10000 });
    const heading = this.page.locator('.main-header, h1, .text-center').first();
    await expect(heading).toBeVisible();
});

Then('I should be on Forms page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.waitForURL('**/forms', { timeout: 10000 });
});

Then('the page URL should contain {string}', function (this: CustomWorld, urlPart: string) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    expect(this.page.url()).toContain(urlPart);
});
