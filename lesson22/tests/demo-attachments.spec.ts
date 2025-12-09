import { test, expect } from '../src/fixtures/football-fixtures';
import { epic, feature, story, severity, tag, description } from 'allure-js-commons';

test.describe('Allure Attachments Demo', () => {
    test('should demonstrate attachments on failure', async ({ page }) => {
        await epic('Football.ua Web Application');
        await feature('Test Demo');
        await story('Attachment Demo');
        await severity('normal');
        await tag('@demo');
        await tag('@attachments');
        await description('This test intentionally fails to demonstrate automatic attachments');

        await page.goto('https://football.ua/');

        await page.evaluate(() => {
            console.log('Test is running');
            console.warn('This is a warning message');
            console.error('This is an error message');
        });

        await page.waitForTimeout(2000);

        await expect(page.locator('body')).toContainText('This text does not exist - FAIL');
    });
});
