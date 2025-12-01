import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

export class CookieConsentComponent extends BaseComponent {
    public constructor(page: Page) {
        super(page);
    }

    private getConsentButton(): Locator {
        return this.page.getByRole('button', { name: /Згоден|Got it|Прийняти/i }).first();
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
