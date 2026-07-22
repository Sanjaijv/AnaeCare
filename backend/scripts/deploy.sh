#!/bin/bash
set -e

echo "Starting deployment for AnaeCare..."

# Navigate to the root directory
cd "$(dirname "$0")/../.." || exit

# Pull the latest changes
echo "Pulling latest changes from git..."
git pull origin main

# Build and restart containers using production docker-compose
echo "Rebuilding and restarting Docker containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Run any database migrations
echo "Running database migrations..."
docker exec anaecare_backend_prod alembic upgrade head

echo "Deployment completed successfully!"
