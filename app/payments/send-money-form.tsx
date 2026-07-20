"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendMoney } from "./actions";
import { initialSendState, payees, type SendState } from "@/lib/payments";

const fieldBase =
  "h-[42px] w-full rounded-[9px] border bg-white px-[13px] text-[13.5px] text-ink outline-none transition-[border-color,box-shadow]";
const fieldOk = "border-line focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,.12)]";
const fieldErr = "border-[1.5px] border-[#DC2626] bg-[#FEF7F7] shadow-[0_0_0_3px_rgba(220,38,38,.1)]";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-[18px] flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-brand-mid to-brand-strong text-[13.5px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(5,102,73,.6)] transition disabled:opacity-75"
    >
      {pending ? (
        <>
          <span
            className="inline-block size-3.5 rounded-full border-2 border-white/40 border-t-white"
            style={{ animation: "nbSpin .7s linear infinite" }}
          />
          Sending…
        </>
      ) : (
        "Send money"
      )}
    </button>
  );
}

function SuccessPanel({ sent, onDone }: { sent: NonNullable<SendState["sent"]>; onDone: () => void }) {
  const aed = "AED " + sent.amount.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div className="flex flex-col items-center justify-center px-2 py-1.5 text-center">
      <div className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(5,150,105,.1)] text-2xl text-brand">✓</div>
      <div className="mt-3 text-[15px] font-semibold">Sent to {sent.payeeName}</div>
      <div className="mt-1 font-mono text-[20px] font-semibold tabular-nums">{aed}</div>
      {sent.iban ? <div className="mt-2 font-mono text-[11px] text-faint">{sent.iban}</div> : null}
      <button
        onClick={onDone}
        className="mt-4 flex h-10 w-full items-center justify-center rounded-[10px] border border-line text-[13px] font-semibold text-forest transition-colors hover:border-[#0B7A57] hover:bg-brand/5"
      >
        Done
      </button>
    </div>
  );
}

function SendInner({ onDone }: { onDone: () => void }) {
  const [state, action] = useActionState(sendMoney, initialSendState);
  if (state.status === "success" && state.sent) return <SuccessPanel sent={state.sent} onDone={onDone} />;

  const payeeError = state.fieldErrors?.payee?.[0];
  const amountError = state.fieldErrors?.amount?.[0];

  return (
    <form action={action}>
      <label htmlFor="payee" className="text-[12px] font-medium text-[#374151]">
        Payee
      </label>
      <select
        id="payee"
        name="payee"
        defaultValue=""
        className={`${fieldBase} mt-1.5 appearance-none ${payeeError ? fieldErr : fieldOk}`}
      >
        <option value="" disabled>
          Select a payee
        </option>
        {payees.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {payeeError ? <p className="mt-1.5 text-[11.5px] text-loss">{payeeError}</p> : null}

      <label htmlFor="amount" className="mt-3.5 block text-[12px] font-medium text-[#374151]">
        Amount (AED)
      </label>
      <input
        id="amount"
        name="amount"
        inputMode="decimal"
        placeholder="0.00"
        className={`${fieldBase} mt-1.5 font-mono ${amountError ? fieldErr : fieldOk}`}
      />
      {amountError ? <p className="mt-1.5 text-[11.5px] text-loss">{amountError}</p> : null}

      <SubmitButton />
    </form>
  );
}

export function SendMoneyForm() {
  const [k, setK] = useState(0);
  return <SendInner key={k} onDone={() => setK((v) => v + 1)} />;
}
