# 🔐 Secrets and Environment Variables

## Overview

This document describes secrets and environment variables used in GitHub Actions workflows.

## Required Secrets

### `GITHUB_TOKEN`

**Type:** Automatically provided by GitHub  
**Used in:** All workflows  
**Purpose:** GitHub Actions authentication for API access

**No action required** - this token is automatically provided by GitHub Actions.

## Optional Secrets

### For Future Enhancements

These secrets may be needed for extended functionality:

#### `SLACK_WEBHOOK_URL`

**Type:** String  
**Purpose:** Send test results notifications to Slack  
**How to add:**

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `SLACK_WEBHOOK_URL`
4. Value: Your Slack webhook URL

**Example usage in workflow:**

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
      status: ${{ job.status }}
      webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### `DISCORD_WEBHOOK`

**Type:** String  
**Purpose:** Send notifications to Discord  
**How to add:**

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `DISCORD_WEBHOOK`
4. Value: Your Discord webhook URL

#### `JIRA_BASE_URL`, `JIRA_USER_EMAIL`, `JIRA_API_TOKEN`

**Type:** String  
**Purpose:** Jira integration for automatic ticket creation  
**How to add:**

1. Settings → Secrets and variables → Actions
2. Add each secret separately

## Environment Variables

### Built-in GitHub Variables

These variables are automatically available in workflows:

| Variable            | Description     | Example                                    |
| ------------------- | --------------- | ------------------------------------------ |
| `GITHUB_TOKEN`      | Auth token      | `${{ secrets.GITHUB_TOKEN }}`              |
| `GITHUB_REPOSITORY` | Repository name | `SotnikovMaksym/QA-automation-repo`        |
| `GITHUB_REF`        | Branch/tag ref  | `refs/heads/lesson22`                      |
| `GITHUB_SHA`        | Commit SHA      | `ffac537e6cbbf934b08745a378932722df287a53` |
| `GITHUB_WORKFLOW`   | Workflow name   | `Playwright Tests`                         |
| `GITHUB_RUN_ID`     | Unique run ID   | `1234567890`                               |
| `GITHUB_RUN_NUMBER` | Run number      | `42`                                       |
| `GITHUB_ACTOR`      | User triggered  | `SotnikovMaksym`                           |

### Custom Environment Variables

Defined in `playwright.config.ts`:

```typescript
environmentInfo: {
    framework: 'Playwright',
    E2E_NODE_VERSION: process.version,
    E2E_OS: process.platform
}
```

## Workflow Permissions

### Required Permissions

In `Settings → Actions → General → Workflow permissions`:

- ✅ **Read and write permissions**
- ✅ **Allow GitHub Actions to create and approve pull requests**

### Specific Permissions per Job

#### Playwright Tests Workflow

```yaml
permissions:
    contents: read # Read repository
    pages: write # Deploy to GitHub Pages
    id-token: write # OIDC for Pages
    issues: write # Create issues on failure
```

#### Code Quality Workflow

```yaml
permissions:
    contents: read # Read repository
    pull-requests: write # Comment on PRs
    checks: write # Create checks
```

## Security Best Practices

### ✅ DO

1. **Never commit secrets** to repository
2. **Use GitHub Secrets** for sensitive data
3. **Limit secret access** to necessary workflows
4. **Rotate secrets regularly**
5. **Use environment-specific secrets**
6. **Enable Dependabot** for security updates
7. **Review workflow permissions** regularly

### ❌ DON'T

1. **Don't log secrets** in workflow output
2. **Don't use secrets in PR** from forks (disabled by default)
3. **Don't share secrets** between repositories unnecessarily
4. **Don't use weak credentials**
5. **Don't commit `.env` files**

## Adding New Secrets

### Via GitHub UI

1. Navigate to repository **Settings**
2. Go to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter **Name** and **Value**
5. Click **Add secret**

### Via GitHub CLI

```bash
# Add a secret
gh secret set SECRET_NAME

# List secrets
gh secret list

# Remove a secret
gh secret remove SECRET_NAME
```

## Environment Protection Rules

For production environments, you can configure additional protection:

### Settings → Environments → New environment

1. **Environment name:** `production`
2. **Required reviewers:** Select team members
3. **Wait timer:** 5 minutes
4. **Deployment branches:** Only `main`

### Using in Workflow

```yaml
jobs:
    deploy:
        runs-on: ubuntu-latest
        environment:
            name: production
            url: https://example.com
        steps:
            - name: Deploy
              run: echo "Deploying to production"
```

## Secrets for Third-party Integrations

### Allure TestOps (Optional)

```yaml
secrets:
    ALLURE_ENDPOINT: https://allure.example.com
    ALLURE_TOKEN: your_token_here
    ALLURE_PROJECT_ID: 123
```

### Browserstack (Optional)

```yaml
secrets:
    BROWSERSTACK_USERNAME: your_username
    BROWSERSTACK_ACCESS_KEY: your_key
```

### Sauce Labs (Optional)

```yaml
secrets:
    SAUCE_USERNAME: your_username
    SAUCE_ACCESS_KEY: your_key
```

## Debugging Secrets Issues

### Check if secret exists

```yaml
- name: Check Secret
  run: |
      if [ -z "${{ secrets.MY_SECRET }}" ]; then
        echo "Secret MY_SECRET is not set"
        exit 1
      else
        echo "Secret MY_SECRET is set"
      fi
```

### Mask sensitive output

GitHub automatically masks secrets in logs, but for additional security:

```yaml
- name: Use Secret
  run: |
      echo "::add-mask::$MY_VALUE"
      echo "Value: $MY_VALUE"
  env:
      MY_VALUE: ${{ secrets.MY_SECRET }}
```

## Troubleshooting

### Secret not available in workflow

**Problem:** Workflow can't access secret

**Solutions:**

1. Verify secret name matches exactly (case-sensitive)
2. Check workflow permissions
3. Ensure secret is in correct scope (repo/environment/org)
4. For PRs from forks, secrets are not available (security)

### Secret value incorrect

**Problem:** Secret has wrong value

**Solutions:**

1. Update secret in Settings → Secrets
2. Re-run workflow
3. Check for special characters encoding
4. Verify no trailing spaces

## Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)
- [Environment Protection Rules](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
