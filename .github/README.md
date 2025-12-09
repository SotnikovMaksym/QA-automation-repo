# 📚 GitHub Actions CI/CD Documentation

Welcome to the CI/CD documentation for the Football.ua Test Automation Project!

## 🚀 Quick Start

For first-time CI/CD setup:

1. 🏃 **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide with step-by-step instructions
2. 🔐 **[SECRETS.md](SECRETS.md)** - Secrets and environment variables configuration

## 📖 Documentation

### Workflows

📁 **[workflows/README.md](workflows/README.md)** - Comprehensive workflow documentation:

- **Playwright Tests** - Main automated test workflow
- **Manual Tests** - Manual execution with custom parameters
- **Code Quality** - ESLint and Prettier checks
- **Nightly Tests** - Full test suite on all browsers

### Templates

#### Issues

- 🐛 **[bug-report.md](ISSUE_TEMPLATE/bug-report.md)** - Bug report template
- ✨ **[feature-request.md](ISSUE_TEMPLATE/feature-request.md)** - Feature request template

#### Pull Requests

- 📝 **[PULL_REQUEST_TEMPLATE.md](PULL_REQUEST_TEMPLATE.md)** - PR template with checklist

### Configuration

- ⚙️ **[dependabot.yml](dependabot.yml)** - Automatic dependency updates

## 🎯 Features

- ✅ Automated test execution on push and PR
- ✅ Scheduled daily test runs
- ✅ Parallel test execution (sharding)
- ✅ Allure report generation
- ✅ GitHub Pages deployment
- ✅ Code quality checks
- ✅ Manual test execution with parameters
- ✅ Cross-browser testing
- ✅ Automatic dependency updates

## 📊 Workflows Overview

| Workflow         | Trigger                    | Purpose                                   |
| ---------------- | -------------------------- | ----------------------------------------- |
| Playwright Tests | Push, PR, Schedule, Manual | Main test execution with Allure reporting |
| Manual Tests     | Manual only                | Run specific tests with custom parameters |
| Code Quality     | Push, PR                   | ESLint and Prettier checks                |
| Nightly Tests    | Schedule (nightly), Manual | Full cross-browser test suite             |

## 🔧 Setup Requirements

1. **GitHub Pages**: Enable in Settings → Pages
2. **Permissions**: Configure in Settings → Actions → General
    - Read and write permissions
    - Allow GitHub Actions to create and approve pull requests
3. **Secrets**: Optional, for extended integrations

## 📈 Monitoring

- **Status Badges**: Available in main README
- **Allure Reports**: Published to GitHub Pages
- **Workflow Runs**: View in Actions tab
- **Test Summary**: Automatic summary after each run

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [Allure Report Documentation](https://docs.qameta.io/allure/)

## 📞 Support

- Review [QUICKSTART.md](QUICKSTART.md) for common issues
- Check [workflows/README.md](workflows/README.md) for detailed information
- Create an issue using provided templates

---

**Last Updated:** December 2025  
**Maintained by:** QA Automation Team
