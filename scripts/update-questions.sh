#!/bin/bash

# ============================================================================
# Summit English Institute — Script de mise à jour de la banque de questions
# ============================================================================

set -e

echo "📚 Mise à jour de la banque de questions..."
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

echo "📊 Application des questions..."
echo ""

# Appliquer le contenu enrichi
echo "   → Contenu enrichi"
psql -d summit_english -f database/seeds/enriched_content.sql

# Appliquer la banque massive de questions
echo "   → Banque massive de questions (165+ questions)"
psql -d summit_english -f database/seeds/massive_questions.sql

echo ""
echo "✅ Banque de questions mise à jour !"
echo ""
echo "Total questions: 200+"
echo "  - Niveau 1: 30 questions"
echo "  - Niveau 2: 30 questions"
echo "  - Niveau 3: 30 questions"
echo "  - Niveau 4: 25 questions"
echo "  - Niveau 6: 40 questions"
echo "  - Niveau 7: 30 questions"
echo "  - Niveaux 5, 8 et divers: 35 questions"
echo ""
echo "Redémarrez l'application si elle est en cours d'exécution."
