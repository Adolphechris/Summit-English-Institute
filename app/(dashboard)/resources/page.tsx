'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: 'Guides & Fiches Mémo IT',
      description: 'Documents de référence pour le vocabulaire et les tournures professionnelles.',
      items: [
        { name: 'Guide de Communication Agile & Stand-ups (PDF)', size: '2.4 MB', tag: 'Vocabulaire', icon: '📄' },
        { name: 'Glossaire Technique IT & Cloud Computing (PDF)', size: '3.1 MB', tag: 'Glossaire', icon: '☁️' },
        { name: 'Modèles d\'Emails Professionnels & Tickets Jira (PDF)', size: '1.8 MB', tag: 'Templates', icon: '✉️' },
        { name: 'Fiche Synthèse : Temps & Grammaire en Anglais IT (PDF)', size: '1.5 MB', tag: 'Grammaire', icon: '📝' },
      ],
    },
    {
      title: 'Audio & Prononciation',
      description: 'Exercices d\'écoute et prononciation des termes techniques anglophones.',
      items: [
        { name: 'Prononciation des acronymes IT & Architecture (Audio MP3)', size: '14.2 MB', tag: 'Audio', icon: '🎧' },
        { name: 'Simulations de réunions techniques en anglais (Audio MP3)', size: '28.5 MB', tag: 'Audio', icon: '🎙️' },
      ],
    },
    {
      title: 'Outils & Liens Recommandés',
      description: 'Plateformes externes et ressources complémentaires pour pratiquer au quotidien.',
      items: [
        { name: 'Documentation officielle MDN & AWS en anglais technique', size: 'Lien web', tag: 'Documentation', icon: '🌐' },
        { name: 'Guide de préparation aux entretiens techniques internationaux', size: 'Guide interactif', tag: 'Carrière', icon: '💼' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">📚 Ressources Pédagogiques</h1>
        <p className="text-slate-600 mt-2">
          Téléchargez vos supports de cours, fiches récapitulatives et guides d'anglais professionnel IT.
        </p>
      </div>

      <div className="space-y-6">
        {resourceCategories.map((cat, idx) => (
          <Card key={idx} className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{cat.title}</h2>
            <p className="text-sm text-slate-500 mb-6">{cat.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-700">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="info" size="sm">{item.tag}</Badge>
                        <span className="text-xs text-slate-400">{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="secondary" size="sm" className="ml-3 flex-shrink-0">
                    Consulter
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
