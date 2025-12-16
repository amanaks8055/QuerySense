@echo off
echo Starting QuerySense Setup...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo Please edit .env and add your OPENROUTER_API_KEY
    echo.
)

REM Build and start containers
echo Building Docker containers...
docker-compose build --no-cache

echo.
echo Starting services...
docker-compose up -d

echo.
echo Waiting for services to be healthy...
timeout /t 10 >nul

REM Check service health
echo.
echo Checking service status...
docker-compose ps

echo.
echo QuerySense is running!
echo.
echo Access points:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:3000
echo    Database:  localhost:5432
echo.
echo Demo credentials:
echo    User:  demo@querysense.app / demo123
echo    Admin: admin@querysense.app / admin123
echo.
echo View logs: docker-compose logs -f
echo Stop:      docker-compose down
pause
