# Lesson 23 - Docker, WSL 2 and Test Automation

## Project Overview
This project demonstrates:
- Setting up WSL 2 and Docker on Windows
- Containerizing a React application (Expense Tracker)
- UI test automation with Playwright
- ReportPortal configuration for test reporting

## Prerequisites

### 1. WSL 2 Installation

#### Check WSL installation
```powershell
wsl --status
```

#### Install WSL 2 (if not installed)
```powershell
wsl --install
```

**System reboot required** after installation.

#### Verify WSL version
```powershell
wsl --list --verbose
```

Ensure you're using WSL version 2.

#### Install Ubuntu (if needed)
```powershell
wsl --install -d Ubuntu
```

### 2. Docker Desktop Installation

1. Download Docker Desktop for Windows from:
   https://www.docker.com/products/docker-desktop/

2. Run the installer and follow the instructions

3. After installation, ensure Docker Desktop uses WSL 2:
   - Open Docker Desktop
   - Go to Settings → General
   - Enable "Use the WSL 2 based engine"

4. Verify installation:
```powershell
docker --version
docker compose version
```

## Project Structure

```
lesson23/
├── reportportal/
│   └── docker-compose.yml          # ReportPortal configuration
├── tests/
│   └── expense-tracker/
│       └── expense-tracker.spec.ts # UI tests
├── src/
│   └── pages/
│       └── expense-tracker/
│           └── expense-tracker-page.ts # Page Object
└── README.md

../expense-tracker/                  # React application
├── Dockerfile                       # Application Dockerfile
├── docker-compose.yml              # Container configuration
├── nginx.conf                      # Nginx configuration
└── .dockerignore                   # Docker exclusions
```

## Running the Project

### 1. Start Expense Tracker Application

#### Navigate to application folder
```powershell
cd ..\expense-tracker
```

#### Build and start container
```powershell
docker compose up --build -d
```

#### Verify it's running
Open browser: http://localhost:3000

#### View logs
```powershell
docker compose logs -f
```

#### Stop container
```powershell
docker compose down
```

### 2. Run Playwright Tests

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

### 3. ReportPortal Setup

#### Navigate to ReportPortal folder
```powershell
cd reportportal
```

#### Start ReportPortal
```powershell
docker compose up -d
```

#### Check container status
```powershell
docker compose ps
```

#### View logs
```powershell
docker compose logs -f
```

#### Access ReportPortal UI
Open browser: http://localhost:8080

**Default credentials:**
- Login: `superadmin`
- Password: `erebus`

#### Stop ReportPortal
```powershell
docker compose down
```

## Docker Management

### Useful Docker Commands

```powershell
# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs <container-name>

# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# List images
docker images

# Remove unused images
docker image prune -a

# View resource usage
docker stats
```

## Test Details

### Test Suite: Expense Tracker Application

**File:** `tests/expense-tracker/expense-tracker.spec.ts`

**Test Cases:**
1. ✅ Should load the application successfully
2. ✅ Should add a new expense
3. ✅ Should add multiple expenses
4. ✅ Should not add expense with empty fields
5. ✅ Should display expense list correctly

**Page Object:** `src/pages/expense-tracker/expense-tracker-page.ts`

### Running Specific Tests

```powershell
# Run specific test file
npx playwright test expense-tracker.spec.ts

# Run tests matching pattern
npx playwright test --grep "add expense"

# Run in debug mode
npx playwright test --debug
```

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

# Restart Docker Desktop
```

### WSL Issues

**WSL not working after installation:**
- Reboot your system
- Check BIOS virtualization is enabled

**Check WSL status:**
```powershell
wsl --status
wsl --list --verbose
```

### Test Issues

**Tests failing:**
```powershell
# Ensure application is running
curl http://localhost:3000

# Check Playwright browsers are installed
npx playwright install

# Run tests in UI mode for debugging
npm run test:ui
```

## Technologies Used

- **WSL 2** - Windows Subsystem for Linux
- **Docker Desktop** - Container platform
- **Docker Compose** - Container orchestration
- **Nginx** - Web server for serving React app
- **React.js** - Frontend application framework
- **Playwright** - UI testing framework
- **TypeScript** - Test development language
- **Node.js** - Runtime environment
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

## Assignment Requirements

✅ **1. WSL 2 Installation** - Installed and configured  
✅ **2. Docker Installation** - Docker Desktop 29.1.3 running  
✅ **3. Expense Tracker Containerization** - Running on port 3000  
✅ **4. UI Test Automation** - 5 tests written and passing  
✅ **5. ReportPortal Setup** - Configured with docker-compose

## Quick Commands Reference

```powershell
# Start everything
cd ..\expense-tracker && docker compose up -d
cd ..\lesson23 && npm test

# Stop everything
cd ..\expense-tracker && docker compose down
cd reportportal && docker compose down

# View all running containers
docker ps

# View application
start http://localhost:3000

# View ReportPortal
start http://localhost:8080
```

## License

This is an educational project for Lesson 23.

## Repository

- **Expense Tracker App:** [AhmedShaykh/Expense-Tracker-App-With-React.JS](https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS)
- **ReportPortal:** [Official Documentation](https://reportportal.io/)
