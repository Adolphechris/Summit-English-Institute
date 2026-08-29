import { NextResponse } from 'next/server';
import { getCertificateByCode, getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/certificate/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const certificateCode = params.id;
    const certificate = await getCertificateByCode(certificateCode);

    if (!certificate || certificate.status !== 'issued') {
      return NextResponse.json({ error: 'Certificat introuvable' }, { status: 404 });
    }

    const certUser = await getUserById(certificate.userId);

    return NextResponse.json({
      certificateCode: certificate.certificateCode,
      userName: certificate.userName || (certUser?.firstName && certUser?.lastName ? `${certUser.firstName} ${certUser.lastName}` : certUser?.email || 'Apprenant'),
      finalScore: certificate.finalScore,
      completedAt: certificate.completedAt,
      status: certificate.status,
    });
  } catch (error) {
    console.error('[CERTIFICATE ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
