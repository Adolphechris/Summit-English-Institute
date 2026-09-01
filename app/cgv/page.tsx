import Link from 'next/link';
export const metadata = { title: 'Conditions Générales de Vente — Summit English Institute' };
export default function CgvPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-slate-700">
      <h1 className="text-3xl font-black text-slate-900">Conditions Générales de Vente</h1>
      <p className="text-sm text-slate-500">Dernière mise à jour : Septembre 2026</p>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">1. Objet</h2>
        <p>Les présentes CGV régissent l'accès au programme de formation en ligne <em>English for IT &amp; Cybersecurity</em> proposé par Summit English Institute via le site https://english.iumorave-ac.org.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">2. Prix et paiement</h2>
        <p>Les prix sont affichés en devise locale selon votre région (MAD, EUR, FCFA, CAD ou USD). Le paiement est unique et donne un accès à vie au contenu. La transaction est sécurisée par notre Merchant of Record (Lemon Squeezy ou Gumroad).</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">3. Accès et droit de rétractation</h2>
        <p>L'accès au contenu premium est ouvert immédiatement après confirmation du paiement. Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques fournis immédiatement après l'achat et utilisés par l'acheteur. En cas de problème technique, contactez support@summit-english.com.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">4. Données personnelles</h2>
        <p>Les données collectées (email, progression, résultats) sont utilisées uniquement dans le cadre de la formation. Consultez notre <Link href="/confidentialite" className="text-blue-600 underline">politique de confidentialité</Link>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">5. Droit applicable</h2>
        <p>Les présentes CGV sont soumises au droit applicable dans le pays d'établissement de Summit English Institute. Tout litige sera soumis à une médiation amiable avant toute procédure judiciaire.</p>
      </section>
      <div className="pt-8 border-t border-slate-200 flex gap-6 text-sm">
        <Link href="/mentions-legales" className="text-blue-600 hover:underline">Mentions Légales</Link>
        <Link href="/confidentialite" className="text-blue-600 hover:underline">Confidentialité</Link>
        <Link href="/" className="text-slate-500 hover:underline">← Accueil</Link>
      </div>
    </main>
  );
}
