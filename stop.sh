#!/bin/bash

echo "🛑 Stopping MERN Auth Application..."

docker-compose down

echo "✅ All services stopped"

# Clean up unused containers and images (optional)
echo "🧹 Cleaning up unused Docker resources..."
docker system prune -f

echo "🎯 Cleanup completed"