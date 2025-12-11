import { Page } from '@playwright/test';
import { BaseComponent } from './base-component';
import { WebElement } from '../elements/web-element';

export interface MatchRowData {
    competition: string;
    time: string;
    home: string;
    score: string;
    away: string;
}

export class MatchCenterComponent extends BaseComponent {
    private readonly sectionLocator;

    public constructor(page: Page) {
        super(page);
        this.sectionLocator = this.getSectionByHeading(/МАТЧ-ЦЕНТР/i);
    }

    private getSectionByHeading(heading: RegExp): ReturnType<Page['locator']> {
        const headingLocator = this.page.getByRole('heading', { name: heading }).first();
        return this.page.locator('section').filter({ has: headingLocator }).first();
    }

    public getMatchRows(): WebElement {
        const locator = this.sectionLocator.locator('tbody tr');
        return new WebElement(this.page, locator);
    }

    public getMatchRowByIndex(index: number): WebElement {
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
            const cells = new WebElement(this.page, row.getLocator().locator('td'));
            const cellCount = await cells.count();

            if (cellCount === 1) {
                currentCompetition = await cells.nth(0).getText();
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

            return {
                competition: hasCompetitionColumn ? await cells.nth(0).getText() : currentCompetition,
                time: await cells.nth(offset + 0).getText(),
                home: await cells.nth(offset + 1).getText(),
                score: await cells.nth(offset + 2).getText(),
                away: await cells.nth(offset + 3).getText()
            };
        }

        throw new Error('Match Centre table does not contain a usable fixture row.');
    }

    public async waitForReady(): Promise<void> {
        await this.sectionLocator.waitFor({ state: 'visible' });
    }

    public async isVisible(): Promise<boolean> {
        return await this.sectionLocator.isVisible();
    }
}
