import Link from "next/link";
import { Badge, NavBar } from "@nibras/ui";
import { nav } from "@/lib/nav";

export default function PaymentsRoot() {
  return (
    <>
      <NavBar links={nav} />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <Badge>Payments squad · standalone</Badge>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Payments zone</h1>
        <p className="mt-2 text-neutral-500">
          This repo (<code>nibras-bank-payments</code>) runs standalone on <code>:3002</code> and is
          mounted at <code>/payments</code> under the bank&apos;s domain via Multi-Zones.
        </p>
        <Link
          href="/payments"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Go to payments →
        </Link>
      </main>
    </>
  );
}
