import { getFirestore } from "@/services/database/firebase-admin";
import Link from "next/link";
import QRCode from "qrcode";

interface Props {
  params: { code: string };
}

const CEFR_LABELS: Record<string, string> = {
  A1: 'A1 — Beginner', A2: 'A2 — Elementary',
  B1: 'B1 — Intermediate', 'B1+': 'B1+ — Upper Intermediate',
  B2: 'B2 — Upper Intermediate', 'B2+': 'B2+ — Advanced',
  C1: 'C1 — Advanced', C2: 'C2 — Mastery',
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://english.iumorave-ac.org';

export default async function VerifyCertificatePage({ params }: Props) {
  const { code } = params;
  const verifyUrl = `${BASE_URL}/verify/${code.toUpperCase()}`;

  let cert: any = null;
  let error = false;
  let qrDataUrl: string | null = null;

  try {
    const db = getFirestore();
    const snap = await db
      .collection("certificates")
      .where("certificateCode", "==", code.toUpperCase())
      .limit(1)
      .get();

    if (!snap.empty) {
      const data = snap.docs[0].data();
      cert = {
        userName: data.userName || "—",
        finalScore: data.finalScore ?? 0,
        completedAt: data.completedAt || "",
        cefrLevel: data.cefrLevel || "B2",
        status: data.status || "passed",
        certificateCode: data.certificateCode || code,
      };
      qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 200,
        margin: 2,
        errorCorrectionLevel: 'M',
      });
    }
  } catch {
    error = true;
  }

  const isValid = !!cert && cert.status === "passed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <Link href="/" className="text-blue-600 text-sm hover:underline">← Summit English Institute</Link>
          <h1 className="text-2xl font-black text-slate-900 mt-3">Vérification de Certificat</h1>
        </div>

        <div className={`rounded-2xl border-2 p-8 shadow-lg bg-white ${isValid ? 'border-emerald-400' : error ? 'border-orange-300' : 'border-red-300'}`}>
          {error ? (
            <div className="text-center space-y-3">
              <div className="text-5xl">⚠️</div>
              <p className="font-bold text-orange-900">Erreur de vérification</p>
              <p className="text-sm text-slate-500">Impossible d&apos;accéder au registre. Réessayez plus tard.</p>
            </div>
          ) : !cert ? (
            <div className="text-center space-y-3">
              <div className="text-5xl">❌</div>
              <p className="font-bold text-red-800 text-lg">Certificat introuvable</p>
              <p className="text-sm text-slate-500">
                Le code <span className="font-mono font-bold">{code}</span> n&apos;existe pas dans notre registre.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-5xl mb-2">✅</div>
                <p className="text-emerald-700 font-bold text-lg">Certificat Authentique et Validé</p>
              </div>

              {qrDataUrl && (
                <div className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrDataUrl}
                    alt={`QR code de vérification du certificat ${cert.certificateCode}`}
                    className="w-28 h-28 rounded-lg border border-slate-200 bg-white p-1"
                    width={112}
                    height={112}
                  />
                  <p className="text-xs text-slate-400 text-center max-w-xs">
                    Scannez pour vérifier l&apos;authenticité de ce certificat en ligne.
                  </p>
                </div>
              )}

              <div className="bg-slate-50 rounded-xl p-5 space-y-3 text-sm">
                <Row label="Titulaire" value={cert.userName} />
                <Row label="Programme" value="English for IT & Cybersecurity" />
                <Row label="Niveau CEFR" value={`${cert.cefrLevel} — ${CEFR_LABELS[cert.cefrLevel] || cert.cefrLevel}`} />
                <Row label="Score final" value={`${cert.finalScore}%`} />
                <Row label="Date d'obtention" value={cert.completedAt ? new Date(cert.completedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'} />
                <Row label="ID du certificat" value={<span className="font-mono text-xs">{cert.certificateCode}</span>} />
                <Row label="Statut" value={<span className="font-bold text-emerald-700 uppercase">✓ {cert.status}</span>} />
              </div>

              <p className="text-center text-xs text-slate-400">
                Émis par Summit English Institute · Registre authentifié
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-slate-500 flex-shrink-0">{label}</span>
      <span className="font-semibold text-slate-900 text-right">{value}</span>
    </div>
  );
}
