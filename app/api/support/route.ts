import { NextResponse } from "next/server";
import { getRequestUserId } from "@/services/auth/api";
import { getUserById } from "@/services/database/firestore-repository";
import { getFirestore } from "@/services/database/firebase-admin";
import { sendSupportEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/support — Enregistre un message de support dans Firestore
// et notifie l'équipe par email si BREVO_API_KEY + SUPPORT_NOTIFY_EMAIL sont configurés.
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    const body = await request.json().catch(() => ({})) as {
      subject?: string;
      message?: string;
      email?: string;
    };

    const { subject, message, email } = body;

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Le sujet et le message sont obligatoires." },
        { status: 400 }
      );
    }

    let senderEmail = email?.trim().toLowerCase() || "";
    let senderName = "";

    // Enrichissement avec les données utilisateur si connecté
    if (userId) {
      const user = await getUserById(userId);
      if (user) {
        senderEmail = senderEmail || user.email;
        senderName = user.firstName || user.email;
      }
    }

    if (senderEmail && !EMAIL_REGEX.test(senderEmail)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const now = new Date().toISOString();

    await db.collection("support_messages").add({
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 3000),
      email: senderEmail,
      senderName,
      userId: userId || null,
      status: "open",
      createdAt: now,
    });

    // Notifier l'équipe si configuré (sinon stockage seul : l'équipe consulte Firestore).
    const notifyEmail =
      process.env.SUPPORT_NOTIFY_EMAIL || process.env.SUPPORT_EMAIL || "";
    if (notifyEmail) {
      const delivery = await sendSupportEmail({
        to: notifyEmail,
        subject: `[Support Summit] ${subject.trim().slice(0, 80)}`,
        text: `Nouveau message de support\n\nDe : ${senderName || "Anonyme"} ${senderEmail ? `<${senderEmail}>` : ""}\nSujet : ${subject}\n\n${message}`,
      });
      if (!delivery.sent) {
        console.warn("[SUPPORT] Email non envoyé (stockage conservé) :", delivery.error);
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[SUPPORT ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
