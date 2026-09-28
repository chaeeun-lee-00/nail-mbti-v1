// Vercel Web Analytics: visitors and page views, without quiz answers or nicknames.
(() => {
  if (location.protocol !== 'https:') return;

  const mounted = location.pathname === '/nail-mbti' || location.pathname.startsWith('/nail-mbti/');
  const endpoint = `${mounted ? '/nail-mbti' : ''}/_vercel/insights`;
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  window.va('beforeSend', (event) => {
    const url = new URL(event.url);
    url.search = '';
    url.hash = '';
    return { ...event, url: url.href };
  });

  const script = document.createElement('script');
  script.defer = true;
  script.src = `${endpoint}/script.js`;
  // Route collection to the nail project too, rather than the host project's analytics.
  script.dataset.endpoint = endpoint;
  document.head.appendChild(script);
})();
