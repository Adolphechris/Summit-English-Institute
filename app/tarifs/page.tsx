import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { config } from "@/lib/config";
import PricingCards from "@/components/PricingCards";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Tarifs — Summit English Institute",
  description:
    "Diagnostic et niveaux 1-2 gratuits. Débloquez le programme complet (niveaux 3-8, évaluations, certification) avec un paiement unique. Accès à vie.",
};

const FAQ_ITEMS = [
  {
    q: "Puis-je essayer avant de payer ?",
    a: "Oui. Le test de positionnement et les niveaux 1 et 2 sont gratuits, sans carte bancaire. Vous pouvez vous entraîner et suivre votre progression avant de décider.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    a: "Un paiement unique sécurisé par carte bancaire via Stripe (paiement local CMI au Maroc bientôt disponible). Aucun abonnement : vous payez une fois, vous accédez à vie.",
  },
  {
    q: "Que se passe-t-il après le paiement ?",
    a: "Votre accès aux niveaux 3 à 8, aux évaluations et à la certification finale est activé immédiatement après la confirmation du paiement.",
  },
  {
    q: "Le certificat est-il inclus ?",
    a: "Oui. L'évaluation finale cumulative et le certificat officiel Summit English Institute sont inclus dans l'offre Premium.",
  },
];

export default async function TarifsPage() {
  const cookieStore = await cookies();
  const authenticated = Boolean(cookieStore.get("token")?.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              SEI
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Summit English Institute
              </h1>
              <p className="text-xs text-slate-500">
                English for IT &amp; Cybersecurity
              </p>
            </div>
          </Link>
          <Link
            href={authenticated ? "/dashboard" : "/login"}
            className="px-5 py-2.5 text-sm font-semibold bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
          >
            {authenticated
              ? "Mon tableau de bord"
              : "Espace Étudiant / Connexion"}
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
            💳 Un paiement unique — accès à vie
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Commencez gratuitement,
            <span className="block text-blue-900 mt-2">
              certifiez-vous avec Premium
            </span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Le diagnostic et les niveaux 1-2 sont offerts. Passez Premium quand
            vous êtes prêt pour le programme complet et la certification.
          </p>
        </div>

        {/* Cartes de tarifs / waitlist selon activation paiement */}
        {config.payments.enabled ? (
          <PricingCards authenticated={authenticated} />
        ) : (
          <div>
            <p className="mt-2 max-w-3xl mx-auto text-center text-sm text-slate-600">
              Le paiement sera disponible très vite dans votre région (Maroc,
              France, Afrique, Canada, USA). Rejoignez la liste d'attente pour
              être notifié dès lancement.
            </p>
            <WaitlistForm />
          </div>
        )}

        {/* FAQ */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
              >
                <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Summit English Institute — IUMORAVE
            Academic Institute.
          </p>
        </div>
      </footer>
    </div>
  );
}
