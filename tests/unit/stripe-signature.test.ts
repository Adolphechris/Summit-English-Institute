import { createHmac } from "crypto";

jest.mock("@/lib/config", () => ({
  config: {
    appUrl: "http://localhost:3000",
    payments: {
      stripeSecretKey: "sk_test_mocked",
      stripeWebhookSecret: "",
      cmi: { gatewayUrl: "", merchantId: "", storeKey: "" },
    },
  },
}));

import { createCheckoutSession, verifyStripeSignature } from "@/lib/stripe";

const SECRET = "whsec_test_123";
const nowSeconds = (): number => Math.floor(Date.now() / 1000);

/** Construire un en-tête stripe-signature valide pour un payload donné. */
function signHeader(
  payload: string,
  secret: string,
  timestamp: number,
): string {
  const sig = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  return `t=${timestamp},v1=${sig}`;
}

describe("Stripe — verifyStripeSignature", () => {
  const payload = JSON.stringify({
    id: "evt_1",
    type: "checkout.session.completed",
  });

  it("accepte une signature valide et récente", () => {
    const header = signHeader(payload, SECRET, nowSeconds());
    expect(verifyStripeSignature(payload, header, SECRET)).toBe(true);
  });

  it("accepte un en-tête avec plusieurs signatures v1 (rotation de clés)", () => {
    const ts = nowSeconds();
    const valid = createHmac("sha256", SECRET)
      .update(`${ts}.${payload}`)
      .digest("hex");
    const stale = "a".repeat(64);
    expect(
      verifyStripeSignature(payload, `t=${ts},v1=${stale},v1=${valid}`, SECRET),
    ).toBe(true);
  });

  it("refuse une signature calculée avec un mauvais secret", () => {
    const header = signHeader(payload, "whsec_wrong", nowSeconds());
    expect(verifyStripeSignature(payload, header, SECRET)).toBe(false);
  });

  it("refuse un payload modifié (signature invalide)", () => {
    const header = signHeader(payload, SECRET, nowSeconds());
    expect(verifyStripeSignature(payload + " ", header, SECRET)).toBe(false);
  });

  it("refuse un timestamp trop vieux (tolérance 5 min par défaut)", () => {
    const header = signHeader(payload, SECRET, nowSeconds() - 301);
    expect(verifyStripeSignature(payload, header, SECRET)).toBe(false);
  });

  it("respecte une tolérance personnalisée", () => {
    const oldTs = nowSeconds() - 1000;
    const header = signHeader(payload, SECRET, oldTs);
    expect(verifyStripeSignature(payload, header, SECRET, 500)).toBe(false);
    expect(verifyStripeSignature(payload, header, SECRET, 2000)).toBe(true);
  });

  it("refuse les en-têtes malformés ou incomplets", () => {
    const ts = nowSeconds();
    const valid = signHeader(payload, SECRET, ts);
    expect(verifyStripeSignature(payload, "", SECRET)).toBe(false);
    expect(verifyStripeSignature("", valid, SECRET)).toBe(false);
    expect(verifyStripeSignature(payload, "no-equals-sign", SECRET)).toBe(
      false,
    );
    expect(verifyStripeSignature(payload, `t=${ts}`, SECRET)).toBe(false);
    expect(verifyStripeSignature(payload, `v1=${"b".repeat(64)}`, SECRET)).toBe(
      false,
    );
    expect(verifyStripeSignature(payload, "t=notanumber,v1=ff", SECRET)).toBe(
      false,
    );
  });

  it("refuse une signature non hexadécimale sans lever d'exception", () => {
    const ts = nowSeconds();
    expect(
      verifyStripeSignature(payload, `t=${ts},v1=zz-invalide-hex`, SECRET),
    ).toBe(false);
  });

  it("refuse un secret vide", () => {
    const header = signHeader(payload, SECRET, nowSeconds());
    expect(verifyStripeSignature(payload, header, "")).toBe(false);
  });
});

describe("Stripe — createCheckoutSession (mock fetch)", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("lève une erreur explicite sans vérifier Stripe en cas de réponse invalide", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ error: { message: "No such price" } }),
    }) as unknown as typeof fetch;

    await expect(
      createCheckoutSession({
        userId: 1,
        email: "a@b.c",
        successUrl: "http://localhost/checkout/success",
        cancelUrl: "http://localhost/checkout/cancel",
      }),
    ).rejects.toThrow("No such price");
  });

  it("construit une session de paiement unique avec les bons paramètres", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "cs_test_1",
        url: "https://checkout.stripe.com/c/pay/cs_test_1",
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await createCheckoutSession({
      userId: 42,
      email: "student@sei.org",
      successUrl: "http://localhost/checkout/success",
      cancelUrl: "http://localhost/checkout/cancel",
    });

    expect(result).toEqual({
      id: "cs_test_1",
      url: "https://checkout.stripe.com/c/pay/cs_test_1",
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.stripe.com/v1/checkout/sessions");
    expect((init as RequestInit).method).toBe("POST");
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: "Bearer sk_test_mocked",
    });

    const body = new URLSearchParams((init as RequestInit).body as string);
    expect(body.get("mode")).toBe("payment");
    expect(body.get("client_reference_id")).toBe("42");
    expect(body.get("metadata[userId]")).toBe("42");
    expect(body.get("metadata[plan]")).toBe("premium");
    expect(body.get("metadata[region]")).toBe("eu");
    expect(body.get("metadata[currency]")).toBe("EUR");
    expect(body.get("customer_email")).toBe("student@sei.org");
    expect(body.get("line_items[0][quantity]")).toBe("1");
    expect(body.get("line_items[0][price_data][currency]")).toBe("EUR");
    expect(body.get("line_items[0][price_data][unit_amount]")).toBe("2900");
    expect(
      Number(body.get("line_items[0][price_data][unit_amount]")),
    ).toBeGreaterThan(0);
    expect(body.get("success_url")).toBe("http://localhost/checkout/success");
    expect(body.get("cancel_url")).toBe("http://localhost/checkout/cancel");
  });
});
