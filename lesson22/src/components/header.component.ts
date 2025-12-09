import { Page } from '@playwright/test';
import { BaseComponent } from './base-component';
import { WebElement } from '../elements/web-element';

export class HeaderComponent extends BaseComponent {
    public constructor(page: Page) {
        super(page);
    }

    public getNavLink(label: string): WebElement {
        const locator = this.page
            .getByRole('link', {
                name: new RegExp(`^${label}$`, 'i')
            })
            .first();
        return new WebElement(this.page, locator);
    }

    public getAllNavLinks(): WebElement {
        const locator = this.page.locator('nav a, header a').filter({ hasText: /./ });
        return new WebElement(this.page, locator);
    }

    public async waitForReady(): Promise<void> {
        await this.page.locator('header, nav').first().waitFor({ state: 'visible' });
    }

    public async isNavLinkVisible(label: string): Promise<boolean> {
        return await this.getNavLink(label).isVisible();
    }
}
