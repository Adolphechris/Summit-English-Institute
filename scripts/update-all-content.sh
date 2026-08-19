#!/bin/bash

# ============================================================================
# Summit English Institute — Script de mise à jour complète du contenu
# ============================================================================

set -e

echo "🚀 Mise à jour complète du contenu pédagogique..."
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

echo "📊 Application des mises à jour..."
echo ""

# Appliquer le contenu enrichi initial
echo "   → Contenu enrichi initial"
psql -d summit_english -f database/seeds/enriched_content.sql

# Appliquer le contenu des niveaux 3-8
echo "   → Contenu des niveaux 3-8"
psql -d summit_english -f database/seeds/levels_3_to_8_content.sql

# Appliquer la banque massive de questions
echo "   → Banque massive de questions"
psql -d summit_english -f database/seeds/massive_questions.sql

echo ""
echo "✅ Mise à jour terminée !"
echo ""
echo "Contenu ajouté :"
echo "  - Niveau 3: Grammar (articles, prepositions, comparatives)"
echo "  - Niveau 4: Conversation (meetings, professional communication)"
echo "  - Niveau 6: IT (version control, system administration)"
echo "  - Niveau 7: Cybersecurity (incident response, policies)"
echo "  - Niveau 8: Academic & Professional (documentation, presentations)"
echo ""
echo "  - 200+ questions couvrant tous les niveaux"
echo "  - Mix de types: QCM, fill-in-the-blank, transformation, error correction, scenario"
echo ""
echo "Redémarrez l'application si elle est en cours d'exécution."
