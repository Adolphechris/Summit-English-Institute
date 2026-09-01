import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // Si l'utilisateur a déjà une session active, rediriger directement vers le dashboard
  if (token) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              SEI
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Summit English Institute</h1>
              <p className="text-xs text-slate-500">English for IT & Cybersecurity</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/tarifs"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-semibold bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
            >
              Espace Étudiant / Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
            🎓 Plateforme Pédagogique Interactive
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Maîtrisez l'anglais professionnel
            <span className="block text-blue-900 mt-2">en 20 jours intensifs</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
            Formation de pointe en anglais informatique, développement logiciel et cybersécurité.
            Accédez à votre tableau de bord, vos 80 leçons et vos exercices pratiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 text-base font-bold bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              🚀 Accéder à mon Espace de Formation
            </Link>
            <Link
              href="/diagnostic"
              className="px-8 py-4 text-base font-bold bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              🎯 Test Diagnostique
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">80 Leçons & 920 QCM IT</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Programme 100% contextualisé pour développeurs, ingénieurs cloud et spécialistes sécurité.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🔄
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Mémorisation Active (SRS)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Algorithme intelligent de répétition espacée pour ancrer les compétences techniques à vie.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🏆
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Certification & Diplôme</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Évaluation finale rigoureuse et certificat officiel Summit English Institute déblocable dès 80%.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-blue-900">80</div>
              <div className="text-sm text-slate-500 mt-1">Leçons complètes</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-900">920</div>
              <div className="text-sm text-slate-500 mt-1">Questions d'évaluation</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-900">8</div>
              <div className="text-sm text-slate-500 mt-1">Niveaux (A1 → C2)</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-900">20</div>
              <div className="text-sm text-slate-500 mt-1">Jours de formation</div>
            </div>
          </div>
        </div>
        {/* Tarifs teaser */}
        <div className="mt-16 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 text-center shadow-md">
          <div className="inline-flex items-center gap-2 bg-white/15 text-blue-100 text-xs font-bold px-3 py-1 rounded-full mb-5">
            💳 Paiement unique — accès à vie
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Commencez gratuitement, certifiez-vous avec Premium
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Diagnostic et niveaux 1-2 offerts. Passez Premium pour débloquer les 8 niveaux,
            les évaluations et le certificat officiel.
          </p>
          <Link
            href="/tarifs"
            className="inline-block px-8 py-4 text-base font-bold bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
          >
            Voir les tarifs →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Summit English Institute — IUMORAVE Academic Institute.</p>
        </div>
      </footer>
    </div>
  );
}
