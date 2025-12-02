import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

export class HeroComponent extends BaseComponent {
    private readonly sectionLocator: Locator;

    public constructor(page: Page) {
        super(page);
        this.sectionLocator = this.getSectionByHeading(/ГОЛОВНЕ ЗА ДОБУ/i);
    }

    private getSectionByHeading(heading: RegExp): Locator {
        const headingLocator = this.page.getByRole('heading', { name: heading }).first();
        return this.page.locator('section').filter({ has: headingLocator }).first();
    }

    private getArticleLinks(): Locator {
        return this.sectionLocator.getByRole('link').filter({ hasText: /./ });
    }

    private getArticleByIndex(index: number): Locator {
        return this.getArticleLinks().nth(index);
    }

    public async getArticleTitles(limit = 5): Promise<string[]> {
        const articleLinks = this.getArticleLinks();
        const count = await articleLinks.count();
        const titles: string[] = [];
        const sliceEnd = Math.min(limit, count);

        for (let i = 0; i < sliceEnd; i++) {
            const text = await articleLinks.nth(i).innerText();
            if (text?.trim()) {
                titles.push(text.trim());
            }
        }

        return titles;
    }

    public async clickArticleByIndex(index: number): Promise<string> {
        const article = this.getArticleByIndex(index);
        const title = await article.innerText();
        await article.click();
        return title.trim();
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
