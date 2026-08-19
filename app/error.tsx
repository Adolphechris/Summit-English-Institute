'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GLOBAL ERROR]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Une erreur est survenue</h1>
        <p className="text-slate-600 mb-6">
          {error.message || "Quelque chose n'a pas fonctionné. Veuillez réessayer."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}