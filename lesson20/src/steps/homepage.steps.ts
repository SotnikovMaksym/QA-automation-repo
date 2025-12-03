import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I open DemoQA homepage', async function (this: CustomWorld) {
    await this.homePage!.navigate();
});

Then('I should see the main header', async function (this: CustomWorld) {
    await expect(this.homePage!.getHeader()).toBeVisible();
});

Then('I should see {int} category cards displayed', async function (this: CustomWorld, count: number) {
    await expect(this.homePage!.getCategoryCards()).toHaveCount(count);
});

When('I click on {string} category card', async function (this: CustomWorld, category: string) {
    await this.homePage!.clickCategoryCard(category);
});

Then('I should be on Elements page', async function (this: CustomWorld) {
    await this.homePage!.waitForElementsPage();
    await expect(this.homePage!.getPageHeading()).toBeVisible();
});

Then('I should be on Forms page', async function (this: CustomWorld) {
    await this.homePage!.waitForFormsPage();
});

Then('the page URL should contain {string}', function (this: CustomWorld, urlPart: string) {
    expect(this.homePage!.getPageUrl()).toContain(urlPart);
});
