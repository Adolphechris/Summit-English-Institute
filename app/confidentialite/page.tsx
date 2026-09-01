import Link from 'next/link';
export const metadata = { title: 'Politique de Confidentialité — Summit English Institute' };
export default function ConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-slate-700">
      <h1 className="text-3xl font-black text-slate-900">Politique de Confidentialité &amp; RGPD</h1>
      <p className="text-sm text-slate-500">Dernière mise à jour : Septembre 2026</p>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">1. Données collectées</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Données d'identification :</strong> prénom, adresse email</li>
          <li><strong>Données de progression :</strong> leçons complétées, scores aux quiz, résultats aux évaluations</li>
          <li><strong>Données de paiement :</strong> traitées et sécurisées par notre Merchant of Record (nous ne stockons aucune donnée bancaire)</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">2. Finalités du traitement</h2>
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>La gestion de votre compte et de votre progression pédagogique</li>
          <li>La génération et la vérification de vos certificats</li>
          <li>L'envoi de communications liées à votre formation (mises à jour, rappels)</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">3. Conservation des données</h2>
        <p>Vos données sont conservées pendant la durée de votre inscription et 3 ans après la dernière activité sur votre compte, conformément aux obligations légales.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">4. Vos droits (RGPD)</h2>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous bénéficiez des droits suivants :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Droit d'accès, de rectification et d'effacement de vos données</li>
          <li>Droit à la portabilité de vos données</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
        <p>Pour exercer ces droits, contactez : <strong>support@summit-english.com</strong></p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">5. Cookies</h2>
        <p>Ce site utilise uniquement des cookies essentiels au fonctionnement de votre session authentifiée. Aucun cookie publicitaire ou de traçage tiers n'est utilisé.</p>
      </section>
      <div className="pt-8 border-t border-slate-200 flex gap-6 text-sm">
        <Link href="/mentions-legales" className="text-blue-600 hover:underline">Mentions Légales</Link>
        <Link href="/cgv" className="text-blue-600 hover:underline">CGV</Link>
        <Link href="/" className="text-slate-500 hover:underline">← Accueil</Link>
      </div>
    </main>
  );
}
