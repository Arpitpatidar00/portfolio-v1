#!/usr/bin/env node
/**
 * SEO smoke test — checks what a crawler receives (raw HTML, no JavaScript).
 *
 *   npm run build && npm start            # in one terminal
 *   npm run seo:check                     # checks http://localhost:3000
 *   npm run seo:check -- https://your-domain.com
 *
 * Exits with code 1 if any check fails, so it can run in CI.
 */

const base = (process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");
const pages = ["/", "/about", "/projects", "/contact"];

let failures = 0;
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  failures += 1;
  console.log(`  ✗ ${msg}`);
};
const check = (condition, msg) => (condition ? ok(msg) : fail(msg));

const attr = (html, re) => html.match(re)?.[1];

async function checkPage(path) {
  console.log(`\n${path}`);
  const res = await fetch(base + path, { redirect: "manual" });
  check(res.status === 200, `status 200 (got ${res.status})`);
  const html = await res.text();

  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/i);
  check(title && title.length >= 10 && title.length <= 70, `title 10–70 chars: "${title}"`);

  const description = attr(html, /<meta name="description" content="([^"]*)"/i);
  check(description && description.length >= 50 && description.length <= 160, `meta description 50–160 chars (${description?.length ?? 0})`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/i);
  const samePath = (url) => {
    try {
      return new URL(url).pathname.replace(/\/$/, "") === path.replace(/\/$/, "");
    } catch {
      return false;
    }
  };
  check(canonical && samePath(canonical), `canonical points to this page: ${canonical}`);
  check(canonical && !canonical.includes("localhost") || base.includes("localhost"), "canonical is not localhost in production");

  check(!/<meta name="robots" content="[^"]*noindex/i.test(html), "not noindexed");
  check(/<meta property="og:image" content="[^"]+"/i.test(html), "has og:image");

  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  check(h1s.length === 1, `exactly one <h1> (found ${h1s.length})`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  check(blocks.length > 0, `has JSON-LD (${blocks.length} block)`);
  for (const [, json] of blocks) {
    try {
      JSON.parse(json);
      ok("JSON-LD parses");
    } catch {
      fail("JSON-LD is invalid JSON");
    }
  }

  // All media is served by Cloudinary (src/lib/cloudinary.ts); nothing should load from the app server.
  const notOnCdn = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)]
    .map((m) => m[1])
    .filter((src) => !src.startsWith("https://res.cloudinary.com/") && !src.startsWith("data:"));
  check(notOnCdn.length === 0, `all <img> served from Cloudinary${notOnCdn.length ? ": " + notOnCdn.join(", ") : ""}`);
}

async function main() {
  console.log(`SEO check for ${base}`);
  for (const path of pages) await checkPage(path);

  console.log("\n/robots.txt");
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  check(/Sitemap:\s*\S+/i.test(robots), "declares Sitemap");
  check(!/Disallow:\s*\/\s*$/m.test(robots) || base.includes("localhost"), "does not block the whole site");

  console.log("\n/sitemap.xml");
  const sitemapRes = await fetch(`${base}/sitemap.xml`);
  check(sitemapRes.status === 200, "status 200");
  const sitemap = await sitemapRes.text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, ""));
  for (const path of pages) check(locs.includes(path.replace(/\/$/, "")), `lists ${path}`);

  console.log("\n/this-page-does-not-exist");
  const missing = await fetch(`${base}/this-page-does-not-exist`);
  check(missing.status === 404, `returns 404 (got ${missing.status})`);

  console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
