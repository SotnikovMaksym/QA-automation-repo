import { test as base } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { FootballUaHomePage } from '../pages/football-ua-home-page';

interface FootballFixtures {
    homePage: FootballUaHomePage;
}

export const test = base.extend<FootballFixtures>({
    page: async ({ page }, use, testInfo) => {
        const consoleMessages: string[] = [];
        page.on('console', (msg) => {
            consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
        });

        const pageErrors: string[] = [];
        page.on('pageerror', (error) => {
            pageErrors.push(error.message);
        });

        await use(page);

        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot({ fullPage: true, timeout: 5000 }).catch(() => null);
            if (screenshot) {
                await attachment('Screenshot on failure', screenshot, 'image/png');
            }

            try {
                const html = await page.content();
                await attachment('Page HTML', html, 'text/html');
            } catch {
                void 0;
            }

            if (consoleMessages.length > 0) {
                await attachment('Console logs', consoleMessages.join('\n'), 'text/plain');
            }

            if (pageErrors.length > 0) {
                await attachment('Page errors', pageErrors.join('\n'), 'text/plain');
            }

            try {
                await attachment('Current URL', page.url(), 'text/plain');
            } catch {
                void 0;
            }
        }
    },

    homePage: async ({ page }, use) => {
        const homePage = new FootballUaHomePage(page);
        await use(homePage);
    }
});

export { expect } from '@playwright/test';
