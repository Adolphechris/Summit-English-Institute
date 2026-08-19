import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              SEI
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Summit English Institute</h1>
              <p className="text-xs text-slate-500">English for IT & Cybersecurity</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Maîtrisez l'anglais professionnel
            <span className="block text-blue-900 mt-2">en 20 jours</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
            Une formation intensive spécialisée en anglais informatique et cybersécurité.
            Conçue pour transformer votre anglais passif en anglais actif fonctionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-medium bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
            >
              Commencer la formation
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 text-base font-medium bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              J'ai déjà un compte
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ciblé et pratique</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pas de théorie inutile. Nous enseignons uniquement l'anglais dont vous avez besoin
              pour étudier l'informatique et travailler dans un environnement anglophone.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Évaluations massives</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Des centaines d'exercices et d'évaluations cumulatives pour vérifier que vous maîtrisez
              réellement chaque compétence. Seuil de validation : 75%.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">20 jours maximum</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Un parcours intensif structuré sur 20 jours. Diagnostic initial, progression
              personnalisée, révisions espacées et certification interne.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-900">20</div>
              <div className="text-sm text-slate-600 mt-1">Jours maximum</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">8</div>
              <div className="text-sm text-slate-600 mt-1">Niveaux</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">75%</div>
              <div className="text-sm text-slate-600 mt-1">Seuil de validation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">6</div>
              <div className="text-sm text-slate-600 mt-1">Domaines</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Summit English Institute. Formation interne.</p>
        </div>
      </footer>
    </div>
  );
}
