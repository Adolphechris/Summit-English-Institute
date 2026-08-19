import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
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

    const certificateId = params.id;

    const certificate = await queryOne(
      `SELECT c.*, u.first_name, u.last_name, u.email
       FROM certificates c
       JOIN users u ON c.user_id = u.id
       WHERE c.certificate_code = $1 AND c.status = 'issued'`,
      [certificateId]
    );

    if (!certificate) {
      return NextResponse.json({ error: 'Certificat introuvable' }, { status: 404 });
    }

    return NextResponse.json({
      certificateCode: certificate.certificate_code,
      userName: certificate.first_name && certificate.last_name
        ? `${certificate.first_name} ${certificate.last_name}`
        : certificate.email,
      finalScore: certificate.final_score,
      completedAt: certificate.issued_at,
      status: certificate.status,
    });
  } catch (error) {
    console.error('[CERTIFICATE ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
