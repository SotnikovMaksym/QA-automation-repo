import { Locator, Page } from '@playwright/test';

export class WebElement {
    protected readonly locator: Locator;

    public constructor(
        protected readonly page: Page,
        locator: Locator
    ) {
        this.locator = locator;
    }

    public getLocator(): Locator {
        return this.locator;
    }

    public async click(): Promise<void> {
        await this.locator.click();
    }

    public async getText(): Promise<string> {
        const text = await this.locator.innerText();
        return text.trim();
    }

    public async getAllTexts(): Promise<string[]> {
        const count = await this.locator.count();
        const texts: string[] = [];

        for (let i = 0; i < count; i++) {
            const text = await this.locator.nth(i).innerText();
            if (text?.trim()) {
                texts.push(text.trim());
            }
        }

        return texts;
    }

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async waitForVisible(timeout?: number): Promise<void> {
        await this.locator.waitFor({ state: 'visible', timeout });
    }

    public async getAttribute(name: string): Promise<string | null> {
        return await this.locator.getAttribute(name);
    }

    public nth(index: number): WebElement {
        return new WebElement(this.page, this.locator.nth(index));
    }

    public async count(): Promise<number> {
        return await this.locator.count();
    }

    public async fill(value: string): Promise<void> {
        await this.locator.fill(value);
    }

    public async inputValue(): Promise<string> {
        return await this.locator.inputValue();
    }

    public async isEnabled(): Promise<boolean> {
        return await this.locator.isEnabled();
    }

    public async hover(): Promise<void> {
        await this.locator.hover();
    }
}
