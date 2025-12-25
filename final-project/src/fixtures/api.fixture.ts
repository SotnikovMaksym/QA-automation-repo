import { test as base, expect, request as playwrightRequest, APIRequestContext, APIResponse } from '@playwright/test';
import fs from 'fs';

interface ApiFixtures {
    authenticatedAPI: APIRequestContext;
}

interface WorkerFixtures {
    workerStorageState: string;
}

export const test = base.extend<ApiFixtures, WorkerFixtures>({
    workerStorageState: [
        async ({}, use) => {
            const authPath = 'playwright/.auth/user.json';

            await use(authPath);
        },
        { scope: 'worker' }
    ],

    authenticatedAPI: async ({ workerStorageState }, use) => {
        const baseURL = process.env.API_BASE_URL || 'https://new.fophelp.pro/api';

        // Log auth state for debugging in CI
        if (process.env.CI) {
            console.log('[API Fixture] Storage state path:', workerStorageState);
            if (fs.existsSync(workerStorageState)) {
                const authState = JSON.parse(fs.readFileSync(workerStorageState, 'utf-8'));
                console.log('[API Fixture] Cookies count:', authState.cookies?.length || 0);
                console.log('[API Fixture] Origins count:', authState.origins?.length || 0);
            } else {
                console.log('[API Fixture] Auth file does NOT exist!');
            }
        }

        const apiContext = await playwrightRequest.newContext({
            baseURL,
            storageState: workerStorageState,
            extraHTTPHeaders: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const enhancedAPI = new Proxy(apiContext, {
            get(target, prop) {
                const original = target[prop as keyof typeof target];

                if (typeof original === 'function' && ['get', 'post', 'put', 'patch', 'delete'].includes(prop as string)) {
                    return async (...args: unknown[]) => {
                        const response = await (original as (...args: unknown[]) => Promise<APIResponse>).apply(target, args);

                        // Log failed requests in CI
                        if (process.env.CI && !response.ok()) {
                            console.log(`[API ${String(prop)}] Request failed:`, args[0]);
                            console.log(`[API ${String(prop)}] Status:`, response.status(), response.statusText());
                            const body = await response.text().catch(() => 'Unable to read body');
                            console.log(`[API ${String(prop)}] Response:`, body.substring(0, 200));
                        }

                        return response;
                    };
                }

                return original;
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await use(enhancedAPI as any);
        await apiContext.dispose();
    }
});

export { expect };
