import { describe, expect, it } from "vitest";
import { computeTotals, DEMO_SHIPPING } from "@/lib/cart";

describe("demo cart totals", () => {
  it("charges demo shipping below R$ 199", () => {
    const t = computeTotals([{ productId: "p3", quantity: 1 }]); // R$ 19,90
    expect(t.subtotal).toBeCloseTo(19.9);
    expect(t.shipping).toBe(DEMO_SHIPPING);
  });

  it("gives free shipping from R$ 199", () => {
    const t = computeTotals([{ productId: "p6", quantity: 1 }]); // R$ 239,90
    expect(t.shipping).toBe(0);
    expect(t.total).toBeCloseTo(239.9);
  });
});
