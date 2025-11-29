import { test as base } from '@playwright/test';
import { FootballUaHomePage } from '../pages/football-ua-home-page';

interface FootballFixtures {
    homePage: FootballUaHomePage;
}

export const test = base.extend<FootballFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new FootballUaHomePage(page);
        await use(homePage);
    }
});

export { expect } from '@playwright/test';
