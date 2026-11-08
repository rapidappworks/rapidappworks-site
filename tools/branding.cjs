// Generate stable website aliases from the selected pack. No browser runtime needed.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'branding.json'), 'utf8'));
const checking = process.argv.includes('--check');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function within(base, relative) {
  const resolved = path.resolve(base, relative);
  if (!resolved.startsWith(base + path.sep)) throw new Error(`Path outside ${base}: ${relative}`);
  return resolved;
}
const pack = within(root, config.assetPack);
const checksums = new Map(fs.readFileSync(path.join(pack, 'MANIFEST.sha256'), 'utf8')
  .trim().split(/\r?\n/).map(line => [line.slice(66), line.slice(0, 64)]));
for (const [name, asset] of Object.entries(config.assets)) {
  const source = within(pack, asset.source);
  const destination = within(path.join(root, 'assets'), path.relative(path.join(root, 'assets'), within(root, asset.output)));
  const bytes = fs.readFileSync(source);
  if (hash(bytes) !== checksums.get(asset.source)) throw new Error(`Source checksum mismatch: ${name}`);
  if (checking) {
    if (!fs.existsSync(destination) || hash(fs.readFileSync(destination)) !== hash(bytes)) {
      throw new Error(`Branding is stale: ${asset.output}; run node tools/branding.cjs`);
    }
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, bytes);
  }
  console.log(`${checking ? 'Verified' : 'Updated'} ${asset.output}`);
}
