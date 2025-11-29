import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../features/support/world';

Given('I open DemoQA text box page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    await this.page.goto('https://demoqa.com/text-box', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForTimeout(2000);
});

When('I fill {string} with {string}', async function (this: CustomWorld, fieldName: string, value: string) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }

    let selector: string;
    switch (fieldName) {
        case 'Full Name':
            selector = '#userName';
            break;
        case 'Email':
            selector = '#userEmail';
            break;
        case 'Current Address':
            selector = '#currentAddress';
            break;
        case 'Permanent Address':
            selector = '#permanentAddress';
            break;
        default:
            throw new Error(`Unknown field: ${fieldName}`);
    }

    await this.page.locator(selector).scrollIntoViewIfNeeded();
    await this.page.locator(selector).fill(value);
});

When('I click Submit button', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const submitButton = this.page.locator('#submit');
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();
    await this.page.waitForTimeout(1000);
});

Then('I should see submitted output', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const output = this.page.locator('#output').first();
    await expect(output).toBeVisible({ timeout: 10000 });
});

Then('output should contain {string}', async function (this: CustomWorld, text: string) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const output = this.page.locator('#output').first();
    await expect(output).toContainText(text, { timeout: 5000 });
});

Then('email field should show validation error', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Page is not initialized');
    }
    const emailField = this.page.locator('#userEmail');
    const fieldClass = await emailField.getAttribute('class');

    const hasError =
        fieldClass?.includes('error') ||
        fieldClass?.includes('field-error') ||
        (await emailField.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.borderColor.includes('255, 0, 0') || style.borderColor === 'rgb(255, 0, 0)';
        }));

    expect(hasError).toBeTruthy();
});
