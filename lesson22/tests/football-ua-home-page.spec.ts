import { test, expect } from '../src/fixtures/football-fixtures';
import { epic, feature, story, severity, tag, description } from 'allure-js-commons';

test.describe('Football.ua home page', () => {
    test.beforeEach(async ({ homePage }) => {
        await epic('Football.ua Web Application');
        await feature('Home Page');
        await homePage.goto();
    });

    test('should display international navigation links', async ({ homePage }) => {
        await story('Navigation');
        await severity('critical');
        await tag('@smoke');
        await tag('@navigation');
        await description('Verify that all international navigation links are displayed on the home page');

        const expectedLinks = ['УКРАЇНА', 'АНГЛІЯ', 'ІСПАНІЯ', 'ІТАЛІЯ', 'НІМЕЧЧИНА'];

        for (const linkLabel of expectedLinks) {
            const navLink = homePage.header.getNavLink(linkLabel);
            await expect(navLink.getLocator(), `Missing nav link: ${linkLabel}`).toBeVisible();
        }
    });

    test('should display hero section with article links', async ({ homePage }) => {
        await story('Hero Section');
        await severity('normal');
        await tag('@hero');
        await tag('@articles');
        await description('Verify that hero section displays article links with valid titles');

        await expect(await homePage.hero.isVisible()).toBe(true);

        const titles = await homePage.hero.getArticleTitles(3);
        expect(titles.length, 'Hero block should have at least one article').toBeGreaterThan(0);

        for (const title of titles) {
            expect(title.length, 'Article title should not be empty').toBeGreaterThan(0);
        }
    });

    test('should open article page when clicking hero article', async ({ homePage, page }) => {
        await story('Article Navigation');
        await severity('critical');
        await tag('@hero');
        await tag('@navigation');
        await tag('@e2e');
        await description('Verify that clicking on a hero article navigates to the correct article page');

        const clickedTitle = await homePage.hero.clickArticleByIndex(0);
        expect(clickedTitle.length, 'Clicked article should have a title').toBeGreaterThan(0);

        await expect(page).toHaveURL(/football\.ua\//);

        const articleHeading = page.getByRole('heading', { level: 1 }).first();
        await expect(articleHeading).toBeVisible();

        const headingText = (await articleHeading.innerText()).trim();
        expect(headingText.length, 'Article heading should not be empty').toBeGreaterThan(0);
    });

    test('should display match center with fixtures', async ({ homePage }) => {
        await story('Match Center');
        await severity('critical');
        await tag('@smoke');
        await tag('@matches');
        await description('Verify that match center displays valid fixture data including teams, time, and scores');

        await expect(await homePage.matchCenter.isVisible()).toBe(true);

        const rowCount = await homePage.matchCenter.getMatchRowsCount();
        expect(rowCount, 'Match center should have at least one match row').toBeGreaterThan(0);

        const matchData = await homePage.matchCenter.getMatchData();

        expect(matchData.time, 'Match time should be in valid format').toMatch(/\d{1,2}:\d{2}|--:--/);
        expect(matchData.home, 'Home team should not be empty').not.toEqual('');
        expect(matchData.away, 'Away team should not be empty').not.toEqual('');
        expect(matchData.score, 'Score should be in valid format').toMatch(/\d+:\d+|-:-/);
        expect(typeof matchData.competition).toBe('string');
    });

    test('should verify match center displays team names correctly', async ({ homePage }) => {
        await story('Match Center');
        await severity('normal');
        await tag('@matches');
        await tag('@validation');
        await description('Verify that match center displays distinct team names with proper formatting');

        const matchData = await homePage.matchCenter.getMatchData();

        expect(matchData.home.length, 'Home team name should have reasonable length').toBeGreaterThan(1);
        expect(matchData.away.length, 'Away team name should have reasonable length').toBeGreaterThan(1);

        expect(matchData.home, 'Home and away teams should be different').not.toEqual(matchData.away);
        expect(matchData.home, 'Home and away teams should be different').not.toEqual(matchData.away);
    });

    test('should load all page components successfully', async ({ homePage }) => {
        await story('Page Load');
        await severity('blocker');
        await tag('@smoke');
        await tag('@components');
        await description('Verify that all critical page components load successfully');

        await homePage.waitForPageReady();

        const headerVisible = await homePage.header.getNavLink('УКРАЇНА').isVisible();
        const heroVisible = await homePage.hero.isVisible();
        const matchCenterVisible = await homePage.matchCenter.isVisible();

        expect(headerVisible, 'Header should be visible').toBe(true);
        expect(heroVisible, 'Hero section should be visible').toBe(true);
        expect(matchCenterVisible, 'Match center should be visible').toBe(true);
    });
});
