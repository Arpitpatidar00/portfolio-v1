# Portfolio — Arpit Patidar

My personal site: work history, selected projects and a contact form.

**Live:** https://portfolio-v1-arpit-patidars-projects-8854eb72.vercel.app

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · Nodemailer · Cloudinary

## Highlights

- **Content lives in one place** — `src/constants/` holds site config, copy, projects and media, so updates never touch components.
- **SEO built in** — canonical URLs, sitemap, robots, Open Graph image and JSON-LD structured data (`src/lib/seo.ts`), with `npm run seo:check` to verify.
- **Image pipeline** — assets are uploaded to Cloudinary (`npm run assets:upload`) and served through a custom loader.
- **Contact form** — server route sends mail over SMTP with Nodemailer.

## Run locally

```bash
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL, SMTP_*, RECEIVER_EMAIL
npm install
npm run dev
npm run typecheck && npm run lint
```
