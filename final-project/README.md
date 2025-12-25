# 🧪 FOP Help - Enterprise Test Automation Framework

Production-ready test automation framework for [FOP Help](https://new.fophelp.pro/) using TypeScript and Playwright.

![Tests](https://img.shields.io/badge/Tests-35%20Passing-success)
![Playwright](https://img.shields.io/badge/Playwright-1.57.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Architecture](https://img.shields.io/badge/Architecture-Enterprise-orange)

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Best Practices](#best-practices)

## 🎯 Overview

Enterprise-grade test automation framework with **35 production tests** covering API and E2E scenarios.

### Test Coverage

- ✅ **19 API Tests** - Full CRUD validation (expenses, incomes, user management)
- ✅ **14 E2E Tests** - Complete UI flows (expenses, incomes management)
- ✅ **100% Pass Rate** - All tests stable and reliable
- ✅ **Worker Isolation** - Parallel execution with isolated auth state
- ✅ **Smart Fixtures** - Automatic token refresh and proxy logging

### Key Features

- 🏗️ **Enterprise Architecture** - Worker-scoped fixtures, shared authentication
- 🔄 **Automatic Token Refresh** - No manual intervention needed
- 📊 **Comprehensive Logging** - Proxy-based API request/response tracking
- ⚡ **Parallel Execution** - Up to 6 workers for fast test runs
- 🎯 **Page Object Model** - Clean, maintainable test structure
- 🔍 **Type Safety** - Full TypeScript with strict mode

## 🏗️ Architecture

### Modern Fixture System

```typescript
// API Tests - Worker-scoped fixtures with proxy logging
// src/fixtures/api.fixture.ts
✓ Shared authentication state per worker
✓ Automatic token refresh via setup dependency
✓ Request/response logging with worker ID
✓ 19 tests covering all CRUD operations

// E2E Tests - Enhanced page wrapper with action logging
// src/fixtures/e2e.fixture.ts
✓ Enhanced page object with action tracking
✓ Performance monitoring (page load times)
✓ Worker-scoped authentication
✓ 14 tests covering complete user flows
```

### Authentication Flow

```
1. Setup Phase (auth.setup.ts)
   ↓ Saves → playwright/.auth/user.json

2. Worker Initialization
   ↓ Loads → Shared auth state

3. Test Execution
   ↓ Auto-refresh if needed (API tests)

4. Cleanup (auth.teardown.ts)
   ↓ Preserves state for next run
```

## 🛠 Technologies

| Category      | Technology | Version |
| ------------- | ---------- | ------- |
| **Language**  | TypeScript | 5.9.3   |
| **Framework** | Playwright | 1.57.0  |
| **Runtime**   | Node.js    | 20.x    |
| **Reporting** | Allure     | 3.4.3   |
| **Linting**   | ESLint     | 9.39.2  |

## 📁 Project Structure

```
final-project/
├── src/
│   ├── fixtures/
│   │   ├── api.fixture.ts       # API tests fixtures (worker-scoped auth, proxy logging)
│   │   └── e2e.fixture.ts       # E2E tests fixtures (enhanced page wrapper)
│   ├── pages/                   # Page Object Model
│   │   ├── base.page.ts         # Base page with retry logic
│   │   ├── home.page.ts         # Home page navigation
│   │   ├── login.page.ts        # Login functionality
│   │   ├── expenses.page.ts     # Expenses management
│   │   └── incomes.page.ts      # Incomes management
│   ├── api/                     # API clients
│   │   ├── base.api.ts          # Base API with type safety
│   │   ├── auth.api.ts          # Authentication endpoints
│   │   ├── expenses.api.ts      # Expenses endpoints
│   │   └── incomes.api.ts       # Incomes endpoints
│   └── utils/
│       └── test-helpers.ts      # Shared test utilities
├── tests/
│   ├── api/                     # API Tests (19 tests)
│   │   ├── expenses.spec.ts     # Expenses CRUD (7 tests)
│   │   ├── incomes.spec.ts      # Incomes CRUD (8 tests)
│   │   └── user.spec.ts         # User management (4 tests)
│   ├── e2e/                     # E2E Tests (14 tests)
│   │   ├── expenses.spec.ts     # Expenses UI flows (8 tests)
│   │   └── incomes.spec.ts      # Incomes UI flows (7 tests)
│   ├── auth.setup.ts            # Setup: Create auth state
│   └── auth.teardown.ts         # Teardown: Cleanup
├── playwright/.auth/            # Authentication state (gitignored)
├── test-results/                # Test results (gitignored)
├── playwright-report/           # HTML report (gitignored)
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
└── package.json                 # Dependencies & scripts
```

## 🚀 Installation

### Prerequisites

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository:**

```bash
git clone https://github.com/SotnikovMaksym/QA-automation-repo.git
cd QA-automation-repo
```

2. **Install dependencies:**

```bash
npm install
```

3. **Install Playwright browsers:**

```bash
npx playwright install chromium
# Or install all browsers:
npx playwright install
```

4. **Configure environment variables:**

```bash
cp .env.example .env
# Edit .env file with your test credentials
```

**.env example:**

```env
BASE_URL=https://new.fophelp.pro
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=your-password-here
API_BASE_URL=https://new.fophelp.pro/api
```

## ▶️ Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (visible browser)
npm run test:headed

# Debug mode
npm run test:debug
```

### Test Groups

```bash
# E2E tests only
npm run test:e2e

# API tests only
npm run test:api

# Specific project
npm run test:chromium
```

### Advanced Options

```bash
# Run specific file
npx playwright test tests/e2e/login.spec.ts

# Run tests matching pattern
npx playwright test -g "should login"

# Run with specific number of workers
npx playwright test --workers=4

# Generate trace on failure
npx playwright test --trace on
```

## ⚙️ Configuration

### Playwright Configuration

Main configuration in [`playwright.config.ts`](playwright.config.ts):

```typescript
{
  baseURL: 'https://new.fophelp.pro',
  timeout: 60000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['json'],
    ['junit'],
    ['allure-playwright']
  ]
}
```

### TypeScript Configuration

Settings in [`tsconfig.json`](tsconfig.json):

- **Target**: ESNext
- **Module**: ESNext
- **Module Resolution**: bundler
- **Strict Mode**: enabled
- **Source Maps**: enabled

### ESLint & Prettier

Code quality tools configured:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 📊 Reports

### Playwright HTML Report

Automatically generated after test execution:

```bash
# Open latest report
npm run report
# or
npx playwright show-report
```

**Report includes:**

- ✅ Test status (passed/failed/skipped)
- 📸 Screenshots on failures
- 🎥 Video recordings
- 📋 Trace files for debugging
- ⏱️ Execution timings

### Allure Report

Advanced reporting with detailed analytics:

```bash
# Run tests and open Allure report
npm run test:allure

# Or step-by-step:
npm test                    # Run tests
npm run allure:generate     # Generate report
npm run allure:open         # Open in browser

# Quick preview (no HTML saved)
npm run allure:serve
```

**Allure features:**

- 📊 Test execution statistics & trends
- 🏷️ Categorized failures (Auth, API, UI)
- 📸 Automatic attachments
- 📈 Historical trends
- 🔍 Detailed test steps

### Additional Formats

Generated in `test-results/`:

- **JSON** - `results.json` for integrations
- **JUnit** - `junit.xml` for CI/CD systems

## 🔄 CI/CD

### GitHub Actions

Automated testing configured in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

**Triggers:**

- Push to `main`, `master`, `develop`
- Pull requests
- Daily schedule (3:00 UTC)
- Manual dispatch

**Jobs:**

- Test execution (parallel, 2 shards)
- Allure report generation
- Code quality checks (ESLint, TypeScript)

**Setup:**
Add GitHub Secrets in repository settings:

- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

## 📚 Best Practices

### Page Object Model

```typescript
// ❌ Bad - assertions in Page Object
class LoginPage {
    async expectVisible() {
        await expect(this.element).toBeVisible();
    }
}

// ✅ Good - return state, assert in tests
class LoginPage {
    async isVisible(): Promise<boolean> {
        return await this.element.isVisible();
    }
}

// Test
test('element visible', async ({ loginPage }) => {
    expect(await loginPage.isVisible()).toBe(true);
});
```

### Fixtures Usage

```typescript
// ❌ Bad - manual setup
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
});

