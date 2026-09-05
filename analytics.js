(function () {
  if (typeof window.gtag !== 'function') return;

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    const badge = event.target.closest('.store-badge');
    if (!badge) return;

    let location = 'page';
    if (badge.closest('header')) location = 'header';
    else if (badge.closest('.hero')) location = 'hero';
    else if (badge.closest('.how')) location = 'how_it_works';
    else if (badge.closest('.final-cta')) location = 'final_cta';

    window.gtag('event', 'chrome_web_store_click', {
      cta_location: location,
      link_url: badge.href,
    });
  });

  if ('IntersectionObserver' in window) {
    const seen = new Set();
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          window.gtag('event', 'feature_section_view', {
            feature_name:
              entry.target.querySelector('.eyebrow')?.textContent.trim() ||
              'unknown',
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll('.feature-row').forEach(function (section) {
      observer.observe(section);
    });
  }
})();
