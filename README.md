# Strive LP

筋トレ記録・分析アプリ「Strive」の公式ランディングページ。

- Production: https://strive-lp-xi.vercel.app/
- App Store: https://apps.apple.com/jp/app/strive/id6770878590

## Development

Static HTML / CSS / JavaScript. No build step or runtime dependencies.

```sh
python3 -m http.server 4173
```

Open http://localhost:4173/. Deployment uses the existing Vercel `strive-lp` project.

## Structure

- `index.html`: Japanese copy, semantic sections, SEO / Open Graph metadata
- `css/style.css`: mobile-first presentation with desktop layouts
- `js/main.js`: optional, reduced-motion-aware scroll reveals
- `assets/`: optimized App Store marketing screenshots, icon, OGP image
- `robots.txt`, `sitemap.xml`: indexing configuration
- `app-ads.txt`: existing advertising declaration, preserved

## Verified content

App Store listing `6770878590` supplied the published marketing screenshots and confirmed the download destination. Images are real store assets, not reconstructed app UI. Store metadata retrieved 2026-09-22, version 1.0.9. `assets/workout.webp`, `home.webp`, `pr.webp`, `battle.webp`, and `history.webp` correspond to the five listing screenshots in that order. `icon.webp` comes from the previous LP's embedded icon.

The product owner confirmed Strive Pro includes only: ad removal, BIG3 analysis, previous-month report, and data export. No pricing is displayed. Product description, Growth Score, monthly growth comparison, and development story follow the owner's implementation brief.

## Outstanding assets

- TODO: Replace the explicitly labeled ANALYTICS placeholder with an actual current screenshot. Do not invent charts, data, or UI.
- TODO: When the owner supplies original HOME / WORKOUT / BATTLE captures, replace the existing store marketing compositions with large plain screenshot phone presentations. The current page labels store images accurately.

The app screenshots contain illustrative training records belonging to the published assets; these are not site claims of user counts, ratings, reviews, or guaranteed outcomes.

## Validation

Checked 320, 390, 768, 1024, and 1440 px widths, document overflow, internal anchors, image decoding, JavaScript errors, keyboard focus, and reduced motion handling. No external font dependency, no autoplay, no perpetual animations. Keep support links and `#support` available for existing App Store visitors.
