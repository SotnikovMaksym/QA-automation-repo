import { Before, After, AfterStep, Status, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';

BeforeAll(function () {
    console.log('=== Starting Test Suite ===');
});

Before(async function (this: CustomWorld) {
    await this.init();
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
    await this.cleanup();
});

AfterAll(function () {
    console.log('=== Test Suite Completed ===');
});
