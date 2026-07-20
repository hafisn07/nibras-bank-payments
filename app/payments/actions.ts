"use server";

import { z } from "zod";
import { payees, type SendState } from "@/lib/payments";

const schema = z.object({
  payee: z.string().min(1, "Choose a payee"),
  amount: z.coerce
    .number()
    .positive("Enter an amount greater than 0")
    .max(50000, "Amount can't exceed AED 50,000 per transfer."),
});

export async function sendMoney(
  _prev: SendState,
  formData: FormData,
): Promise<SendState> {
  // Public endpoint: re-check auth + rate-limit here in prod.
  const parsed = schema.safeParse({
    payee: formData.get("payee"),
    amount: formData.get("amount"),
  });

  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const payee = payees.find((p) => p.id === parsed.data.payee);
  // Demo: no real transfer.
  return {
    status: "success",
    sent: {
      payeeName: payee?.name ?? "payee",
      amount: parsed.data.amount,
      iban: payee?.iban ?? "",
    },
  };
}
