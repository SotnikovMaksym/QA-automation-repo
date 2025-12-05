import { Before, After, AfterStep, Status, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';

BeforeAll(async function () {
    console.log('=== Starting Test Suite ===');
    await CustomWorld.launchBrowser();
});

Before(async function (this: CustomWorld) {
    await this.setupScenario();
});

AfterStep(async function (this: CustomWorld, { result, pickle }) {
    if (result.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            path: `./reports/screenshots/${pickle.name}-${Date.now()}.png`,
            fullPage: true
        });

        this.attach(screenshot, 'image/png');
    }
});

After(async function (this: CustomWorld) {
    await this.teardownScenario();
});

AfterAll(async function () {
    console.log('=== Test Suite Completed ===');
    await CustomWorld.closeGlobalBrowser();
});
