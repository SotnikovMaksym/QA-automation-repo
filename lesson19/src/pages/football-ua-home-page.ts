import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { HeroComponent } from '../components/hero.component';
import { MatchCenterComponent, MatchRowData } from '../components/match-center.component';
import { CookieConsentComponent } from '../components/cookie-consent.component';

export class FootballUaHomePage {
    public readonly url = 'https://football.ua/';

    public readonly header: HeaderComponent;
    public readonly hero: HeroComponent;
    public readonly matchCenter: MatchCenterComponent;
    private readonly cookieConsent: CookieConsentComponent;

    public constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
        this.hero = new HeroComponent(page);
        this.matchCenter = new MatchCenterComponent(page);
        this.cookieConsent = new CookieConsentComponent(page);
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
        await this.cookieConsent.acceptIfPresent();
    }

    public async getHeroArticleTitles(limit = 5): Promise<string[]> {
        return await this.hero.getArticleTitles(limit);
    }

    public async openHeroArticleByIndex(index = 0): Promise<string> {
        return await this.hero.clickArticleByIndex(index);
    }

    public async getMatchRowSnapshot(rowIndex = 0): Promise<MatchRowData> {
        return await this.matchCenter.getMatchData(rowIndex);
    }

    public async waitForPageReady(): Promise<void> {
        await Promise.all([this.header.waitForReady(), this.hero.waitForReady(), this.matchCenter.waitForReady()]);
    }
}
