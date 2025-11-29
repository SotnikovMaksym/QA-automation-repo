import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export class CustomWorld extends World {
    public browser?: Browser;
    public context?: BrowserContext;
    public page?: Page;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public async init(): Promise<void> {
        this.browser = await chromium.launch({
            headless: process.env.HEADLESS !== 'false',
            slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0
        });

        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            acceptDownloads: true,
            recordVideo: process.env.VIDEO === 'true' ? { dir: './reports/videos' } : undefined
        });

        this.page = await this.context.newPage();
    }

    public async cleanup(): Promise<void> {
        if (this.page) {
            await this.page.close();
        }
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}

setWorldConstructor(CustomWorld);
