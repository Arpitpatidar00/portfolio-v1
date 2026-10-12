This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SEO & performance setup

This project ships with production SEO wiring. Before deploying:

1. **Set your domain.** Copy `.env.example` to `.env.local` (and add the same
   variables in your host, e.g. Vercel → Settings → Environment Variables).
   `NEXT_PUBLIC_SITE_URL` drives canonical URLs, the sitemap, Open Graph tags
   and structured data. Without it, Vercel's production URL is used.
2. **Deploy, then verify:**
   ```bash
   npm run build && npm start
   npm run seo:check                          # local
   npm run seo:check -- https://your-domain.com  # production
   ```
3. **Google Search Console:** verify the domain, submit `/sitemap.xml`, and
   run URL Inspection → "Test live URL" on `/`, `/about`, `/projects`.

Where things live:

| What | File |
| --- | --- |
| Titles, descriptions, canonicals, JSON-LD builders | `src/lib/seo.ts` |
| Site-wide metadata, robots meta, fonts | `src/app/layout.tsx` |
| `robots.txt` / `sitemap.xml` | `src/app/robots.ts`, `src/app/sitemap.ts` |
| Social preview image (generated) | `src/app/opengraph-image.tsx` |
| Structured data component | `src/components/JsonLd` |
| Caching and security headers | `next.config.ts` |
| Image/audio CDN URLs and `<Image>` loader | `src/lib/cloudinary.ts`, `src/lib/cloudinary-loader.ts` |

Preview deployments (`VERCEL_ENV !== "production"`) are automatically
`noindex` and blocked in `robots.txt`.

## Media (Cloudinary CDN)

Every image and audio file is served from Cloudinary, not from this app.
Source files live in `assets/` (they are **not** deployed); `public/` only
holds files Cloudinary can't serve on this plan (the résumé PDF).

- **`<Image>`**: keep using paths like `src="/personal/image3.jpeg"`. The global
  loader (`images.loaderFile`) turns them into responsive Cloudinary URLs
  (`f_auto,q_auto,w_…`), so always pass an accurate `sizes`.
- **Anything else** (CSS backgrounds, preloads, audio, JSON-LD): use
  `cloudinaryImage()` / `cloudinaryAudio()` from `src/lib/cloudinary.ts`.

### Adding or replacing an asset

1. Put the file in `assets/` (same folder structure as the path you'll use in code).
2. Run `yarn assets:upload` (or `yarn assets:upload personal` for one folder).
   Requires Node 22.18+ and `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` in `.env.local`.
3. Commit `src/lib/cloudinary-versions.json`. It holds each asset's version, so
   delivery URLs change whenever a file changes and can be cached as immutable.

To serve the résumé from Cloudinary too, enable **Settings → Security → Allow
delivery of PDF and ZIP files** in the Cloudinary console.
