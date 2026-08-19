#!/bin/bash

# ============================================================================
# Summit English Institute — Script d'installation initiale (v2 robuste)
# ============================================================================

set -e

echo "🚀 Installation de Summit English Institute..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez-le depuis https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js version: $(node --version)"

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable. Êtes-vous dans le dossier du projet ?"
    echo "   cd '/home/adolphe/Summit English Institute'"
    exit 1
fi

# Vérifier PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL n'est pas installé ou pas dans le PATH."
    echo "   Installez-le avec: sudo apt install postgresql postgresql-contrib"
    exit 1
fi
echo "✓ PostgreSQL disponible"

# Détecter l'utilisateur PostgreSQL
PGUSER=$(psql -c "SELECT current_user;" 2>/dev/null | head -n 3 | tail -n 1 | tr -d ' ' || echo "")
if [ -z "$PGUSER" ] || [ "$PGUSER" = "current_user" ]; then
    # Essayer avec l'utilisateur système
    PGUSER=$(whoami)
    echo "ℹ️  Utilisateur PostgreSQL détecté: $PGUSER (même que l'utilisateur système)"
else
    echo "✓ Utilisateur PostgreSQL: $PGUSER"
fi

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "📋 Configuration de l'environnement..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✓ Fichier .env.local créé"
else
    echo "✓ .env.local existe déjà"
fi

# Mettre à jour DATABASE_URL avec l'utilisateur détecté
CURRENT_DB_URL=$(grep "^DATABASE_URL=" .env.local | head -n 1)
NEW_DB_URL="DATABASE_URL=postgresql://$PGUSER@localhost:5432/summit_english"

if [ "$CURRENT_DB_URL" != "$NEW_DB_URL" ]; then
    # Remplacer la ligne DATABASE_URL
    sed -i "s|^DATABASE_URL=.*|$NEW_DB_URL|" .env.local
    echo "✓ DATABASE_URL mis à jour avec l'utilisateur: $PGUSER"
fi

echo ""
echo "🗄️  Configuration de la base de données..."

# Créer la base de données
echo "   Création de la base de données..."
psql -c "CREATE DATABASE summit_english;" 2>/dev/null || echo "   ⚠️  La base existe peut-être déjà"

# Appliquer le schéma
echo "   Application du schéma..."
psql -d summit_english -f database/schema.sql

# Appliquer les migrations (idempotentes) — ex. évaluation finale id=999
echo "   Application des migrations..."
for migration in database/migrations/*.sql; do
    echo "   → $migration"
    psql -d summit_english -f "$migration"
done

# Appliquer les seeds
echo "   Insertion des données initiales..."
psql -d summit_english -f database/seeds/initial_data.sql
psql -d summit_english -f database/seeds/test_users.sql

echo ""
echo "✅ Installation terminée avec succès !"
echo ""
echo "Pour démarrer le projet :"
echo "  cd '/home/adolphe/Summit English Institute'"
echo "  npm run dev"
echo ""
echo "Puis ouvrez http://localhost:3000"
echo ""
echo "Comptes de test :"
echo "  Étudiant: test@summit-english.local / test1234"
echo "  Admin:    admin@summit-english.local / admin1234"
