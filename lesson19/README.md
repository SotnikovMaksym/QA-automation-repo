# Football.ua Test Automation Project

## Project Overview

This is a test automation project for the [Football.ua](https://football.ua/) website, built using Playwright and TypeScript. The project implements a component-based approach with Page Object Model, ensuring clean, maintainable, and scalable code.

## Project Architecture

### Directory Structure

```
lesson19/
├── src/
│   ├── components/          # UI page components
│   │   ├── base-component.ts
│   │   ├── header.component.ts
│   │   ├── hero.component.ts
│   │   ├── match-center.component.ts
│   │   └── cookie-consent.component.ts
│   ├── elements/            # WebElement wrappers
│   │   └── web-element.ts
│   ├── fixtures/            # Playwright fixtures
│   │   └── football-fixtures.ts
│   └── pages/               # Page Objects
│       └── football-ua-home-page.ts
├── tests/                   # Test files
│   └── football-ua-home-page.spec.ts
├── playwright.config.ts     # Playwright configuration
└── package.json
```

## Code Organization Principles

### 1. WebElement Class
Base class for encapsulating Playwright Locator with commonly used methods:
- `click()`, `getText()`, `isVisible()`
- `fill()`, `hover()`, `getAttribute()`
- Working with multiple elements via `nth()` and `count()`

### 2. BaseComponent
Abstract base class for all UI components:
- Provides access to Page instance
- Defines `waitForReady()` contract for component readiness

### 3. UI Components
Each page section is encapsulated in a separate component:
- **HeaderComponent** - navigation and top links
- **HeroComponent** - main featured articles
- **MatchCenterComponent** - match information
- **CookieConsentComponent** - cookie dialog handling

### 4. Page Objects
`FootballUaHomePage` combines all components and provides high-level methods for page interaction.

### 5. Custom Fixtures
Using Playwright fixtures for automatic Page Object initialization in tests:
```typescript
test('test name', async ({ homePage }) => {
    // homePage is ready to use
});
```

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

### View Report
```bash
npx playwright show-report
```

## Test Scenarios

1. **Navigation Links Verification**
   - Validate presence of international sections (Ukraine, England, Spain, etc.)

2. **Hero Section Verification**
   - Display articles
   - Click on article and navigate to article page

3. **Match Center Verification**
   - Display match information
   - Validate time format, score, team names

4. **Component Loading Verification**
   - All main components load successfully

## Code Standards

The project adheres to international standards and best practices:

- ✅ TypeScript for type safety
- ✅ ESLint for code quality assurance
- ✅ Prettier for code formatting
- ✅ Official Playwright patterns (Page Object Model, Fixtures)
- ✅ Explicit accessibility modifiers (public/private)
- ✅ Descriptive method and variable names
- ✅ Single Responsibility Principle

## Architecture Benefits

1. **Modularity** - each component is independent and can be tested separately
2. **Reusability** - WebElement and BaseComponent provide common functionality
3. **Maintainability** - UI changes require updating only the corresponding component
4. **Readability** - tests look like business scenarios
5. **Scalability** - easy to add new pages and components

## Technologies

- **Playwright** v1.56+ - E2E testing framework
- **TypeScript** v5.9+ - programming language
- **Node.js** - runtime environment
- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - code formatting

## Additional Information

For detailed information about Playwright, see the [official documentation](https://playwright.dev/)
