import { NextResponse } from "next/server";
import { getRequestUserId } from "@/services/auth/api";
import { getUserById } from "@/services/database/firestore-repository";
import { getFirestore } from "@/services/database/firebase-admin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/support — Enregistre un message de support dans Firestore
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

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[SUPPORT ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
