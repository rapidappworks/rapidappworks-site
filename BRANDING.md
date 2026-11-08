# Website branding

`branding.json` selects the YT Digest **Chrome extension website** asset pack and
maps its sources to stable public aliases. To change the logo, add a new pack,
update `assetPack` and source paths, then run:

```sh
node tools/branding.cjs
node tools/branding.cjs --check
```

The sync verifies source hashes against the pack's `MANIFEST.sha256`. The check
command verifies that public aliases match the configured sources. Keep stable
output paths when switching packs so consumers need no edits.

Consumers are `yt-digest/index.html` (header, interactive extension demonstration,
SVG favicon, fallback favicon and Apple touch icon), its privacy policy, and the
Chrome extension card on `index.html`. SVG preserves the gray mark and transparent
zap at every display size. A 128 px raster alias is available for PNG consumers.

The selected source is `ytdigest-play-zap-grey-v2`, copied from the sibling
YTDigest project's approved asset pack. Only web sources are retained here.
All visible ink remains #666666; never recolor the mark or fill its zap.

Android pages and assets, the abandoned `ytdigest/` framework scaffold, old
experiments, and `.publish/` staging are outside this website sync. Baked-in
logos in screenshots or rendered media require separate recapture.

Preview locally with `node tools/preview.cjs`, then visit
http://127.0.0.1:4175/yt-digest/.
