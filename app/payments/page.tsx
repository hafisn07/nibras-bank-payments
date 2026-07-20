import { NavBar } from "@nibras/ui";
import { nav } from "@/lib/nav";
import { history } from "@/lib/payments";
import { SendMoneyForm } from "./send-money-form";

const nf = new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function initials(name: string) {
  const [first = "", second] = name.trim().split(/\s+/);
  if (second) return (first.charAt(0) + second.charAt(0)).toUpperCase();
  return name.slice(0, 2);
}

export default function PaymentsPage() {
  return (
    <>
      <NavBar links={nav} current="/payments" />
      <main className="nb-canvas">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-[22px] px-6 py-8 md:pb-[46px]">
          <h1 className="text-[28px] font-semibold tracking-[-.025em]">Payments</h1>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            <div className="rounded-[16px] border border-hair bg-white p-[22px] shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)]">
              <div className="mb-4 text-[15px] font-semibold">Send money</div>
              <SendMoneyForm />
            </div>

            <div className="overflow-hidden rounded-[16px] border border-hair bg-white shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)]">
              <div className="px-[22px] pb-3 pt-4 text-[15px] font-semibold">Recent payments</div>
              {history.map((p) => (
                <div key={p.id} className="flex items-center justify-between border-t border-line-soft px-[22px] py-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-[34px] items-center justify-center rounded-full bg-[#EEF2EF] text-[12px] font-semibold text-[#5C6B63]">
                      {initials(p.payee)}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-medium">{p.payee}</div>
                      <div className="font-mono text-[11px] text-faint">{p.status}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[14px] font-semibold tabular-nums text-loss">−{nf.format(p.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
