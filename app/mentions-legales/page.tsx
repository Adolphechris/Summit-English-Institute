import Link from 'next/link';
export const metadata = { title: 'Mentions Légales — Summit English Institute' };
export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-slate-700">
      <h1 className="text-3xl font-black text-slate-900">Mentions Légales</h1>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Éditeur du site</h2>
        <p><strong>Raison sociale :</strong> Summit English Institute</p>
        <p><strong>Site :</strong> https://english.iumorave-ac.org</p>
        <p><strong>Contact :</strong> support@summit-english.com</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Hébergement</h2>
        <p><strong>Hébergeur :</strong> Vercel Inc.</p>
        <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
        <p><strong>Site :</strong> <a href="https://vercel.com" className="text-blue-600 underline">vercel.com</a></p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, leçons, quiz, design) est la propriété exclusive de Summit English Institute. Toute reproduction sans autorisation est interdite.</p>
      </section>
      <div className="pt-8 border-t border-slate-200 flex gap-6 text-sm">
        <Link href="/cgv" className="text-blue-600 hover:underline">CGV</Link>
        <Link href="/confidentialite" className="text-blue-600 hover:underline">Confidentialité</Link>
        <Link href="/" className="text-slate-500 hover:underline">← Accueil</Link>
      </div>
    </main>
  );
}
