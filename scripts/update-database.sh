#!/bin/bash

# ============================================================================
# Summit English Institute — Script de mise à jour de la base de données
# ============================================================================

set -e

echo "🚀 Mise à jour de la base de données..."
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable."
    echo "   cd '/home/adolphe/Summit English Institute'"
    exit 1
fi

# Vérifier PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL n'est pas installé ou pas dans le PATH."
    exit 1
fi

echo "📊 Application des migrations et seeds..."
echo ""

# Appliquer le schéma
echo "   → Schéma de base"
psql -d summit_english -f database/schema.sql

# Appliquer les seeds initiales
echo "   → Données initiales"
psql -d summit_english -f database/seeds/initial_data.sql

# Appliquer le contenu enrichi
echo "   → Contenu enrichi (20 jours)"
psql -d summit_english -f database/seeds/enriched_content.sql

# Appliquer les utilisateurs de test
echo "   → Utilisateurs de test"
psql -d summit_english -f database/seeds/test_users.sql

echo ""
echo "✅ Base de données mise à jour avec succès !"
echo ""
echo "Contenu ajouté :"
echo "  - 8 niveaux"
echo "  - 11+ modules"
echo "  - 3+ leçons avec exemples, vocabulaire, expressions"
echo "  - 40+ questions couvrant tous les types"
echo "  - 2 utilisateurs de test"
echo ""
echo "Pour démarrer l'application :"
echo "  npm run dev"
echo ""
echo "Puis ouvrez http://localhost:7000"