// ✅ Good - use fixtures
test('login test', async ({ loginPage }) => {
    await loginPage.login(email, password);
});
```

### API Testing

```typescript
// ✅ Good - use fixtures
test('API test', async ({ authenticatedAPI, authApi }) => {
    const response = await authApi.login();
    expect(response.status).toBe(200);
});
```

### Test Organization

```typescript
// ✅ Good - nested describe blocks
test.describe('Feature', () => {
    test.describe('Scenario 1', () => {
        test('test case', async () => {});
    });
});
```

## Test Coverage Summary

| Category           | Tests    | Coverage |
| ------------------ | -------- | -------- |
| **E2E UI**         | 14 tests | 100%     |
| **API**            | 19 tests | 100%     |
| **Authentication** | 2 tests  | 100%     |
| **Total**          | 35 tests | 100%     |

## ✅ Project Checklist

- [x] TypeScript with ESNext configuration
- [x] Custom Playwright Test framework
- [x] Centralized fixtures system
- [x] Page Object Model (no assertions)
- [x] API & E2E test coverage
- [x] Multiple reporters (HTML, Allure, JSON, JUnit)
- [x] CI/CD with GitHub Actions
- [x] Allure deployment to GitHub Pages
- [x] Code quality tools (ESLint, Prettier)
- [x] Comprehensive documentation
- [x] Best practices implementation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Standards

- Follow TypeScript strict mode
- Use ESLint & Prettier
- Write meaningful test names
- Add comments for complex logic
- Update documentation

## 📞 Support

For questions or issues:

- � Issues: [GitHub Issues](https://github.com/SotnikovMaksym/QA-automation-repo/issues)
- 📖 Docs: See documentation files

## 📄 License

ISC License - see LICENSE file for details

## 👨‍💻 Author

QA Automation Engineer

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** December 25, 2025  
**Test Coverage:** 100%
