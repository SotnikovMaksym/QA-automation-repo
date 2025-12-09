# Football.ua Test Automation Project

[![Playwright Tests](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/playwright-tests.yml/badge.svg?branch=lesson22)](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/playwright-tests.yml)
[![Code Quality](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/code-quality.yml/badge.svg?branch=lesson22)](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/code-quality.yml)

## Project Overview

E2E test automation project for [Football.ua](https://football.ua/) built with Playwright, TypeScript, and Allure reporting. Implements component-based Page Object Model architecture with automatic failure diagnostics.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration:
- ✅ Automated test execution on push and PR
- ✅ Scheduled daily test runs
- ✅ Parallel test execution (sharding)
- ✅ Allure report generation and GitHub Pages deployment
- ✅ Code quality checks (ESLint, Prettier)
- ✅ Manual test runs with custom parameters

See [CI/CD Documentation](.github/workflows/README.md) for details.

## Project Architecture

### Directory Structure

```
lesson21/
├── src/
│   ├── components/          # UI components (Header, Hero, MatchCenter)
│   ├── elements/            # WebElement wrappers
│   ├── fixtures/            # Playwright fixtures with auto-attachments
│   └── pages/               # Page Objects
├── tests/                   # Test suites (12 tests)
│   ├── football-ua-home-page.spec.ts
│   ├── football-ua-components.spec.ts
│   └── demo-attachments.spec.ts
├── allure-results/          # Test execution data
├── allure-report/           # Generated HTML reports
├── playwright.config.ts     # Allure reporter configuration
└── package.json             # Dependencies and scripts
```

## Architecture

**WebElement** - Playwright `Locator` wrapper with custom methods (`click()`, `getText()`, `isVisible()`, `fill()`, `hover()`)

**BaseComponent** - Abstract class defining `waitForReady()` contract for component initialization

**UI Components** - HeaderComponent, HeroComponent, MatchCenterComponent, CookieConsentComponent

**Page Objects** - `FootballUaHomePage` aggregates components and provides test-level API

**Custom Fixtures** - Auto-initialization with automatic failure diagnostics (screenshot, HTML, console logs, errors, URL)

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test
```bash
npx playwright test football-ua-home-page.spec.ts
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

## Allure Commands

```bash
npm run allure:generate    # Create HTML report
npm run allure:open        # View existing report
npm run allure:serve       # Generate + open (one command)
npm run test:allure        # Run tests + serve report
```

## Test Coverage (12 Tests)

**Home Page (6 tests):** Navigation links, Hero section, Article navigation, Match Center, Header visibility, Page load
**Components (5 tests):** HeaderComponent, HeroComponent, MatchCenterComponent, WebElement wrapper, Component initialization
**Demo (1 test):** Automatic attachments on failure (intentionally failing)

## Code Standards

The project adheres to international standards and best practices:

- TypeScript with strict type safety
- ESLint + Prettier (zero errors)
- Page Object Model + Fixtures
- Single Responsibility Principle
- Modular, reusable, maintainable architecture

## Allure Reporting

**Features:**
- Rich visualization (graphs, timelines, history)
- Test categorization (epic, feature, story, severity)
- Failed test diagnostics (screenshots, HTML, console logs, errors)
- Trends and statistics tracking
- BDD-style organization (@smoke, @navigation tags)

**Metadata Example:**
```typescript
import { epic, feature, story, severity, tag, description } from 'allure-js-commons';

await epic('Football.ua Web Application');
await feature('Home Page');
await story('Navigation');
await severity('critical');
await tag('@smoke');
await description('Verify international navigation links');
```

**Automatic Attachments on Failure:**
- Screenshot (full page PNG)
- HTML source (complete DOM)
- Console logs (log, warn, error)
- JavaScript errors
- Current URL

*See `demo-attachments.spec.ts` for demonstration.*

## Technologies

- Playwright v1.57.0
- TypeScript v5.9.3
- Allure Playwright v3.4.3
- Allure Commandline v2.34.1
- ESLint + Prettier

---

**Documentation:** [Playwright](https://playwright.dev/) | [Allure Framework](https://allurereport.org/)
