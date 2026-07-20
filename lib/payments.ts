export type Payee = { id: string; name: string; iban: string };

export const payees: Payee[] = [
  { id: "p1", name: "Ahmed Al Mansoori", iban: "AE07 0331 2345 6789 0123 456" },
  { id: "p2", name: "Fatima Noor", iban: "AE12 0260 0011 2233 4455 667" },
  { id: "p3", name: "Etisalat", iban: "AE55 0500 0000 1234 5678 901" },
];

export type Payment = {
  id: string;
  date: string;
  payee: string;
  amount: number;
  status: "Completed" | "Pending";
};

export const history: Payment[] = [
  { id: "h1", date: "2026-07-09", payee: "Ahmed Al Mansoori", amount: 1500, status: "Completed" },
  { id: "h2", date: "2026-07-07", payee: "Etisalat", amount: 289, status: "Completed" },
  { id: "h3", date: "2026-07-05", payee: "Fatima Noor", amount: 750, status: "Completed" },
];

// Lives here: a "use server" module can only export async functions.
export type SendState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: { payee?: string[]; amount?: string[] };
  sent?: { payeeName: string; amount: number; iban: string };
};

export const initialSendState: SendState = { status: "idle" };
