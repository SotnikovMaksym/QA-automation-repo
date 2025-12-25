import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables without verbose output
process.env.DOTENV_CONFIG_QUIET = 'true';
dotenv.config();

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        [
            'allure-playwright',
            {
                outputFolder: 'allure-results',
                detail: true,
                suiteTitle: true,
                categories: [
                    {
                        name: 'Authentication issues',
                        matchedStatuses: ['failed'],
                        messageRegex: '.*login.*|.*auth.*'
                    },
                    {
                        name: 'API issues',
                        matchedStatuses: ['failed'],
                        messageRegex: '.*API.*|.*request.*'
                    },
                    {
                        name: 'UI issues',
                        matchedStatuses: ['failed'],
                        messageRegex: '.*visible.*|.*timeout.*'
                    }
                ]
            }
        ],
        ['list']
    ],
    use: {
        baseURL: 'https://new.fophelp.pro',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: process.env.CI ? 20000 : 15000,
        navigationTimeout: process.env.CI ? 45000 : 30000,
        viewport: { width: 1280, height: 720 },
        locale: 'en-US',
        timezoneId: 'Europe/Kiev'
    },
    expect: {
        timeout: 10000
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            teardown: 'teardown'
        },
        {
            name: 'teardown',
            testMatch: /.*\.teardown\.ts/
        },
        {
            name: 'chromium',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        },
        {
            name: 'api',
            testDir: './tests/api',
            use: {
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        }
    ],
    outputDir: 'test-results/',
    timeout: 60000
});
