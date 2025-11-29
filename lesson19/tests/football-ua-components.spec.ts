import { test, expect } from '../src/fixtures/football-fixtures';

test.describe('Football.ua Components', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('should display all navigation links in header', async ({ homePage }) => {
        const headerComponent = homePage.header;

        const links = ['УКРАЇНА', 'АНГЛІЯ', 'ІСПАНІЯ'];
        for (const link of links) {
            const isVisible = await headerComponent.isNavLinkVisible(link);
            expect(isVisible, `${link} navigation link should be visible`).toBe(true);
        }
    });

    test('should display hero articles with valid titles', async ({ homePage }) => {
        const heroComponent = homePage.hero;

        await heroComponent.waitForReady();

        const titles = await heroComponent.getArticleTitles(5);

        expect(titles.length).toBeGreaterThan(0);

        for (const title of titles) {
            expect(title.length).toBeGreaterThan(5);
        }
    });

    test('should display match center with valid fixture data', async ({ homePage }) => {
        const matchCenter = homePage.matchCenter;

        const isVisible = await matchCenter.isVisible();
        expect(isVisible).toBe(true);

        const matchData = await matchCenter.getMatchData();

        expect(matchData).toHaveProperty('competition');
        expect(matchData).toHaveProperty('home');
        expect(matchData).toHaveProperty('away');
        expect(matchData).toHaveProperty('time');
        expect(matchData).toHaveProperty('score');
        expect(matchData.competition.length).toBeGreaterThan(0);
    });

    test('should load all page components successfully', async ({ homePage }) => {
        await Promise.all([homePage.header.waitForReady(), homePage.hero.waitForReady(), homePage.matchCenter.waitForReady()]);

        const headerVisible = await homePage.header.isNavLinkVisible('УКРАЇНА');
        const heroVisible = await homePage.hero.isVisible();
        const matchCenterVisible = await homePage.matchCenter.isVisible();

        expect(headerVisible && heroVisible && matchCenterVisible).toBe(true);
    });

    test('should access navigation link through WebElement wrapper', async ({ homePage }) => {
        const navLink = homePage.header.getNavLink('УКРАЇНА');

        expect(await navLink.isVisible()).toBe(true);

        const locator = navLink.getLocator();
        await expect(locator).toBeVisible();

        const text = await navLink.getText();
        expect(text).toContain('УКРАЇНА');
    });
});
