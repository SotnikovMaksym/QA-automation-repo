import { Page } from '@playwright/test';
import { BaseComponent } from './base-component';
import { WebElement } from '../elements/web-element';

export class HeroComponent extends BaseComponent {
    private readonly sectionLocator;

    public constructor(page: Page) {
        super(page);
        this.sectionLocator = this.getSectionByHeading(/ГОЛОВНЕ ЗА ДОБУ/i);
    }

    private getSectionByHeading(heading: RegExp): ReturnType<Page['locator']> {
        const headingLocator = this.page.getByRole('heading', { name: heading }).first();
        return this.page.locator('section').filter({ has: headingLocator }).first();
    }

    public getArticleLinks(): WebElement {
        const locator = this.sectionLocator.getByRole('link').filter({ hasText: /./ });
        return new WebElement(this.page, locator);
    }

    public getArticleByIndex(index: number): WebElement {
        return this.getArticleLinks().nth(index);
    }

    public async getArticleTitles(limit = 5): Promise<string[]> {
        const articleLinks = this.getArticleLinks();
        const count = await articleLinks.count();
        const titles: string[] = [];
        const sliceEnd = Math.min(limit, count);

        for (let i = 0; i < sliceEnd; i++) {
            const text = await articleLinks.nth(i).getText();
            if (text) {
                titles.push(text);
            }
        }

        return titles;
    }

    public async clickArticleByIndex(index: number): Promise<string> {
        const article = this.getArticleByIndex(index);
        const title = await article.getText();
        await article.click();
        return title;
    }

    public async waitForReady(): Promise<void> {
        await this.sectionLocator.waitFor({ state: 'visible' });
    }

    public async isVisible(): Promise<boolean> {
        return await this.sectionLocator.isVisible();
    }
}
