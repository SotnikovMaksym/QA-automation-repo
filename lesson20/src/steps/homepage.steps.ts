import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DemoQAHomePage } from '../pages/demoqa-home.page';

Given('I open DemoQA homepage', async function (this: CustomWorld) {
    const homePage = new DemoQAHomePage(this.page!);
    await homePage.navigate();
});

Then('I should see the main header', async function (this: CustomWorld) {
    const homePage = new DemoQAHomePage(this.page!);
    await expect(homePage.getHeader()).toBeVisible();
});

Then('I should see {int} category cards displayed', async function (this: CustomWorld, count: number) {
    const homePage = new DemoQAHomePage(this.page!);
    await expect(homePage.getCategoryCards()).toHaveCount(count);
});

When('I click on {string} category card', async function (this: CustomWorld, category: string) {
    const homePage = new DemoQAHomePage(this.page!);
    await homePage.clickCategoryCard(category);
});

Then('I should be on Elements page', async function (this: CustomWorld) {
    const homePage = new DemoQAHomePage(this.page!);
    await homePage.waitForElementsPage();
    await expect(homePage.getPageHeading()).toBeVisible();
});

Then('I should be on Forms page', async function (this: CustomWorld) {
    const homePage = new DemoQAHomePage(this.page!);
    await homePage.waitForFormsPage();
});

Then('the page URL should contain {string}', function (this: CustomWorld, urlPart: string) {
    const homePage = new DemoQAHomePage(this.page!);
    expect(homePage.getPageUrl()).toContain(urlPart);
});
