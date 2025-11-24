# Playwright Football.ua

This project contains a Playwright Test setup that exercises the public news portal [football.ua](https://football.ua/). The suite follows the Page Object Model pattern and demonstrates how to verify key homepage widgets (navigation, hero articles, match centre) using resilient, semantic locators.

## Prerequisites

- Node.js 18+ (LTS) and npm
- Supported desktop browser (Chromium is bundled with Playwright)

## Installation

```bash
npm install
```

Playwright itself installs its browsers automatically during the first run. To force the download manually you can run `npx playwright install`.

## Running the tests

The configuration (`playwright.config.ts`) launches Chromium in headed mode and maximizes the window for visual debugging. Execute the suite with:

```bash
npx playwright test tests/football-ua-home-page.spec.ts
```

After a run you can open the last HTML report:

```bash
npx playwright show-report
```

## Project structure

```
lesson18-19/
├─ src/
│  └─ pages/
│     └─ football-ua-home-page.ts   # Page Object for football.ua homepage
├─ tests/
│  └─ football-ua-home-page.spec.ts # Playwright specs using the page model
├─ playwright.config.ts             # Global Playwright configuration
├─ tsconfig.json                    # TypeScript settings
└─ README.md
```

### Page Object (`football-ua-home-page.ts`)

- Encapsulates locators for navigation, hero block, video section, and match centre.
- Provides helper methods such as `goto`, `acceptCookiesIfPresent`, `getHeroArticleTitles`, `openHeroArticleByIndex`, and `getMatchRowSnapshot`.
- Keeps assertions out of the model so it can be reused by multiple tests.

### Tests (`football-ua-home-page.spec.ts`)

The suite currently verifies:

1. **Navigation shortcuts** — Ensures the main menu exposes core league links.
2. **Hero block navigation** — Opens the first headline from "Головне за добу" and asserts the article page renders correctly.
3. **Match centre data** — Confirms that fixture rows include kickoff time, participants, and score placeholders.

Each test shares a `beforeEach` hook that instantiates the page object, navigates to the site, and handles cookie prompts.

## Extending the suite

1. Add new methods to the Page Object for any additional widgets (e.g., video gallery, tag filters).
2. Create new specs next to the existing one and import the page model.
3. Keep selectors semantic (`getByRole`, `filter({ hasText })`) per Playwright best practices for long-term stability.

Happy testing!
