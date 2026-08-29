'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface CertificateData {
  certificateCode: string;
  userName: string;
  finalScore: number;
  completedAt: string;
  status: string;
}

export default function CertificatePage() {
  const params = useParams();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<CertificateData>(`/api/certificate/${params.id}`)
      .then(setCertificate)
      .catch(() => setCertificate(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement du certificat..." />
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Certificate of Completion</h1>
        <p className="text-slate-600 mt-2">Summit English Institute</p>
      </div>

      {/* Certificat */}
      <Card className="p-8 sm:p-12 border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50">
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              This is to certify that
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{certificate.userName}</p>
          </div>

          <div>
            <p className="text-lg text-slate-700">
              has successfully completed the program
            </p>
            <p className="text-xl font-semibold text-blue-900 mt-1">
              English for IT & Cybersecurity
            </p>
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
                  <Badge variant="success" size="lg">
                    PASSED
                  </Badge>
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

          <div className="pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This certificate is issued by Summit English Institute. It certifies that the
              holder has completed the English for IT & Cybersecurity training program.
              This is an internal certificate and does not constitute a university degree or
              an officially recognized professional certification.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => window.print()}>Print Certificate</Button>
        <Link href="/dashboard">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
