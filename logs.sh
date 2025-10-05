#!/bin/bash

echo "📋 Showing logs for MERN Auth Application..."

# Check if specific service is requested
if [ $# -eq 0 ]; then
    docker-compose logs -f
else
    docker-compose logs -f $1
fi