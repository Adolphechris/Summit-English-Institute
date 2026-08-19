#!/bin/bash

# ============================================================================
# Summit English Institute — Application des migrations (ordre versionné)
# Usage : bash scripts/migrate.sh
# Pré-requis : DATABASE_URL défini (ou psql configuré localement)
# ============================================================================

set -e

if [ ! -d "database/migrations" ]; then
    echo "❌ Dossier database/migrations introuvable."
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "ℹ️  DATABASE_URL non défini — utilisation de la base locale 'summit_english'."
fi

echo "🚀 Application des migrations dans l'ordre..."

for f in database/migrations/*.sql; do
    echo "   → $(basename "$f")"
    psql -d "${DATABASE_URL:-summit_english}" -f "$f" -q
done

echo ""
echo "✅ Migrations appliquées avec succès."