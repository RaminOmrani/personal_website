import { useId } from 'react';
import clsx from 'clsx';
import { useSite } from '../data/site';
import { useLang } from '../i18n';

/** The letter ر (Estedad Black), as outlines, so the mark never depends on a font. */
const REH = 'M8 27.10L0 10.50Q8.40 7.20 13.40 4.10Q18.40 1 20.60-2.40Q22.80-5.80 22.80-9.90Q22.80-13.40 21.55-17.35Q20.30-21.30 17.70-27.60L33.40-36.10Q37.20-27.70 38.65-21.90Q40.10-16.10 40.10-10.80Q40.10 1.80 32.05 11.05Q24 20.30 8 27.10';

/**
 * The mark: a lapis-to-turquoise tile with a gold Persian arch (طاق) and the letter ر.
 * The arch doubles as the frame for photos across the site.
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={clsx('logo-mark', className)} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2356D6" />
          <stop offset=".55" stopColor="#1673C4" />
          <stop offset="1" stopColor="#0E9AA7" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8CF7A" />
          <stop offset="1" stopColor="#E0962F" />
        </linearGradient>
        <radialGradient id={`${id}s`} cx=".28" cy=".18" r=".75">
          <stop offset="0" stopColor="#fff" stopOpacity=".32" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="116" height="116" rx="32" fill={`url(#${id}t)`} />
      <rect x="2" y="2" width="116" height="116" rx="32" fill={`url(#${id}s)`} />
      <path className="logo-arch" d="M31 99 V60 C31 43 43 30 60 20 C77 30 89 43 89 60 V99" fill="none" stroke={`url(#${id}g)`} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
      <path d={REH} fill="#fff" transform="translate(46.36 73.06) scale(0.6804)" />
    </svg>
  );
}

/** Mark + wordmark; `latin` adds the name in Latin letters under the Persian one (Persian page only). */
export function Logo({ size = 40, latin = false }: { size?: number; latin?: boolean }) {
  const site = useSite();
  const lang = useLang();
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-words">
        <strong>{site.name}</strong>
        {latin && lang === 'fa' && <small dir="ltr">RAMIN OMRANI</small>}
      </span>
    </span>
  );
}
