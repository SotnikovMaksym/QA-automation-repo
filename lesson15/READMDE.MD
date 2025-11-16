# Lesson 15 - CSS & XPath Selectors Practice

Practical task for learning CSS and XPath selectors using Playwright Test framework on OLX.ua website.

## Task Description

- Practice writing CSS selectors for user-interacting elements
- Practice writing XPath selectors for user-interacting elements
- Create multiple test cases demonstrating various selector types
- Implement real user scenarios with validations

## Quick Start

### Installation

```bash
npm install
```

### Run Tests

```bash
# Run all tests with visible browser
npx playwright test

# Run specific test file
npx playwright test olx.spec.ts

# Run with detailed output
npx playwright test --reporter=list

# Run in UI mode
npx playwright test --ui
```

## Test Cases

### CSS Selectors (3 test cases)

1. **Search and Sort Products** - Complex multi-step test with category filtering and price sorting
2. **Verify Product Card Structure** - Validates product card elements and structure
3. **Open Product Details** - Navigates to product page and verifies details

### XPath Selectors (2 test cases)

1. **Navigate and Filter Products** - Search, card validation, and sorting using XPath
2. **View Product Details** - Category navigation and product page validation with XPath

## Selectors Used

### CSS Selectors
- ID: `#search`
- Attributes: `[data-cy="l-card"]`, `[data-testid="ad-price"]`, `button[name="searchBtn"]`
- ARIA: `[aria-label="Категорія"]`, `[aria-describedby="filters.sort"]`
- Substring matching: `a[href*="/d/uk/"]`, `img[src*="apollo"]`
- Combinators: `[data-cy="ad-card-title"] h4`
- Pseudo-classes: `.first()`, `.nth(3)`
- Filters: `.filter({ hasText: 'Електроніка' })`

### XPath Selectors
- Absolute paths: `//input[@id="search"]`
- Predicates: `//div[@data-cy="l-card"][1]`
- Functions: `contains(@class, "css-")`, `contains(@href, "/d/uk/")`
- Logical operators: `or contains(@src, "static")`
- Union: `//h1 | //h4[not(@data-cy)]`
- Axes: `.//a` (descendant), `//nav//a`
- Text functions: `contains(text(), "грн")`

## Configuration

- **Browser**: Chromium only
- **Mode**: Headless false (visible browser)
- **Viewport**: 1920x1080 (Full HD)
- **Timeout**: 60 seconds
- **Parallel**: Enabled

## Tech Stack

- **Playwright Test** - E2E testing framework
- **TypeScript** - Programming language
- **ESLint** - Code linting with stylistic rules
- **Prettier** - Code formatting

## Code Quality

All code follows Playwright and QA Automation best practices:
- Web-first assertions with auto-waiting
- Stable selectors (data-attributes, ARIA)
- Test isolation and independence
- Minimal hardcoded waits
- Error handling for optional elements
- ESLint compliant (0 errors)

## Test Results

All 5 tests passing:
```
✓ CSS Test 1: Search and sort by price
✓ CSS Test 2: Verify card structure
✓ CSS Test 3: Open product details
✓ XPath Test 1: Navigate and filter
✓ XPath Test 2: View product details
```

## Target Website

**OLX.ua** - Ukrainian classifieds platform for testing various selector strategies