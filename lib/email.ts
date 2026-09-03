// ============================================================================
// Envoi d'email — MINIMAL, SANS SDK (via Brevo REST)
// - Si BREVO_API_KEY est présent → envoi réel via https://api.brevo.com/v3/smtp/email
// - Sinon → aucun email (le message reste stocké en Firestore par la route appelante)
// ============================================================================

export async function sendSupportEmail(params: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return { sent: false, error: 'BREVO_API_KEY non configuré' };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Summit English Institute',
          email: process.env.SUPPORT_FROM_EMAIL || 'no-reply@summit-english.com',
        },
        to: [{ email: params.to }],
        subject: params.subject,
        textContent: params.text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return { sent: false, error: `Brevo HTTP ${res.status}: ${errBody.slice(0, 200)}` };
    }

    return { sent: true };
  } catch (error) {
    return { sent: false, error: error instanceof Error ? error.message : 'Erreur réseau' };
  }
}