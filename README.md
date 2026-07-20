# nibras-bank-payments

The **Payments** micro-frontend — **the Payments squad's own repo**. A standalone Next.js 16 app that
owns `/payments/*` and is composed into the Nibras Bank shell via **Multi-Zones**. Includes a real
**Send-money Server Action** with Zod validation.

> **Nibras Bank is a fictional bank** for a developer demo — not a real institution, not affiliated
> with anyone.

**▶ Live:** [nibras-bank-shell.vercel.app/payments](https://nibras-bank-shell.vercel.app/payments) (composed in the shell) · standalone: [nibras-bank-payments.vercel.app](https://nibras-bank-payments.vercel.app)

Part of the mesh: **[nibras-bank-shell](https://github.com/hafisn07/nibras-bank-shell)** ·
**[nibras-bank-accounts](https://github.com/hafisn07/nibras-bank-accounts)** ·
**nibras-bank-payments** (this) · **[nibras-bank-cards](https://github.com/hafisn07/nibras-bank-cards)** ·
**[nibras-bank-ui](https://github.com/hafisn07/nibras-bank-ui)** (shared `@nibras/ui`).

## Run standalone

```bash
npm install      # also pulls @nibras/ui from GitHub
npm run dev      # http://localhost:3002
```

Under the shell it appears at `http://localhost:3000/payments`.

## How it fits

Owns `/payments/*`; sets `assetPrefix: "/payments-static"`. Depends on `@nibras/ui`
(`github:hafisn07/nibras-bank-ui`, kept current by Renovate). Deploys independently of every other
zone.
