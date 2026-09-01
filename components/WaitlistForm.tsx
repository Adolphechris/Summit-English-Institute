"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { detectRegion, REGION_LABEL, REGION_ORDER } from "@/lib/pricing";
import type { RegionKey } from "@/lib/pricing";

export default function WaitlistForm() {
  const [region, setRegion] = useState<RegionKey>("eu");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRegion(detectRegion(navigator.language, navigator.languages));
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email, firstName, region, source: "tarifs" }),
      });
      setSent(true);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Erreur inconnue";
      setError(text);
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Inscrit sur la liste d’attente !
        </h3>
        <p className="text-slate-600">
          Vous serez notifié(e) dès que le paiement sera disponible dans votre
          région ({REGION_LABEL[region]}).
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
    >
      <h3 className="text-xl font-bold text-slate-900 mb-1">
        Rejoignez la liste d’attente
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Soyez prévenu quand Premium sera disponible pour votre région. Aucun
        spam, désinscription 1 clic.
      </p>

      <div className="mb-3">
        <label className="block text-xs font-medium text-slate-500 mb-1">
          Région
        </label>
        <div className="flex flex-wrap gap-2">
          {REGION_ORDER.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 text-sm rounded-full border font-medium transition-colors ${
                region === r
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {REGION_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Prénom (optionnel)
          </label>
          <input
            type="text"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Email *
          </label>
          <input
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors disabled:opacity-60"
      >
        {loading ? "Envoi…" : `M’inscrire — ${REGION_LABEL[region]}`}
      </button>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </form>
  );
}
