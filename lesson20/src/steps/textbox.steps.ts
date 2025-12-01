import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DemoQATextBoxPage } from '../pages/demoqa-textbox.page';

Given('I open DemoQA text box page', async function (this: CustomWorld) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    await textBoxPage.navigate();
});

When('I fill {string} with {string}', async function (this: CustomWorld, fieldName: string, value: string) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    await textBoxPage.fillField(fieldName, value);
});

When('I click Submit button', async function (this: CustomWorld) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    await textBoxPage.clickSubmit();
});

Then('I should see submitted output', async function (this: CustomWorld) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    await expect(textBoxPage.getOutput()).toBeVisible();
});

Then('output should contain {string}', async function (this: CustomWorld, text: string) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    await expect(textBoxPage.getOutput()).toContainText(text);
});

Then('email field should show validation error', async function (this: CustomWorld) {
    const textBoxPage = new DemoQATextBoxPage(this.page!);
    const hasError = await textBoxPage.hasValidationError();
    expect(hasError).toBeTruthy();
});
