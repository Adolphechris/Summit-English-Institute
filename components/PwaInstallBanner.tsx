'use client';

import { useState, useEffect } from 'react';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé la bannière récemment
    const dismissed = localStorage.getItem('sei_pwa_dismissed');
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    // Détecter iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isIosDevice && !isStandalone) {
      setIsIos(true);
      setShowBanner(true);
      return;
    }

    // Détecter Android / Chrome PWA install event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('sei_pwa_dismissed', String(Date.now()));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
          📱
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">Installer Summit English Institute</p>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {isIos
              ? "Appuyez sur Partager ⎋ puis sur « Sur l'écran d'accueil » pour réviser partout."
              : "Ajoutez l'application à votre écran d'accueil pour réviser hors-ligne."}
          </p>
          <div className="flex items-center gap-2 mt-3">
            {!isIos && deferredPrompt && (
              <button
                onClick={handleInstall}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Installer l&apos;App
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white text-xs p-1"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
