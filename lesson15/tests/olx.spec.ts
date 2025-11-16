import { test, expect } from '@playwright/test';

test.describe('OLX.ua - Testing with CSS selectors', () => {
    test('Test case 1: Search and sort products by price descending', async ({ page }) => {
        await page.goto('https://www.olx.ua/');
        await expect(page).toHaveURL(/olx\.ua/);
        await expect(page.locator('#search')).toBeVisible();

        await page.locator('#search').fill('iPhone 13');
        await expect(page.locator('#search')).toHaveValue('iPhone 13');

        await page.locator('button[name="searchBtn"]').click();
        await expect(page).toHaveURL(/q-iPhone/);
        await expect(page.locator('[data-cy="l-card"]').first()).toBeVisible({ timeout: 10000 });

        await page.locator('[aria-label="Категорія"]').click();
        await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Електроніка' })).toBeVisible();

        await page.locator('[role="menuitem"]').filter({ hasText: 'Електроніка' }).hover();
        await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Телефони та аксесуари' })).toBeVisible();

        await page.locator('text=Телефони та аксесуари').click();
        await expect(page.locator('[aria-label="Підкатегорія"]')).toBeVisible();

        await page.locator('[aria-label="Підкатегорія"]').click();
        await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Смартфони / мобільні телефони' })).toBeVisible();

        await page.locator('[role="menuitem"]').filter({ hasText: 'Смартфони / мобільні телефони' }).click();
        await expect(page.getByTestId('heading')).toHaveText('Смартфони і мобільні телефони в Україні - iPhone 13');

        await page.locator('button[aria-describedby="filters.sort"]').click();
        await expect(page.locator('button[id="sorting-option-3"]')).toBeVisible();

        await page.locator('button[id="sorting-option-3"]').click();
        await page.waitForTimeout(2000);

        const allPrices = await page.locator('p[data-testid="ad-price"]').allTextContents();
        const prices = allPrices
            .map((price) => parseFloat(price.replace(/[^0-9]/g, '')))
            .filter((price) => !isNaN(price));

        expect(prices.length).toBeGreaterThan(0);

        const regularPrices = prices.slice(3, 13);
        expect(regularPrices.length).toBeGreaterThan(5);

        for (let i = 0; i < regularPrices.length - 1; i++) {
            expect(regularPrices[i]).toBeGreaterThanOrEqual(regularPrices[i + 1]);
        }
    });

    test('Test case 2: Verify product card structure and elements', async ({ page }) => {
        await page.goto('https://www.olx.ua/uk/elektronika/telefony-i-aksesuary/mobilnye-telefony-smartfony/');
        await expect(page).toHaveURL(/mobilnye-telefony-smartfony/);

        await expect(page.locator('[data-cy="l-card"]').first()).toBeVisible({ timeout: 10000 });

        const cardsCount = await page.locator('[data-cy="l-card"]').count();
        expect(cardsCount).toBeGreaterThan(0);

        const firstCard = page.locator('[data-cy="l-card"]').first();

        await expect(firstCard.locator('img[alt]')).toBeVisible();

        const cardTitle = firstCard.locator('[data-cy="ad-card-title"] h4');
        await expect(cardTitle).toBeVisible();
        await expect(cardTitle).not.toBeEmpty();

        const cardPrice = firstCard.locator('p[data-testid="ad-price"]');
        await expect(cardPrice).toBeVisible();
        await expect(cardPrice).toContainText('грн');

        const cardLink = firstCard.locator('a[href*="/d/uk/"]').first();
        await expect(cardLink).toBeVisible();
        await expect(cardLink).toHaveAttribute('href', /\/d\/uk\//);

        const allPricesCount = await page.locator('[data-testid="ad-price"]').count();
        expect(allPricesCount).toBe(cardsCount);

        const allTitlesCount = await page.locator('[data-cy="ad-card-title"]').count();
        expect(allTitlesCount).toBe(cardsCount);
    });

    test('Test case 3: Open product and verify details page', async ({ page }) => {
        await page.goto('https://www.olx.ua/uk/q-samsung/');
        await expect(page).toHaveURL(/q-samsung/);

        await expect(page.locator('[data-cy="l-card"]').first()).toBeVisible({ timeout: 10000 });

        const regularCard = page.locator('[data-cy="l-card"]').nth(3);
        await expect(regularCard).toBeVisible();

        await regularCard.locator('a[href*="obyavlenie"]').first().click();

        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/\/d\/uk\//);

        const productTitle = page.locator('h1').or(page.locator('h4:not([data-cy])')).first();
        await expect(productTitle).toBeVisible({ timeout: 15000 });
        await expect(productTitle).not.toBeEmpty();

        const productImages = page.locator('img[src*="apollo"]');
        expect(await productImages.count()).toBeGreaterThan(0);

        const productPrice = page.locator('h3, p[class*="css"]').filter({ hasText: 'грн' }).first();
        await expect(productPrice).toBeVisible({ timeout: 5000 });
        await expect(productPrice).toContainText('грн');

        const productDescription = page.locator('[data-cy="ad_description"]');
        const hasDescription = await productDescription.isVisible({ timeout: 3000 }).catch(() => false);
        if (hasDescription) {
            await expect(productDescription).not.toBeEmpty();
        }
    });
});

test.describe('OLX.ua - Testing with XPath selectors', () => {
    test('Test case 1: Navigate and filter products using XPath', async ({ page }) => {
        await page.goto('https://www.olx.ua/');
        await expect(page).toHaveURL(/olx\.ua/);

        await page.locator('//input[@id="search"]').fill('MacBook');
        await expect(page.locator('//input[@id="search"]')).toHaveValue('MacBook');

        await page.locator('//button[@type="submit"]').click();
        await expect(page).toHaveURL(/q-MacBook/);

        await expect(page.locator('//div[@data-cy="l-card"][1]')).toBeVisible({ timeout: 10000 });

        const cardsCount = await page.locator('//div[@data-cy="l-card"]').count();
        expect(cardsCount).toBeGreaterThan(0);

        const firstCard = page.locator('//div[@data-cy="l-card"][1]');
        await expect(firstCard).toBeVisible();

        const cardTitle = firstCard.locator('xpath=.//h4[contains(@class, "css-")]');
        await expect(cardTitle).toBeVisible();
        await expect(cardTitle).not.toBeEmpty();

        const cardPrice = firstCard.locator('xpath=.//p[@data-testid="ad-price"]');
        await expect(cardPrice).toBeVisible();
        await expect(cardPrice).toContainText('грн');

        const allPrices = await page.locator('//p[@data-testid="ad-price"]').allTextContents();
        const pricesWithValues = allPrices.filter((price) => price.includes('грн'));
        expect(pricesWithValues.length).toBeGreaterThan(0);

        await page.locator('//button[contains(@aria-describedby, "sort")]').click();
        await expect(page.locator('//button[@id="sorting-option-1"]')).toBeVisible();

        await page.locator('//button[@id="sorting-option-1"]').click();
        await page.waitForTimeout(2000);

        await expect(page.locator('//div[@data-cy="l-card"][1]')).toBeVisible();
    });

    test('Test case 2: View product details and interact with elements using XPath', async ({ page }) => {
        await page.goto('https://www.olx.ua/uk/elektronika/noutbuki-i-aksesuary/noutbuki/');
        await expect(page).toHaveURL(/noutbuki/);

        await expect(page.locator('//div[@data-cy="l-card"][1]')).toBeVisible({ timeout: 10000 });

        const regularCard = page.locator('//div[@data-cy="l-card"][4]');
        await expect(regularCard).toBeVisible();

        await regularCard.locator('xpath=.//a[contains(@href, "/d/uk/")]').first().click();

        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/\/d\/uk\//);

        const pageTitle = page.locator('//h1 | //h4[not(@data-cy)]').first();
        await expect(pageTitle).toBeVisible({ timeout: 15000 });
        await expect(pageTitle).not.toBeEmpty();

        const productImages = page.locator('//img[contains(@src, "apollo") or contains(@src, "static")]');
        expect(await productImages.count()).toBeGreaterThan(0);

        const priceElement = page.locator('//h3[contains(text(), "грн")] | //p[contains(text(), "грн")]').first();
        await expect(priceElement).toBeVisible({ timeout: 5000 });
        await expect(priceElement).toContainText('грн');

        const description = page.locator('//div[@data-cy="ad_description"]');
        const hasDesc = await description.isVisible({ timeout: 3000 }).catch(() => false);
        if (hasDesc) {
            await expect(description).not.toBeEmpty();
        }

        const locationElement = page.locator('//p[contains(text(), "Місце") or contains(@class, "location")]').first();
        const hasLocation = await locationElement.isVisible({ timeout: 3000 }).catch(() => false);
        if (hasLocation) {
            await expect(locationElement).toBeVisible();
        }

        const breadcrumbs = page.locator('//nav//a[contains(@href, "/uk/")]');
        expect(await breadcrumbs.count()).toBeGreaterThan(0);
    });
});
