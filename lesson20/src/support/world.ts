import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { DemoQAHomePage } from '../pages/demoqa-home.page';
import { DemoQATextBoxPage } from '../pages/demoqa-textbox.page';

let globalBrowser: Browser | undefined;

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export class CustomWorld extends World {
    public browser?: Browser;
    public context?: BrowserContext;
    public page?: Page;
    public homePage?: DemoQAHomePage;
    public textBoxPage?: DemoQATextBoxPage;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public static async launchBrowser(): Promise<void> {
        if (!globalBrowser) {
            globalBrowser = await chromium.launch({
                headless: process.env.HEADLESS !== 'false',
                slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0
            });
        }
    }

    public async setupScenario(): Promise<void> {
        this.browser = globalBrowser;

        this.context = await this.browser!.newContext({
            viewport: { width: 1920, height: 1080 },
            acceptDownloads: true,
            recordVideo: process.env.VIDEO === 'true' ? { dir: './reports/videos' } : undefined
        });

        this.page = await this.context.newPage();
        this.homePage = new DemoQAHomePage(this.page);
        this.textBoxPage = new DemoQATextBoxPage(this.page);
    }

    public async teardownScenario(): Promise<void> {
        if (this.page) {
            await this.page.close();
        }
        if (this.context) {
            await this.context.close();
        }
    }

    public static async closeGlobalBrowser(): Promise<void> {
        if (globalBrowser) {
            await globalBrowser.close();
            globalBrowser = undefined;
        }
    }
}
