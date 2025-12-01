import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

export interface MatchRowData {
    competition: string;
    time: string;
    home: string;
    score: string;
    away: string;
}

export class MatchCenterComponent extends BaseComponent {
    private readonly sectionLocator: Locator;

    public constructor(page: Page) {
        super(page);
        this.sectionLocator = this.getSectionByHeading(/МАТЧ-ЦЕНТР/i);
    }

    private getSectionByHeading(heading: RegExp): Locator {
        const headingLocator = this.page.getByRole('heading', { name: heading }).first();
        return this.page.locator('section').filter({ has: headingLocator }).first();
    }

    private getMatchRows(): Locator {
        return this.sectionLocator.locator('tbody tr');
    }

    private getMatchRowByIndex(index: number): Locator {
        return this.getMatchRows().nth(index);
    }

    public async getMatchRowsCount(): Promise<number> {
        return await this.getMatchRows().count();
    }

    public async getMatchData(rowIndex = 0): Promise<MatchRowData> {
        const totalRows = await this.getMatchRowsCount();
        let currentCompetition = '';

        const competitionHeader = this.sectionLocator.locator('.match-header').first();
        const headerCount = await competitionHeader.count();
        if (headerCount > 0) {
            currentCompetition = (await competitionHeader.textContent()) || '';
            currentCompetition = currentCompetition.trim();
        }

        for (let index = 0; index < totalRows; index++) {
            const row = this.getMatchRowByIndex(index);
            const cells = row.locator('td');
            const cellCount = await cells.count();

            if (cellCount === 1) {
                const text = await cells.nth(0).innerText();
                currentCompetition = text.trim();
                continue;
            }

            if (index < rowIndex) {
                continue;
            }

            if (cellCount < 4) {
                continue;
            }

            const hasCompetitionColumn = cellCount >= 5;
            const offset = hasCompetitionColumn ? 1 : 0;

            const competition = hasCompetitionColumn ? (await cells.nth(0).innerText()).trim() : currentCompetition;
            const time = (await cells.nth(offset + 0).innerText()).trim();
            const home = (await cells.nth(offset + 1).innerText()).trim();
            const score = (await cells.nth(offset + 2).innerText()).trim();
            const away = (await cells.nth(offset + 3).innerText()).trim();

            return { competition, time, home, score, away };
        }

        throw new Error('Match Centre table does not contain a usable fixture row.');
    }

    public getSection(): Locator {
        return this.sectionLocator;
    }

    public async waitForReady(): Promise<void> {
        await this.sectionLocator.waitFor({ state: 'visible' });
    }

    public async isVisible(): Promise<boolean> {
        return await this.sectionLocator.isVisible();
    }
}
