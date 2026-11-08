# YT Digest — Single Grey / v2

**Final decision, frozen on 8 November 2026.** This is the full gray asset pack for the
approved Play + Zap shape. The symbol uses **#666666**; the zap and exterior
are genuinely transparent. Geometry, corner radii, scale and position are
unchanged from the approved shape.

Start with `preview/index.html` or `preview/asset-sheet.png`.
Give the integration agent `integration/HANDOFF.md`.

## Contents

- `svg/ytdigest-grey.svg`: canonical single-color vector master.
- `png/ytdigest-SIZE.png`: transparent exports at 16, 24, 32, 48, 64, 96, 128,
  180, 192, 256, 384, 512, 1024 and 2048 px.
- `components/`: separate gray play and zap paths for editing. The master
  subtracts the zap contour; do not layer a solid gray zap over the gray play.
- `opaque/light/` and `opaque/dark/`: gray symbol flattened on white or black,
  at 128/512/1024/2048 px. The symbol itself remains #666666 in both.
- `platforms/chrome/`: ready-named 16/24/32/48/128 px icons and manifest fragment.
- `platforms/web/`: SVG/PNG/ICO favicons, opaque 180 px Apple touch icon,
  and transparent 192/512 px web app icons.
- `integration/`: configuration fragment and handoff.
- `source-lock.json`, `asset-pack.json`, `verification.json`, `MANIFEST.sha256`:
  source identity, export metadata, validation and per-file integrity.

There is one mark color. No black, white, inverse or opaque-white-zap logo
variant is included. In the opaque exports the background also shows through
the zap. Choose the background for the consuming surface; do not recolor the
mark or introduce a white fill in the hole.

Every PNG is rendered directly from the vector, with normal antialiasing at
its edges. The vector ink is exactly #666666. A 32 px asset displayed at 16 CSS
pixels provides a 2× source where supported.

## Rebuild

With Node.js and Sharp 0.35.5:

```text
npm install
node build.cjs
```

The builder also supports this workstation's bundled Sharp runtime. It writes
only inside this pack and checks the locked master hash. Create a new version
for future geometry changes.

Superseded black-and-white packs and preview experiments have been removed.
Only this final gray pack and the old artwork still used by the extension remain.
No active extension icon, website, root branding configuration, release version,
permission, store listing or rendered media was changed by this pack build.

