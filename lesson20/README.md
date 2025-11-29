# 🥒 Cucumber.js + Playwright BDD Project - Lesson 20

## ✅ Project Successfully Created!

This project demonstrates **Behavior-Driven Development (BDD)** approach to test automation using:

- ✅ **Cucumber.js 12.2.0** - BDD testing framework
- ✅ **Gherkin** - Language for business-readable test scenarios  
- ✅ **Playwright 1.57.0** - Modern browser automation tool
- ✅ **TypeScript 5.9.3** - Type-safe programming language
- ✅ **Custom World** - Cucumber context with Playwright integration
- ✅ **Hooks** - Before/After hooks for setup/teardown
- ✅ **Screenshots on Failure** - Automatic screenshot capture

---

## 📂 Project Structure

```
lesson20/
├── features/                         # BDD features
│   ├── support/                     # Cucumber configuration
│   │   ├── world.ts                # Custom World with Playwright
│   │   └── hooks.ts                # Before/After hooks
│   ├── demoqa-homepage.feature     # Feature: DemoQA Homepage
│   └── demoqa-textbox.feature      # Feature: DemoQA Text Box Form
├── src/
│   ├── steps/                      # Step definitions
│   │   ├── homepage.steps.ts      # Homepage step implementations
│   │   └── textbox.steps.ts       # Text box form step implementations
│   └── main.ts                     # Global configuration
├── reports/                         # Test reports (auto-generated)
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   └── screenshots/
├── cucumber.js                      # Cucumber configuration
├── tsconfig.cucumber.json          # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## 🚀 Quick Start

### 1. Install browsers (if not already installed)

```bash
npx playwright install
```

### 2. Run all tests

```bash
npm run cucumber
```

### 3. Run smoke tests

```bash
npm run cucumber:smoke
```

### 4. Run positive tests

```bash
npm run cucumber:positive
```

---

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm run cucumber` | Run all tests |
| `npm run cucumber:parallel` | Run tests in parallel (2 workers) |
| `npm run cucumber:smoke` | Run smoke tests (@smoke tag) |
| `npm run cucumber:positive` | Run positive tests (@positive tag) |
| `npm run cucumber:headed` | Run with visible browser |
| `npx cucumber-js features/demoqa-textbox.feature` | Run specific feature file |
| `npx cucumber-js --tags "@form"` | Run by tag |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |

---

## 🎯 Created Feature Files

### 1. **demoqa-homepage.feature** 
- ✅ Verify homepage loads successfully
- ✅ Navigate to Forms section

**Scenarios**: 2  
**Tags**: @demoqa, @smoke, @positive, @homepage, @navigation

### 2. **demoqa-textbox.feature**
- ✅ Submit complete text box form
- ✅ Submit form with different user data (Scenario Outline with 3 examples)
- ✅ Submit form with invalid email (negative test)

**Scenarios**: 5 (4 positive + 1 negative)  
**Tags**: @demoqa, @form, @smoke, @positive, @negative, @validation

---

## 🏷️ Used Tags

- `@smoke` - Critical smoke tests
- `@positive` - Positive test scenarios
- `@negative` - Negative test scenarios
- `@navigation` - Navigation tests
- `@form` - Form tests
- `@homepage` - Homepage tests
- `@validation` - Validation tests
- `@demoqa` - DemoQA site tests
- `@form-submit` - Form submission tests

---

## 🎨 Gherkin Examples

### Background (common preconditions)

```gherkin
Feature: DemoQA Homepage Navigation
  
  Background:
    Given I open DemoQA homepage
  
  Scenario: Verify homepage loads successfully
    Then I should see the main header
```

### Scenario Outline (data-driven tests)

```gherkin
Scenario Outline: Submit form with different user data
  Given I open DemoQA text box page
  When I fill "Full Name" with "<name>"
  And I fill "Email" with "<email>"
  And I fill "Current Address" with "<address>"
  And I click Submit button
  Then I should see submitted output
  And output should contain "<name>"

  Examples:
    | name          | email               | address            |
    | Alice Smith   | alice@test.com      | 789 Pine St, Boston|
    | Bob Johnson   | bob.j@company.com   | 321 Elm St, Chicago|
```

---

## 🛠️ Configuration

### Cucumber (cucumber.js)

```javascript
- TypeScript support via ts-node
- HTML and JSON reports
- Parallel execution (2 workers)
- Timeout: 999999999ms (for debugging)
```

### Playwright (world.ts)

```javascript
- Headless mode by default
- Chromium browser
- Automatic screenshots on failure
- Browser cleanup after each scenario
```

---

## 📊 Reports

After test execution, the following are generated:

1. **HTML Report**: `reports/cucumber-report.html`
2. **JSON Report**: `reports/cucumber-report.json`
3. **Screenshots**: `reports/screenshots/` (on failures)

---

## 🌟 Best Practices Implemented

✅ **BDD Structure** - Clear separation of Features/Steps  
✅ **TypeScript** - Type safety and IntelliSense  
✅ **Custom World** - Context for sharing state  
✅ **Hooks** - Setup/Teardown logic  
✅ **Tags** - Flexible test filtering  
✅ **Parallel Execution** - Faster test runs  
✅ **Screenshots on Failure** - Automatic diagnostics  
✅ **Comprehensive Logging** - Detailed logs  
✅ **Clean Architecture** - Easy maintenance and extension  
✅ **Code Quality** - ESLint and Prettier configured

---

## 📚 Reference

- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🔧 Environment Configuration

```bash
# Headless mode (default)
npm run cucumber

# Headed mode (visible browser)
npm run cucumber:headed
```

---

## 📈 Test Results

**Total**: 7 scenarios (7 passed)  
**Total Steps**: 41 steps (41 passed)  
**Execution Time**: ~18.5 seconds  
**Success Rate**: 100%

---

## ✨ Features

- ✅ Cucumber.js integration with Playwright
- ✅ Gherkin syntax (Given-When-Then)
- ✅ Background for shared steps
- ✅ Scenario Outline for data-driven tests
- ✅ Tags for test organization
- ✅ Custom World with Playwright context
- ✅ Before/After hooks
- ✅ Automatic screenshots on failure
- ✅ HTML and JSON reports
- ✅ Parallel execution support
- ✅ Full TypeScript support
- ✅ ESLint and Prettier configured

---

## 👨‍💻 Author

**QA Automation Engineer**  
Lesson 20 - Cucumber.js + Playwright + BDD

---

## 📄 License

ISC

---

🎉 **Project is ready to use!**
