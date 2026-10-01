import { useEffect, useState } from 'react';

/**
 * Where to get the Android app: Cafe Bazaar, Myket, Google Play and the APK itself. The site build
 * writes ../app-links.json from deploy/android.json; every link stays hidden until it is filled in
 * there (the APK until the file is really on the server), so nothing changes in the app to publish.
 */
export type AndroidLinks = { bazaar?: string; myket?: string; googlePlay?: string; apk?: string };

/** Inside the installed app (Android TWA, or an installed PWA) the store links make no sense. */
export const isInstalled = () =>
  matchMedia('(display-mode: standalone)').matches ||
  document.referrer.startsWith('android-app://') ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

let request: Promise<AndroidLinks> | null = null;
function load(): Promise<AndroidLinks> {
  request ??= (async () => {
    try {
      const res = await fetch(new URL('../app-links.json', location.href), { cache: 'no-cache' });
      if (!res.ok) return {};
      const { stores = {}, apk } = await res.json();
      const links: AndroidLinks = { bazaar: stores.bazaar || undefined, myket: stores.myket || undefined, googlePlay: stores.googlePlay || undefined };
      if (apk) {
        const url = new URL(apk, location.href).href;
        const head = await fetch(url, { method: 'HEAD', cache: 'no-cache' }).catch(() => null);
        if (head?.ok) links.apk = url;
      }
      return links;
    } catch {
      return {};
    }
  })();
  return request;
}

/** The links, once loaded and only outside the installed app; null while loading or not needed. */
export function useAndroidLinks(enabled: boolean): AndroidLinks | null {
  const [links, setLinks] = useState<AndroidLinks | null>(null);
  useEffect(() => {
    if (!enabled || isInstalled()) return;
    let alive = true;
    load().then((l) => alive && setLinks(l));
    return () => {
      alive = false;
    };
  }, [enabled]);
  return links;
}
