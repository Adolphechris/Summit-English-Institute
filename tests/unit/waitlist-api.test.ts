jest.mock("@/services/database/firestore-repository", () => ({
  getWaitlistEntryByEmail: jest.fn(),
  addToWaitlist: jest.fn(),
}));

import {
  getWaitlistEntryByEmail,
  addToWaitlist,
} from "@/services/database/firestore-repository";
import { POST } from "@/app/api/waitlist/route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/waitlist", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Waitlist API — POST /api/waitlist", () => {
  beforeEach(() => jest.clearAllMocks());

  it("valide un email + région et crée l’entrée (201)", async () => {
    (getWaitlistEntryByEmail as jest.Mock).mockResolvedValue(null);
    (addToWaitlist as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      region: "ma",
    });

    const resp = await POST(
      makeRequest({
        email: "TEST@Example.com",
        firstName: "Ali",
        region: "ma",
      }) as any,
    );
    const body = await resp.json();

    expect(resp.status).toBe(201);
    expect(body).toEqual({ ok: true, email: "test@example.com" });
    expect(getWaitlistEntryByEmail).toHaveBeenCalledWith("test@example.com");
    expect(addToWaitlist).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        firstName: "Ali",
        region: "ma",
        source: "tarifs",
        status: "pending",
      }),
    );
  });

  it("idempotent : email existant → 200 alreadySubscribed (pas de doublon)", async () => {
    (getWaitlistEntryByEmail as jest.Mock).mockResolvedValue({
      email: "x@example.com",
      status: "pending",
    });

    const resp = await POST(
      makeRequest({ email: "x@example.com", region: "eu" }) as any,
    );
    expect(resp.status).toBe(200);
    const body = await resp.json();
    expect(body).toEqual({
      ok: true,
      email: "x@example.com",
      alreadySubscribed: true,
    });
    expect(addToWaitlist).not.toHaveBeenCalled();
  });

  it("valide le format email (400)", async () => {
    const resp = await POST(
      makeRequest({ email: "pas-un-email", region: "eu" }) as any,
    );
    expect(resp.status).toBe(400);
    const body = await resp.json();
    expect(body).toEqual({ error: "Adresse email invalide" });
    expect(addToWaitlist).not.toHaveBeenCalled();
  });

  it("valide la région inconnue → fallback eu (201)", async () => {
    (getWaitlistEntryByEmail as jest.Mock).mockResolvedValue(null);
    (addToWaitlist as jest.Mock).mockResolvedValue({
      email: "a@b.c",
      region: "eu",
    });

    const resp = await POST(
      makeRequest({ email: "a@b.c", region: "xx" }) as any,
    );
    expect(resp.status).toBe(201);
    expect(addToWaitlist).toHaveBeenCalledWith(
      expect.objectContaining({ email: "a@b.c", region: "eu" }),
    );
  });

  it("gère l’erreur base de données (500)", async () => {
    (getWaitlistEntryByEmail as jest.Mock).mockRejectedValue(
      new Error("Firestore down"),
    );

    const resp = await POST(makeRequest({ email: "a@b.c" }) as any);
    expect(resp.status).toBe(500);
    expect(addToWaitlist).not.toHaveBeenCalled();
  });
});
