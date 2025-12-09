# GitHub Actions CI/CD Pipeline

## 📋 Overview

This project uses GitHub Actions for automated test execution and report generation.

## 🚀 Workflows

### 1. **Playwright Tests** (`playwright-tests.yml`)

Main workflow for automated test execution.

**Triggers:**

- Push to branches: `main`, `master`, `develop`, `lesson22`
- Pull Request to branches: `main`, `master`, `develop`
- Manual dispatch via UI (workflow_dispatch)
- Schedule: daily at 9:00 UTC (11:00 Kyiv time)

**Features:**

- ✅ Parallel test execution (2 shards)
- ✅ Automatic Allure report generation
- ✅ Report publishing to GitHub Pages
- ✅ Test results retention (30 days)
- ✅ Test history preservation (last 20 runs)

**Usage:**

```bash
# Automatically runs on push/PR
# Or manually via GitHub UI: Actions -> Playwright Tests -> Run workflow
```

### 2. **Manual Test Run** (`manual-tests.yml`)

Workflow for manual test execution with parameters.

**Parameters:**

- **Browser**: browser selection (chromium, firefox, webkit, all)
- **Test File**: specific test file (optional)
- **Headed Mode**: run with visible browser
- **Workers**: number of parallel workers (1, 2, 4, 8)

**Usage:**

```bash
# Via GitHub UI:
# Actions -> Manual Test Run -> Run workflow
# Select parameters and run
```

### 3. **Code Quality** (`code-quality.yml`)

Workflow for code quality checks.

**Triggers:**

- Push to branches: `main`, `master`, `develop`, `lesson22`
- Pull Request to branches: `main`, `master`, `develop`
- Manual dispatch via UI

**Checks:**

- ✅ ESLint - static code analysis
- ✅ Prettier - code formatting

## 📊 Allure Reports

### GitHub Pages Setup

1. Navigate to Settings -> Pages
2. Source: select "Deploy from a branch"
3. Branch: select `gh-pages` / `root`
4. Save settings

### Accessing Reports

Reports are published at:

```
https://{username}.github.io/{repository-name}/{run-number}
```

Example:

```
https://sotnikovmaksym.github.io/QA-automation-repo/123
```

## 🔧 Local Execution

### Install Dependencies

```bash
npm ci
```

### Run Tests

```bash
# All tests
npm test

# With UI Mode
npm run test:ui

# In headed mode
npm run test:headed

# With debug
npm run test:debug
```

### Generate Allure Report

```bash
# Run tests and generate report
npm run test:allure

# Generate report only
npm run allure:generate

# Open existing report
npm run allure:open

# Generate and open immediately
npm run allure:serve
```

### Code Quality Check

```bash
# ESLint
npm run lint

# ESLint with autofix
npm run lint:fix

# Prettier
npm run format
```

## 🔐 Secrets and Permissions

Workflows require the following permissions:

### Repository Permissions

- **Actions**: Read and write
- **Contents**: Read and write
- **Pages**: Write

To configure:

1. Settings -> Actions -> General
2. Workflow permissions -> Read and write permissions
3. Save changes

## 📈 Monitoring

### View Workflow Status

```bash
# Via GitHub UI
Actions -> All workflows

# Or via badge in README
[![Playwright Tests](https://github.com/{username}/{repo}/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/{username}/{repo}/actions/workflows/playwright-tests.yml)
```

### Test Summary

After each run, GitHub Actions displays an automatic summary with:

- Number of executed tests
- Status (passed/failed)
- Link to Allure report
- Execution details

## 🐛 Troubleshooting

### Workflow Not Starting

1. Check repository permissions (Settings -> Actions)
2. Verify YAML file syntax
3. Ensure workflows are in `.github/workflows/`

### Allure Report Not Publishing

1. Enable GitHub Pages (Settings -> Pages)
2. Check workflow permissions (Settings -> Actions -> General)
3. Ensure `gh-pages` branch exists

### Tests Fail on CI but Work Locally

1. Check Node.js and Playwright versions
2. Review logs in GitHub Actions
3. Add more screenshots/videos for debugging

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
