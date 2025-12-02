import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

export class HeaderComponent extends BaseComponent {
    public constructor(page: Page) {
        super(page);
    }

    public getNavLink(label: string): Locator {
        return this.page
            .getByRole('link', {
                name: new RegExp(`^${label}$`, 'i')
            })
            .first();
    }

    private getAllNavLinks(): Locator {
        return this.page.locator('nav a, header a').filter({ hasText: /./ });
    }

    public async waitForReady(): Promise<void> {
        await this.page.locator('header, nav').first().waitFor({ state: 'visible' });
    }

    public async getNavLinkText(label: string): Promise<string> {
        const text = await this.getNavLink(label).innerText();
        return text.trim();
    }

    public async getAllNavLinkTexts(): Promise<string[]> {
        return await this.getAllNavLinks().allInnerTexts();
    }
}
