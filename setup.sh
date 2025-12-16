#!/bin/bash

echo "🚀 Starting QuerySense Setup..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from template..."
  cp .env.example .env
  echo "⚠️  Please edit .env and add your OPENROUTER_API_KEY"
  echo ""
fi

# Build and start containers
echo "🐳 Building Docker containers..."
docker-compose build --no-cache

echo ""
echo "✅ Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ QuerySense is running!"
echo ""
echo "📍 Access points:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:3000"
echo "   Database:  localhost:5432"
echo ""
echo "👤 Demo credentials:"
echo "   User:  demo@querysense.app / demo123"
echo "   Admin: admin@querysense.app / admin123"
echo ""
echo "📚 View logs: docker-compose logs -f"
echo "🛑 Stop:      docker-compose down"
