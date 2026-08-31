'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiFetch, clearToken } from '@/lib/apiClient';

const navSections = [
  {
    title: 'Accueil',
    items: [
      { href: '/dashboard', label: 'Tableau de bord', icon: '🏠', desc: 'Vue générale' },
    ],
  },
  {
    title: 'Apprentissage',
    items: [
      { href: '/diagnostic', label: 'Test Diagnostique', icon: '🎯', desc: 'Évalue ton niveau' },
      { href: '/course', label: 'Parcours 20 Jours', icon: '🗺️', desc: 'Plan structuré' },
      { href: '/lessons', label: '80 Leçons IT', icon: '📖', desc: 'Tout le programme' },
      { href: '/practice', label: 'Pratique & Lab', icon: '🛠️', desc: 'Exercices guidés' },
      { href: '/review', label: 'Révisions SRS', icon: '🔄', desc: 'Mémorisation active' },
    ],
  },
  {
    title: 'Évaluations',
    items: [
      { href: '/assessments', label: 'Quiz & Tests', icon: '📝', desc: 'Teste tes connaissances' },
      { href: '/final-assessment', label: 'Examen Final', icon: '🏆', desc: 'Validation complète' },
      { href: '/certificate', label: 'Mon Certificat', icon: '🎓', desc: 'Télécharger le diplôme' },
    ],
  },
  {
    title: 'Suivi & Outils',
    items: [
      { href: '/progress', label: 'Statistiques', icon: '📊', desc: 'Mes performances' },
      { href: '/profile', label: 'Mon Profil', icon: '👤', desc: 'Paramètres compte' },
      { href: '/resources', label: 'Ressources', icon: '📚', desc: 'Supports & PDF' },
      { href: '/support', label: 'Aide & Support', icon: '💬', desc: 'Contact & FAQ' },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; firstName?: string; lastName?: string; role?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    apiFetch<{ user: { email: string; firstName?: string; lastName?: string; role?: string } }>('/api/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    try { await apiFetch('/api/auth/logout', { method: 'POST' }); } catch { /* ok */ }
    clearToken();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Chargement de votre espace…</p>
        </div>
      </div>
    );
  }

  const initials = user.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : user.email[0].toUpperCase();

  const displayName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.email.split('@')[0];

  const SidebarNav = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-3 overflow-y-auto">
      {navSections.map((section) => (
        <div key={section.title} className="mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-1">
            {section.title}
          </p>
          {section.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClick}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : ''}`}>{item.label}</p>
                  <p className={`text-xs truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>{item.desc}</p>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header mobile */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow">
            SEI
          </div>
          <span className="font-semibold text-slate-900">Summit English</span>
        </div>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">{initials}</div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">SEI</div>
              <span className="font-semibold text-slate-900">Navigation</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100" aria-label="Fermer">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SidebarNav onClick={() => setMobileMenuOpen(false)} />
          <div className="p-4 border-t border-slate-200">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 w-full">
              <span className="text-lg">🚪</span>
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 fixed h-screen shadow-sm">
          {/* Logo */}
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-800 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">SEI</div>
              <div>
                <h1 className="font-bold text-slate-900 text-base leading-tight">Summit English</h1>
                <p className="text-xs text-slate-400">Institute — Espace Étudiant</p>
              </div>
            </div>
          </div>

          <SidebarNav />

          {/* User footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
            >
              <span>🚪</span>
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
