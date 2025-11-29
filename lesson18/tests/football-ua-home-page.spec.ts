import { test, expect } from '@playwright/test';
import { FootballUaHomePage } from '../src/pages/football-ua-home-page';

test.describe('Football.ua home page', () => {
    let homePage: FootballUaHomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new FootballUaHomePage(page);
        await homePage.goto();
    });

    test('renders international navigation shortcuts', async () => {
        const expectedLinks = ['УКРАЇНА', 'АНГЛІЯ', 'ІСПАНІЯ', 'ІТАЛІЯ', 'НІМЕЧЧИНА'];
        for (const linkLabel of expectedLinks) {
            await expect(homePage.topNavLink(linkLabel), `Missing nav link: ${linkLabel}`).toBeVisible();
        }
    });

    test('hero block opens full article pages', async ({ page }) => {
        const titles = await homePage.getHeroArticleTitles(3);
        expect(titles.length, 'Hero block should expose at least one article link').toBeGreaterThan(0);

        const clickedTitle = await homePage.openHeroArticleByIndex(0);
        expect(clickedTitle.length).toBeGreaterThan(0);
        await expect(page).toHaveURL(/football\.ua\//);

        const articleHeading = page.getByRole('heading', { level: 1 }).first();
        await expect(articleHeading).toBeVisible();
        const headingText = ((await articleHeading.innerText()) ?? '').trim();
        expect(headingText.length).toBeGreaterThan(0);
    });

    test('match centre lists fixtures with kickoff time and clubs', async () => {
        await expect(homePage.matchCenterSection).toBeVisible();
        const rowCount = await homePage.matchCenterRows.count();
        expect(rowCount).toBeGreaterThan(0);

        const snapshot = await homePage.getMatchRowSnapshot();
        expect(snapshot.time).toMatch(/\d{1,2}:\d{2}|--:--/);
        expect(snapshot.home).not.toEqual('');
        expect(snapshot.away).not.toEqual('');
        expect(snapshot.score).toMatch(/\d+:\d+|-:-/);
    });
});
