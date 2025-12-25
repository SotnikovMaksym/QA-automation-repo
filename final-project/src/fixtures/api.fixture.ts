import { test as base, expect, request as playwrightRequest, APIRequestContext, APIResponse } from '@playwright/test';

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
