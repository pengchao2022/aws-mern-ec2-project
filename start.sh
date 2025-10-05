#!/bin/bash

set -e

echo "🚀 Starting MERN Auth Application with MongoDB..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p mongo-data
mkdir -p mongo-backups

# Set proper permissions for MongoDB data directory
echo "🔧 Setting permissions..."
sudo chown -R 999:999 mongo-data
sudo chmod -R 755 mongo-data

# Create production environment file if it doesn't exist
if [ ! -f .env.production ]; then
    echo "📝 Creating production environment file..."
    cat > .env.production << EOF
NODE_ENV=production
MONGO_URI=mongodb://mernuser:mernpassword@mongo:27017/mern-auth?authSource=admin
JWT_SECRET=your_super_secure_jwt_secret_key_$(openssl rand -base64 32)
PORT=5000
EOF
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose build --no-cache
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

# Health checks
echo "🏥 Performing health checks..."

# Check MongoDB
if docker exec mern-auth-mongo mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is healthy"
else
    echo "❌ MongoDB health check failed"
fi

# Check Server
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Server is healthy"
else
    echo "❌ Server health check failed"
fi

# Check Client
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Client is healthy"
else
    echo "❌ Client health check failed"
fi

# Get EC2 public IP (if available)
echo "🌐 Application URLs:"
echo "   Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo 'localhost')"
echo "   Backend API: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo 'localhost'):5000"
echo "   MongoDB: localhost:27017"

echo ""
echo "🎉 MERN Auth Application started successfully!"
echo "📊 Use './logs.sh' to view logs"
echo "🛑 Use './stop.sh' to stop the application"