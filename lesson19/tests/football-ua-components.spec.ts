import { test, expect } from '../src/fixtures/football-fixtures';

test.describe('Football.ua Components', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('should display all navigation links in header', async ({ homePage }) => {
        const headerComponent = homePage.header;

        const links = ['УКРАЇНА', 'АНГЛІЯ', 'ІСПАНІЯ'];
        for (const link of links) {
            await expect(headerComponent.getNavLink(link), `${link} navigation link should be visible`).toBeVisible();
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

        await expect(matchCenter.getSection()).toBeVisible();

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

        await expect(homePage.header.getNavLink('УКРАЇНА')).toBeVisible();
        await expect(homePage.hero.getSection()).toBeVisible();
        await expect(homePage.matchCenter.getSection()).toBeVisible();
    });

    test('should access navigation link directly through component', async ({ homePage }) => {
        const navLink = homePage.header.getNavLink('УКРАЇНА');

        await expect(navLink).toBeVisible();

        const text = await homePage.header.getNavLinkText('УКРАЇНА');
        expect(text).toContain('УКРАЇНА');
    });
});
