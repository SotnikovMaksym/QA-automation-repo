# Lesson 23 - Docker, WSL 2 and Test Automation

## Project Overview
This project demonstrates:
- Setting up WSL 2 and Docker on Windows
- Containerizing a React application (Expense Tracker)
- UI test automation with Playwright
- ReportPortal configuration for test reporting

## Prerequisites

### 1. WSL 2 Installation (Windows 10/11)

Check WSL installation:
```powershell
wsl --status
```

Install WSL 2:
```powershell
wsl --install
```

System reboot required after installation.

Verify WSL version:
```powershell
wsl --list --verbose
```

Install Ubuntu:
```powershell
wsl --install -d Ubuntu
```

### 2. Docker Desktop Installation

Download Docker Desktop: https://www.docker.com/products/docker-desktop/

Enable WSL 2 based engine in Docker Desktop Settings → General

Verify installation:
```powershell
docker --version
docker compose version
```

## Project Structure

```
lesson23/
├── docker-compose.yml              # Main orchestration file
├── Dockerfile                      # Playwright tests container
├── playwright.config.ts            # Playwright configuration
├── .env.example                    # Environment variables template
├── .dockerignore                  # Docker exclusions
├── expense-tracker-app/
│   ├── Dockerfile                 # Application container
│   ├── nginx.conf                 # Nginx configuration
│   ├── .dockerignore             # Application exclusions
│   └── package.json              # App dependencies
├── reportportal/
│   └── docker-compose.yml        # ReportPortal services
├── tests/
│   └── expense-tracker/
│       └── expense-tracker.spec.ts # UI tests
├── src/
│   └── pages/
│       └── expense-tracker/
│           └── expense-tracker-page.ts # Page Object
├── package.json                   # Test dependencies
├── tsconfig.json                  # TypeScript config
└── README.md
```

## Quick Start

### 1. Clone Expense Tracker Application
```powershell
git clone https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS.git expense-tracker-app
cd lesson23
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Configure Environment (Optional)
```powershell
Copy-Item .env.example .env
# Edit .env with your ReportPortal credentials
```

### 4. Start Full Stack
```powershell
docker-compose up --build -d
```

### 5. Verify Services
- Expense Tracker App: http://localhost:3000
- ReportPortal UI: http://localhost:8082 (default: superadmin/erebus)
- ReportPortal API: http://localhost:8080

### 6. Run Tests
```powershell
docker-compose run playwright-tests npm test
```

## Running Tests

#### Return to test folder
```powershell
cd ..\lesson23
```

#### Install dependencies (if not already installed)
```powershell
npm install
```

#### Install Playwright browsers
```powershell
npx playwright install
```

#### Run tests
```powershell
npm test
```

#### Run tests in headed mode
```powershell
npm run test:headed
```

#### Run in UI mode
```powershell
npm run test:ui
```

## ReportPortal Setup

### Initial Setup

1. Start ReportPortal services:
```powershell
docker-compose up postgres rabbitmq elasticsearch analyzer api ui -d
```

2. Wait for services to be healthy (2-3 minutes)

3. Access ReportPortal UI: http://localhost:8082

4. Login with default credentials:
   - Login: `superadmin`
   - Password: `erebus`

### Create Project and Get API Key

1. Create new project: Click "Add New Project"
2. Enter project name (e.g., "expense-tracker")
3. Go to Profile → API Keys
4. Generate new API key
5. Copy API key

### Configure Tests

Create `.env` file from template:
```powershell
Copy-Item .env.example .env
```

Update `.env` with your settings:
```env
REPORTPORTAL_API_KEY=your-api-key-here
REPORTPORTAL_ENDPOINT=http://localhost:8080
REPORTPORTAL_PROJECT=expense-tracker
REPORTPORTAL_LAUNCH=Expense Tracker Tests
```

### Run Tests with ReportPortal

In Docker:
```powershell
docker-compose run -e RP_API_KEY=your-api-key playwright-tests npm test
```

Locally:
```powershell
npm test
```

View results at: http://localhost:8082/ui/#expense-tracker/launches

Stop ReportPortal:
```powershell
docker-compose down
```

## Docker Management

List running containers:
```powershell
docker ps
```

View container logs:
```powershell
docker logs <container-name>
```

Stop all services:
```powershell
docker-compose down
```

Remove all containers and volumes:
```powershell
docker-compose down -v
```

Rebuild containers:
```powershell
docker-compose build --no-cache
```

## Test Details

Test Suite: Expense Tracker Application

File: `tests/expense-tracker/expense-tracker.spec.ts`

Test Cases:
1. Should load the application successfully
2. Should add a new expense
3. Should add multiple expenses
4. Should not add expense with empty fields
5. Should display expense list correctly

Page Object: `src/pages/expense-tracker/expense-tracker-page.ts`

## Troubleshooting

### Docker Issues

**Docker command not found:**
```powershell
# Refresh PATH environment variable
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**Container won't start:**
```powershell
# Check Docker Desktop is running
# View container logs
docker compose logs
Docker command not found:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Container won't start:
```powershell
docker compose logs
```

WSL not working after installation:
- Reboot system
- Check BIOS virtualization is enabled

Tests failing:
```powershell
curl http://localhost:3000
npx playwright install
- **ReportPortal** - Test management and reporting system

## Code Quality

### ESLint
```powershell
npm run lint
```

### Prettier
```powershell
npm run format
```

##WSL 2 - Windows Subsystem for Linux
- Docker Desktop - Container platform
- Docker Compose - Container orchestration
- Nginx - Web server
- React.js - Frontend framework
- Playwright - UI testing framework
- TypeScript - Test language
- Node.js - Runtime environment
- ReportPortal - Test reporting system

## Code Quality

ESLint:
```powershell
npm run lint
```

Prettier:
```powershell
npm run format
```

## Assignment Requirements

1. WSL 2 Installation - Installed and configured
2. Docker Installation - Docker Desktop running
3. Expense Tracker Containerization - Running on port 3000
4. UI Test Automation - 5 tests written and passing
5. ReportPortal Setup - Configured with docker-compose

## Quick Commands

Start everything:
```powershell
docker-compose up --build -d
```

Stop everything:
```powershell
docker-compose down
```

View running containers:
```powershell
docker ps
```

Access services:
- Expense Tracker: http://localhost:3000
- ReportPortal: http://localhost:8082