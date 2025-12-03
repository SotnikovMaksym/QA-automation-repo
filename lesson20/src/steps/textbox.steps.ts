import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I open DemoQA text box page', async function (this: CustomWorld) {
    await this.textBoxPage!.navigate();
});

When('I fill {string} with {string}', async function (this: CustomWorld, fieldName: string, value: string) {
    await this.textBoxPage!.fillField(fieldName, value);
});

When('I click Submit button', async function (this: CustomWorld) {
    await this.textBoxPage!.clickSubmit();
});

Then('I should see submitted output', async function (this: CustomWorld) {
    await expect(this.textBoxPage!.getOutput()).toBeVisible();
});

Then('output should contain {string}', async function (this: CustomWorld, text: string) {
    await expect(this.textBoxPage!.getOutput()).toContainText(text);
});

Then('email field should show validation error', async function (this: CustomWorld) {
    const hasError = await this.textBoxPage!.hasValidationError();
    expect(hasError).toBeTruthy();
});
