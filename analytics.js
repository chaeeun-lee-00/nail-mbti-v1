// Two analytics backends, split by what each plan allows:
//   Vercel Web Analytics - visitors and page views (available on Hobby).
//   PostHog              - funnel custom events, which Vercel gates behind Pro.
// Neither receives nicknames or quiz answers.
(() => {
  // Public client-side key; the private one is phx_ and is not used here.
  const POSTHOG_KEY = 'phc_BKw9wMhmWFRqnCGUukc46PRyXpsrBeD34Ut9uHG8FBAn';

  // Keep trackEvent callable even when analytics is off, so app.js never guards.
  window.trackEvent = () => {};
  if (location.protocol !== 'https:') return;

  const mounted = location.pathname === '/nail-mbti' || location.pathname.startsWith('/nail-mbti/');
  const prefix = mounted ? '/nail-mbti' : '';
  const endpoint = `${prefix}/_vercel/insights`;
  // patz.kr sends `script-src 'self'` and `connect-src 'self'`, so posthog.com
  // is unreachable directly. Go through the same-origin /ph rewrites in
  // vercel.json instead of loosening the site's CSP.
  const POSTHOG_HOST = `${prefix}/ph`;

  // Strip query strings and hashes before either backend sees a URL.
  const cleanUrl = value => {
    try {
      const url = new URL(value);
      url.search = '';
      url.hash = '';
      return url.href;
    } catch (_) {
      return value;
    }
  };

  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  window.va('beforeSend', event => ({ ...event, url: cleanUrl(event.url) }));

  const script = document.createElement('script');
  script.defer = true;
  script.src = `${endpoint}/script.js`;
  // Route collection to the nail project too, rather than the host project's analytics.
  script.dataset.endpoint = endpoint;
  document.head.appendChild(script);

  if (!POSTHOG_KEY.startsWith('phc_')) return;

  // Official posthog-js loader snippet. The stub queues calls made before load.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Real PostHog origin, needed for the toolbar since api_host is a proxy path.
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30',
    // Count anonymous funnel steps; no person profiles, no identify calls.
    person_profiles: 'identified_only',
    // Off so no DOM text, input value, or recording can carry a nickname.
    autocapture: false,
    disable_session_recording: true,
    capture_pageview: true,
    capture_pageleave: false,
    respect_dnt: true,
    before_send: event => {
      if (!event) return event;
      const props = event.properties || {};
      ['$current_url', '$referrer', '$initial_current_url', '$initial_referrer'].forEach(key => {
        if (typeof props[key] === 'string') props[key] = cleanUrl(props[key]);
      });
      delete props.$pathname_with_query;
      return { ...event, properties: props };
    },
  });

  // The app and this site share one PostHog project (extra projects are paid),
  // so stamp every event here. $lib is already 'web' vs the app SDK's own value,
  // but that would lump this quiz in with any other web surface added later.
  window.posthog.register({ app: 'nail-mbti', platform: 'web' });

  window.trackEvent = (name, properties) => {
    try {
      window.posthog.capture(name, properties);
    } catch (_) {
      /* never let analytics break the quiz */
    }
  };
})();
