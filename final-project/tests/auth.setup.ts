import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'TestPassword123!';

    await page.goto('https://new.fophelp.pro');
    await page.waitForLoadState('networkidle');

    await page.locator('button.signin-button').click();
    await page.waitForLoadState('domcontentloaded');

    const emailInput = page.locator('#login-email');
    await emailInput.fill(testEmail);

    const passwordInput = page.locator('#login-password');
    await passwordInput.fill(testPassword);

    const submitButton = page.locator('button.login-submit-button');
    await submitButton.click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.goto('https://new.fophelp.pro/expenses');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    await page.context().storageState({ path: authFile });
});
