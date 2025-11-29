import { Page } from '@playwright/test';

export abstract class BaseComponent {
    public constructor(protected readonly page: Page) {}

    public getPage(): Page {
        return this.page;
    }

    public abstract waitForReady(): Promise<void>;
}
