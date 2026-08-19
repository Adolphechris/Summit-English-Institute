#!/bin/bash

# ============================================================================
# Summit English Institute — Sauvegarde PostgreSQL
# Usage : bash scripts/backup.sh
# Pré-requis : DATABASE_URL défini (ou psql configuré localement)
# ============================================================================

set -e

BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"

STAMP=$(date +%Y%m%d_%H%M%S)
FILE="$BACKUP_DIR/summit_english_$STAMP.sql"

if [ -z "$DATABASE_URL" ]; then
    echo "ℹ️  DATABASE_URL non défini — sauvegarde de la base locale 'summit_english'."
fi

echo "🗄️  Sauvegarde de la base..."
pg_dump "${DATABASE_URL:-summit_english}" -f "$FILE"

echo "✅ Sauvegarde créée : $FILE"
echo "ℹ️  Conservez les sauvegardes hors du dossier du projet pour la production."
