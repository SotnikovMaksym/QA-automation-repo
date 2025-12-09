# 🚀 Quick Start Guide - GitHub Actions CI/CD

## First Time Setup

### 1. Check Repository Settings

```bash
# Ensure you're on the correct branch
git branch

# If needed, create a new branch
git checkout -b lesson22
```

### 2. Push Code to GitHub

```bash
git add .
git commit -m "feat: add GitHub Actions CI/CD pipelines"
git push origin lesson22
```

### 3. Configure GitHub Pages

1. Navigate to **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` / `root`
4. Click **Save**

### 4. Set Permissions

1. Navigate to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

## Available Workflows

### 🧪 Playwright Tests (Automatic)

**Triggers:**

- ✅ Push to `main`, `master`, `develop`, `lesson22`
- ✅ Pull Request creation
- ✅ Daily at 11:00 AM Kyiv time
- ✅ Manual via Actions tab

**Features:**

- Runs all tests in 2 parallel shards
- Generates Allure report
- Publishes report to GitHub Pages
- Retains results for 30 days

### 🎯 Manual Test Run

**How to Run:**

1. Navigate to **Actions** → **Manual Test Run**
2. Click **Run workflow**
3. Select parameters:
    - **Browser**: chromium/firefox/webkit/all
    - **Test File**: (optional) e.g. `tests/football-ua-home-page.spec.ts`
    - **Headed**: for visible browser execution
    - **Workers**: number of parallel workers
4. Click **Run workflow**

**Use Cases:**

- Testing specific files
- Cross-browser verification
- Debugging with headed mode

### 📋 Code Quality (Automatic)

**Triggers:**

- On push and PR
- Manual execution

**Checks:**

- ESLint (code style and quality)
- Prettier (formatting)

### 🌙 Nightly Tests (Automatic)

**Schedule:**

- Every night at 4:00 AM Kyiv time

**Features:**

- Runs all tests on 3 browsers
- Creates detailed report
- Auto-creates Issue on failure

## Viewing Results

### GitHub Actions UI

```
GitHub Repository → Actions tab → Select workflow
```

### Allure Reports

Reports available at:

```
https://sotnikovmaksym.github.io/QA-automation-repo/{run-number}
```

### Test Summary

After each run, an automatic summary is created:

```
Actions → Specific run → Summary section
```

## Troubleshooting

### ❌ Workflow Not Starting

**Problem:** Push code but workflow doesn't start

**Solution:**

1. Verify files in `.github/workflows/` have `.yml` extension
2. Check permissions: Settings → Actions → General → Workflow permissions
3. Validate YAML syntax

### ❌ Allure Report Not Publishing

**Problem:** Tests run but report not accessible

**Solution:**

1. Enable GitHub Pages: Settings → Pages
2. Select `gh-pages` branch
3. Wait 2-3 minutes after first run
4. Check workflow permissions (Read and write)

### ❌ Tests Fail on CI

**Problem:** Tests pass locally but fail on CI

**Solution:**

1. Review logs in Actions
2. Verify `waitFor` usage for dynamic elements
3. Add `test.setTimeout()` for slow tests
4. Check screenshots in artifacts

## Useful Commands

### Local Verification Before Push

```bash
# Run tests
npm test

# Check lint
npm run lint

# Fix lint errors
npm run lint:fix

# Format code
npm run format

# Generate Allure report
npm run test:allure
```

### Git Workflow

```bash
# Create new feature branch
git checkout -b feature/my-new-test

# Add changes
git add .
git commit -m "test: add new test for feature X"

# Push and create PR
git push origin feature/my-new-test
```

## Best Practices

### ✅ DO

- Write descriptive commit messages
- Run tests locally before push
- Check lint before commit
- Create PRs for review
- Add comments to tests
- Use `test.describe` for grouping
- Review Allure report after runs

### ❌ DON'T

- Don't commit code with `test.only()`
- Don't ignore lint errors
- Don't push directly to `main`
- Don't use hardcoded timeouts
- Don't leave console.log in production code

## Status Badges

Add these badges to your README:

```markdown
[![Playwright Tests](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/playwright-tests.yml)

[![Code Quality](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/code-quality.yml/badge.svg)](https://github.com/SotnikovMaksym/QA-automation-repo/actions/workflows/code-quality.yml)
```

## Next Steps

- [ ] Add Slack/Discord notifications
- [ ] Jira integration
- [ ] Performance testing
- [ ] Visual regression testing
- [ ] API testing workflow
- [ ] Security scanning (Dependabot, Snyk)

## Support

If you have questions:

- Create an Issue in the repository
- Review [Documentation](workflows/README.md)
- Use templates for Issues and PRs
