import type { SVGProps } from 'react';

/** Stroke icons (Lucide-style, 24×24). Brand marks use fills. */
const paths: Record<string, string> = {
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
  sms: '<path d="M21 14.5a2 2 0 0 1-2 2H8l-5 4V5.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/><path d="M8 9.5h8M8 12.5h5"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
  users: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7.5" r="3.5"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.87M16 4.13a4 4 0 0 1 0 7.75"/>',
  chart: '<path d="M3 3.5v17h18"/><path d="M7.5 16v-4M12 16V8M16.5 16v-6.5"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h3"/>',
  pen: '<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.5 18.5 3.5 19.5l1-4Z"/>',
  shield: '<path d="M12 21.5s8-3.6 8-10V5l-8-2.5L4 5v6.5c0 6.4 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  video: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="m10 9 5 3-5 3Z"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  excel: '<rect x="3.5" y="3" width="17" height="18" rx="2.5"/><path d="M3.5 9h17M3.5 15h17M10 3v18"/>',
  kanban: '<rect x="3" y="3.5" width="5" height="17" rx="1.5"/><rect x="9.5" y="3.5" width="5" height="11" rx="1.5"/><rect x="16" y="3.5" width="5" height="14" rx="1.5"/>',
  bell: '<path d="M6 8.5a6 6 0 0 1 12 0c0 7 3 8.5 3 8.5H3s3-1.5 3-8.5"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  layers: '<path d="m12 2.5 9.5 5-9.5 5-9.5-5Z"/><path d="m2.5 12.5 9.5 5 9.5-5M2.5 17 12 22l9.5-5"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  mic: '<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  bolt: '<path d="M13 2.5 4 14h7l-1 7.5L19 10h-7Z"/>',
  sparkle: '<path d="M12 3.5 13.9 9a2 2 0 0 0 1.2 1.2l5.4 1.8-5.4 1.8a2 2 0 0 0-1.2 1.2L12 20.5 10.1 15a2 2 0 0 0-1.2-1.2L3.5 12l5.4-1.8A2 2 0 0 0 10.1 9Z"/><path d="M19.5 3v3M21 4.5h-3"/>',
  filter: '<path d="M3 4.5h18l-7 8.5v6l-4 2v-8Z"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-4-7-12.5-7-12.5S5 11 5 15a7 7 0 0 0 7 7Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.5-4.5"/>',
  wallet: '<path d="M19 7V5.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5"/><path d="M16.5 14h.01"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19Z"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4.5"/><circle cx="12" cy="3.5" r="1"/><path d="M9 13.5h.01M15 13.5h.01M2 13v3M22 13v3"/>',
  arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  external: '<path d="M17 17 7 7M7 15.5V7h8.5"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  call: '<path d="M21.5 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 4.2 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L7.6 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6 9 7 9-7"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  chevron: '<path d="m15 18-6-6 6-6"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
};

const brands: Record<string, string> = {
  whatsapp:
    '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"/>',
  telegram:
    '<path fill="currentColor" d="M21.94 4.3 18.9 18.66c-.23 1.01-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.72 8.6-7.77c.37-.33-.08-.52-.58-.19L7.12 12.7l-4.58-1.43c-1-.31-1.01-1 .21-1.47L20.63 2.9c.83-.31 1.56.19 1.31 1.4Z"/>',
};

export type IconName = keyof typeof paths | keyof typeof brands;

/** Glyphs that point along the reading direction; drawn for right-to-left and mirrored on left-to-right pages (CSS `.icon-dir`). */
const directional = new Set(['arrow', 'chevron', 'external']);

export function Icon({ name, size = 20, className, ...rest }: { name: IconName | string; size?: number } & SVGProps<SVGSVGElement>) {
  const brand = brands[name];
  const cls = [directional.has(name) && 'icon-dir', className].filter(Boolean).join(' ') || undefined;
  return (
    <svg
      className={cls}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={brand ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
      dangerouslySetInnerHTML={{ __html: brand ?? paths[name] ?? '' }}
    />
  );
}
