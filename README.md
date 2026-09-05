# YTDigest landing page

A static, responsive landing page. No installation, build step, JavaScript runtime, or external font service is required. Open `index.html` directly in a browser.

Publish `index.html`, `styles.css`, `yt-digest/`, `assets/`, `.nojekyll`, `robots.txt`, `sitemap.xml`, and `CNAME` to the root of the GitHub Pages source branch. In repository Settings → Pages, choose Deploy from a branch and the root directory of that branch.

## Custom domain

The brand home page is https://rapidappworks.com/ and YTDigest is https://rapidappworks.com/yt-digest/. Future apps can use their own folders. GitHub Pages redirects /yt-digest to /yt-digest/. The new GitHub account and repository are pending. After creating the account using rapidappworks@gmail.com:

1. Create a public repository (suggested name: rapidappworks-site), upload the static site files, and enable Pages from the main branch, root directory.
2. Add rapidappworks.com in GitHub Pages settings before changing DNS. The included CNAME file, canonical URL, og:url, and sitemap already use this domain.
3. Add four A records for @: 185.199.108.153, 185.199.109.153, 185.199.110.153, and 185.199.111.153. Add a www CNAME to the actual GitHub username followed by .github.io (without a repository path). Preserve unrelated mail/TXT records. Enable Enforce HTTPS when available.
4. Verify the final URL and submit the sitemap in Google Search Console.

GitHub's current instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

The page includes a descriptive title, meta description, social text metadata, semantic headings, visible FAQs, and SoftwareApplication structured data. Search rankings and rich results are not guaranteed.

## Google Analytics 4

All public pages use the Google tag with GA4 Measurement ID `G-VMC909K813` and
load `analytics.js` for the product-specific events below.

The integration records the standard GA4 page view plus these custom events:

- `chrome_web_store_click`, with `cta_location`
- `feature_section_view`, with `feature_name`

Register `cta_location` and `feature_name` as event-scoped custom dimensions in
GA4 if they are needed in reports and explorations.

Product claims are based on the Chrome Web Store listing and local extension documentation. The workflow graphic is an HTML/CSS illustration, explicitly labeled as an example. The active extension icon was copied from utubext/icon128.png. ChatGPT account requirements and subtitle availability are stated in the FAQ.

