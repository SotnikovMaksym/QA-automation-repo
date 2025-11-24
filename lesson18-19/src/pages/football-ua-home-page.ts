import { Locator, Page } from '@playwright/test';

export interface MatchRowSnapshot {
    competition: string;
    time: string;
    home: string;
    score: string;
    away: string;
}

export class FootballUaHomePage {
    public readonly url = 'https://football.ua/';

    public constructor(private readonly page: Page) {}

    private get main(): Locator {
        return this.page.locator('main');
    }

    private get body(): Locator {
        return this.page.locator('body');
    }

    private get cookieConsentButton(): Locator {
        return this.page.getByRole('button', { name: /Згоден|Got it|Прийняти/i }).first();
    }

    private sectionByHeading(heading: RegExp): Locator {
        const headingLocator = this.page.getByRole('heading', { name: heading }).first();
        return this.page.locator('section').filter({ has: headingLocator }).first();
    }

    public topNavLink(label: string): Locator {
        return this.page.getByRole('link', { name: new RegExp(`^${label}$`, 'i') }).first();
    }

    public get heroSection(): Locator {
        return this.sectionByHeading(/ГОЛОВНЕ ЗА ДОБУ/i);
    }

    public get heroArticleLinks(): Locator {
        return this.heroSection.getByRole('link').filter({ hasText: /./ });
    }

    public get matchCenterSection(): Locator {
        return this.sectionByHeading(/МАТЧ-ЦЕНТР/i);
    }

    public get matchCenterRows(): Locator {
        return this.matchCenterSection.locator('tbody tr');
    }

    public get videoSection(): Locator {
        return this.sectionByHeading(/ВІДЕО/i);
    }

    public get videoCards(): Locator {
        return this.videoSection.getByRole('link');
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle').catch(() => undefined);
        await this.body.waitFor();
        await this.acceptCookiesIfPresent();
    }

    public async acceptCookiesIfPresent(): Promise<void> {
        const consentButton = this.cookieConsentButton;
        if (await consentButton.isVisible().catch(() => false)) {
            await consentButton.click();
        }
    }

    public async getHeroArticleTitles(limit = 5): Promise<string[]> {
        const titles: string[] = [];
        const total = await this.heroArticleLinks.count();
        const sliceEnd = Math.min(limit, total);
        for (let index = 0; index < sliceEnd; index += 1) {
            const text = await this.heroArticleLinks.nth(index).innerText();
            if (text?.trim()) {
                titles.push(text.trim());
            }
        }
        return titles;
    }

    public async openHeroArticleByIndex(index = 0): Promise<string> {
        const link = this.heroArticleLinks.nth(index);
        const title = (await link.innerText())?.trim() ?? '';
        await link.click();
        return title;
    }

    public async getMatchRowSnapshot(rowIndex = 0): Promise<MatchRowSnapshot> {
        const totalRows = await this.matchCenterRows.count();
        let currentCompetition = '';
        for (let index = rowIndex; index < totalRows; index += 1) {
            const row = this.matchCenterRows.nth(index);
            const cells = row.locator('td');
            const cellCount = await cells.count();
            if (cellCount === 1) {
                currentCompetition = ((await cells.nth(0).innerText()) ?? '').trim();
                continue;
            }
            if (cellCount < 4) {
                continue;
            }
            const hasCompetitionColumn = cellCount >= 5;
            const offset = hasCompetitionColumn ? 1 : 0;
            return {
                competition: hasCompetitionColumn
                    ? ((await cells.nth(0).innerText()) ?? '').trim()
                    : currentCompetition,
                time: ((await cells.nth(offset + 0).innerText()) ?? '').trim(),
                home: ((await cells.nth(offset + 1).innerText()) ?? '').trim(),
                score: ((await cells.nth(offset + 2).innerText()) ?? '').trim(),
                away: ((await cells.nth(offset + 3).innerText()) ?? '').trim()
            };
        }
        throw new Error('Match Centre table does not contain a usable fixture row.');
    }
}
