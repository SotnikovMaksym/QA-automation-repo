import { test as teardown } from '@playwright/test';

teardown('cleanup test environment', () => {
    // Authentication state preserved in playwright/.auth/user.json for test reuse
});
