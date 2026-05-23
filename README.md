# SalesCommand

Live field sales manager for India. The app is now dependency-free and runs as a static web app with local browser storage.

## What Works

- Dashboard with target progress, orders, collections, cheque status, damages, returns, and route summary
- GST-aware order builder with MRP-inclusive taxable value, CGST, SGST, discounts, and invoice totals
- Cash and cheque collection entry with verification/clearing actions
- Damage and return logging
- GPS route stop logging
- Local insight assistant generated from current sales data
- JSON export and local demo reset

## Run Locally

Use Node.js:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

If port 3000 is busy, the server automatically tries the next available port.

## Deploy

Upload the `public` folder to any static host, or deploy this folder to Vercel. The app does not require API keys or server-side dependencies.
