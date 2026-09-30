import type { SVGProps } from 'react';
import { Icon as SiteIcon } from '../../../v3/src/ui/Icon';

/**
 * v3's icon set, plus the few glyphs only the app needs (tab bar, app bar, settings).
 * Same style: Lucide-like strokes on a 24×24 grid.
 */
const extra: Record<string, string> = {
  home: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v10a1.5 1.5 0 0 0 1.5 1.5h3.5v-6h3v6H17a1.5 1.5 0 0 0 1.5-1.5V9"/>',
  work: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7"/><path d="M3 12.5h18"/>',
  services: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="3.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="3.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  settings:
    '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',
  share: '<path d="M12 3.5v12M7.5 8 12 3.5 16.5 8"/><path d="M5 12.5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  language: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  wifiOff: '<path d="M2 8.5a15 15 0 0 1 4.2-2.6M9.8 5.1A15 15 0 0 1 22 8.5M5 12a10 10 0 0 1 3-1.8M16 10.2A10 10 0 0 1 19 12M8.5 15.5a5 5 0 0 1 7 0M12 19.5h.01M3 3l18 18"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
  expand: '<path d="M14.5 3.5h6v6M9.5 20.5h-6v-6M20.5 3.5 14 10M3.5 20.5 10 14"/>',
};

export function Icon({ name, size = 20, className, ...rest }: { name: string; size?: number } & SVGProps<SVGSVGElement>) {
  const d = extra[name];
  if (!d) return <SiteIcon name={name} size={size} className={className} {...rest} />;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}
