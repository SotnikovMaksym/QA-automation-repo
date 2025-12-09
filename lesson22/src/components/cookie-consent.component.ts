import { Page } from '@playwright/test';
import { BaseComponent } from './base-component';
import { WebElement } from '../elements/web-element';

export class CookieConsentComponent extends BaseComponent {
    public constructor(page: Page) {
        super(page);
    }

    private getConsentButton(): WebElement {
        const locator = this.page.getByRole('button', { name: /Згоден|Got it|Прийняти/i }).first();
        return new WebElement(this.page, locator);
    }

    public async acceptIfPresent(): Promise<void> {
        const button = this.getConsentButton();

        try {
            const isVisible = await button.isVisible();
            if (isVisible) {
                await button.click();
            }
        } catch {
            return;
        }
    }

    public async waitForReady(): Promise<void> {
        await Promise.resolve();
    }
}
