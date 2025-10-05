#!/bin/bash

set -e

BACKUP_DIR="./mongo-backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$DATE"

echo "💾 Creating MongoDB backup..."

# Create backup directory
mkdir -p $BACKUP_PATH

# Create MongoDB dump
docker exec mern-auth-mongo mongodump \
  --db mern-auth \
  --username mernuser \
  --password mernpassword \
  --authenticationDatabase admin \
  --out /backup/$DATE

# Copy backup from container
docker cp mern-auth-mongo:/backup/$DATE $BACKUP_PATH/

# Create compressed archive
tar -czf $BACKUP_PATH.tar.gz -C $BACKUP_DIR $DATE

# Remove uncompressed backup
rm -rf $BACKUP_PATH

echo "✅ Backup created: $BACKUP_PATH.tar.gz"

# List recent backups
echo ""
echo "📦 Recent backups:"
ls -lt $BACKUP_DIR/*.tar.gz | head -5