import { NextResponse } from "next/server";
import {
  addToWaitlist,
  getWaitlistEntryByEmail,
} from "@/services/database/firestore-repository";
import { RegionKey, REGION_PRICES } from "@/lib/pricing";
import { isRateLimited } from "@/lib/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/waitlist — capture un lead pré-vente (bridge sans compte bancaire).
export async function POST(request: Request) {
  try {
    // Rate-limit : max 5 inscriptions par IP par heure (anti-spam bots)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(`waitlist:${ip}`, 5, 3600 * 1000)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const {
      email,
      firstName,
      region,
      source = "tarifs",
    } = (await request.json().catch(() => ({}))) as {
      email?: string;
      firstName?: string;
      region?: RegionKey;
      source?: string;
    };

    const normalized = (email || "").trim().toLowerCase();
    if (!normalized || !EMAIL_REGEX.test(normalized)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 },
      );
    }

    const safeRegion: RegionKey =
      typeof region === "string" && region in REGION_PRICES
        ? (region as RegionKey)
        : "eu";
    const safeSource: WaitlistSource =
      source === "landing" || source === "other" ? source : "tarifs";

    const existing = await getWaitlistEntryByEmail(normalized);
    if (existing) {
      return NextResponse.json({
        ok: true,
        email: normalized,
        alreadySubscribed: true,
      });
    }

    const created = await addToWaitlist({
      email: normalized,
      firstName: firstName || null,
      region: safeRegion,
      source: safeSource,
      status: "pending",
    });

    return NextResponse.json(
      { ok: true, email: created.email },
      { status: 201 },
    );
  } catch (error) {
    console.error("[WAITLIST ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

type WaitlistSource = "tarifs" | "landing" | "other";
