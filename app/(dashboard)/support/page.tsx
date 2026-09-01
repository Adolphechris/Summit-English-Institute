'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Comment fonctionne la validation des niveaux et le certificat ?',
      a: 'Pour obtenir votre certificat, vous devez atteindre au minimum 80% de progression globale et réussir l\'examen final. Votre diplôme sera alors instantanément disponible au téléchargement.',
    },
    {
      q: 'Comment fonctionne l\'algorithme de répétition espacée (SRS) ?',
      a: 'Le système SRS analyse vos réponses lors des quiz et exercices. Les notions avec des erreurs vous sont reproposées automatiquement à intervalles stratégiques (1 jour, 3 jours, 7 jours) pour ancrer la mémorisation à long terme.',
    },
    {
      q: 'Puis-je réinitialiser mon parcours ou reprendre le test diagnostique ?',
      a: 'Vous pouvez repasser le test diagnostique à tout moment depuis le menu Diagnostic pour réévaluer vos compétences et ajuster vos recommandations d\'apprentissage.',
    },
    {
      q: 'Quel est le rythme recommandé pour suivre les 20 jours ?',
      a: 'Nous recommandons de consacrer 30 à 45 minutes par jour à une leçon complète : étude du vocabulaire, exercices interactifs et révisions SRS.',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-slate-900">💬 Aide & Support Pédagogique</h1>
        <p className="text-slate-600 mt-2">
          Une question sur votre formation ou un problème technique ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center border-blue-100 bg-blue-50/50">
          <div className="text-3xl mb-2">✉️</div>
          <h3 className="font-bold text-slate-900">Contact Pédagogique</h3>
          <p className="text-xs text-slate-500 mt-1">Réponse sous 24h ouvrées</p>
          <p className="text-sm font-semibold text-blue-700 mt-3">support@summit-english.com</p>
        </Card>

        <Card className="p-6 text-center border-indigo-100 bg-indigo-50/50">
          <div className="text-3xl mb-2">🎓</div>
          <h3 className="font-bold text-slate-900">Conseillers de formation</h3>
          <p className="text-xs text-slate-500 mt-1">Du lundi au vendredi 9h-18h</p>
          <p className="text-sm font-semibold text-indigo-700 mt-3">+33 1 89 00 00 00</p>
        </Card>

        <Card className="p-6 text-center border-emerald-100 bg-emerald-50/50">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-slate-900">Assistance Technique</h3>
          <p className="text-xs text-slate-500 mt-1">Disponibilité continue</p>
          <p className="text-sm font-semibold text-emerald-700 mt-3">tech@summit-english.com</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">❓ Foire Aux Questions (FAQ)</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-3 last:border-none">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">{faq.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">✉️ Envoyer un message</h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-bold text-green-900">Message envoyé avec succès !</h3>
              <p className="text-sm text-green-700 mt-1">
                Notre équipe pédagogique vous répondra dans les plus brefs délais sur votre adresse email.
              </p>
              <Button variant="secondary" className="mt-4" onClick={() => setSubmitted(false)}>
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sujet de votre demande</label>
                <Input
                  placeholder="Ex: Question sur la leçon 12, Certificat..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message détaillé</label>
                <textarea
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[120px]"
                  placeholder="Expliquez-nous votre besoin..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Envoyer mon message au support
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
