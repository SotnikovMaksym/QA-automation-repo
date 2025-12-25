import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'TestPassword123!';

    if (process.env.CI) {
        console.log('[Auth Setup] Using email:', testEmail);
    }

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

    // Log auth state in CI for debugging
    if (process.env.CI) {
        console.log('[Auth Setup] Current URL:', page.url());
        const cookies = await page.context().cookies();
        console.log('[Auth Setup] Cookies count:', cookies.length);
        cookies.forEach(cookie =>
            console.log(`[Auth Setup] Cookie: ${cookie.name} (domain: ${cookie.domain}, httpOnly: ${cookie.httpOnly})`)
        );
    }

    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    await page.context().storageState({ path: authFile });

    if (process.env.CI) {
        console.log('[Auth Setup] Saved auth state to:', authFile);
    }
});
