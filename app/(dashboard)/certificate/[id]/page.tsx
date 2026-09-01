'use client';

import { useApi } from '@/lib/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';

interface CertificateData {
  certificateCode: string;
  userName: string;
  finalScore: number;
  completedAt: string;
  status: string;
  cefrLevel?: string;
}

const CEFR_LABELS: Record<string, string> = {
  A1: 'A1 — Beginner',
  A2: 'A2 — Elementary',
  B1: 'B1 — Intermediate',
  'B1+': 'B1+ — Upper Intermediate',
  B2: 'B2 — Upper Intermediate',
  'B2+': 'B2+ — Advanced',
  C1: 'C1 — Advanced',
  C2: 'C2 — Mastery',
};

export default function CertificatePage() {
  const params = useParams();
  const { data: certificate, isLoading } = useApi<CertificateData>(`/api/certificate/${params.id}`);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <PageSkeleton cards={1} />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Certificat introuvable.</p>
        </Card>
      </div>
    );
  }

  const cefrLabel = certificate.cefrLevel
    ? (CEFR_LABELS[certificate.cefrLevel] || certificate.cefrLevel)
    : 'B2 — Upper Intermediate';

  const verifyUrl = `https://english.iumorave-ac.org/verify/${certificate.certificateCode}`;

  const linkedInUrl = new URL('https://www.linkedin.com/profile/add');
  linkedInUrl.searchParams.set('startTask', 'CERTIFICATION_NAME');
  linkedInUrl.searchParams.set('name', 'English for IT & Cybersecurity');
  linkedInUrl.searchParams.set('organizationName', 'Summit English Institute');
  linkedInUrl.searchParams.set('issueYear', new Date(certificate.completedAt).getFullYear().toString());
  linkedInUrl.searchParams.set('issueMonth', (new Date(certificate.completedAt).getMonth() + 1).toString());
  linkedInUrl.searchParams.set('certUrl', verifyUrl);
  linkedInUrl.searchParams.set('certId', certificate.certificateCode);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Certificate of Completion</h1>
        <p className="text-slate-600 mt-2">Summit English Institute</p>
      </div>

      {/* Certificat */}
      <Card className="p-8 sm:p-12 border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 print:shadow-none">
        <div className="text-center space-y-6">
          {/* En-tête */}
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              This is to certify that
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{certificate.userName}</p>
          </div>

          <div>
            <p className="text-lg text-slate-700">has successfully completed the program</p>
            <p className="text-xl font-semibold text-blue-900 mt-1">
              English for IT &amp; Cybersecurity
            </p>
          </div>

          {/* Badge CEFR officiel */}
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white rounded-xl px-5 py-2.5 shadow-md">
            <span className="text-2xl font-black">{certificate.cefrLevel || 'B2'}</span>
            <div className="text-left border-l border-blue-700 pl-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">CEFR Level</p>
              <p className="text-sm font-bold">{cefrLabel}</p>
            </div>
          </div>

          <div className="py-6 border-t border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-sm font-medium text-slate-500">Final Score</p>
                <p className="text-4xl font-bold text-slate-900 mt-1">{certificate.finalScore}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <div className="mt-2">
                  <Badge variant="success" size="lg">PASSED</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">
            <div>
              <p className="text-sm font-medium text-slate-500">Certificate ID</p>
              <p className="text-sm font-mono text-slate-900 mt-1">{certificate.certificateCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Completion Date</p>
              <p className="text-sm text-slate-900 mt-1">
                {new Date(certificate.completedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Vérification publique */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verify this certificate</p>
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline font-mono break-all"
            >
              {verifyUrl}
            </a>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This certificate is issued by Summit English Institute. It certifies that the
              holder has successfully completed the English for IT &amp; Cybersecurity professional
              training program aligned with CEFR European standards.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
        <a
          href={linkedInUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors shadow-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Ajouter à LinkedIn
        </a>
        <Button onClick={() => window.print()}>🖨️ Imprimer / PDF</Button>
        <Link href="/dashboard">
          <Button variant="secondary">← Tableau de bord</Button>
        </Link>
      </div>
    </div>
  );
}
