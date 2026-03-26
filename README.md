This is the Equipra landing site built with [Next.js](https://nextjs.org).

## Local development

Install dependencies, then start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production checks

```bash
./node_modules/.bin/tsc --noEmit
npm run build
```

## Deploying on Vercel

This project is ready to deploy on Vercel as a standard Next.js app.

Recommended environment variables:

- `NEXT_PUBLIC_SITE_URL`
  Use your production domain, for example `https://equipra.com`.

Notes:

- On Vercel, metadata falls back to `VERCEL_PROJECT_PRODUCTION_URL` automatically if `NEXT_PUBLIC_SITE_URL` is not set.
- `next.config.ts` pins `turbopack.root` to this project directory so builds do not inherit the wrong root when multiple lockfiles exist nearby.
- `app/robots.ts` and `app/sitemap.ts` are included for production crawlers.
- The project currently builds through webpack (`next build --webpack`), which is the verified production path for this repo.

Deployment steps:

1. Import the repository into Vercel.
2. Keep the framework preset as `Next.js`.
3. Add `NEXT_PUBLIC_SITE_URL` in Project Settings for production.
4. Deploy.
