import { useEffect, useId, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { gsap } from '../lib/scroll';

/**
 * A cut-out portrait standing in a Persian arch (the logo's shape). The figure rises a little
 * faster than the page as you scroll, so it seems to step out of the frame.
 */
export function ArchPortrait({ src, alt, width, height, className, children }: { src: string; alt: string; width: number; height: number; className?: string; children?: ReactNode }) {
  const id = useId().replace(/:/g, '');
  const fig = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = fig.current;
    const im = img.current;
    if (!el || !im || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(im, { yPercent: 7 }, { yPercent: -3, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <figure className={clsx('arch-portrait', className)} ref={fig}>
      <svg className="arch-bg" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2356d6" />
            <stop offset=".6" stopColor="#1673c4" />
            <stop offset="1" stopColor="#0e9aa7" />
          </linearGradient>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8cf7a" />
            <stop offset="1" stopColor="#e0962f" />
          </linearGradient>
          <radialGradient id={`${id}s`} cx=".3" cy=".2" r=".8">
            <stop offset="0" stopColor="#fff" stopOpacity=".35" />
            <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M20 520 V220 C20 128 104 62 200 12 C296 62 380 128 380 220 V520 Z" fill={`url(#${id}f)`} />
        <path d="M20 520 V220 C20 128 104 62 200 12 C296 62 380 128 380 220 V520 Z" fill={`url(#${id}s)`} />
        <path d="M44 520 V230 C44 150 116 94 200 50 C284 94 356 150 356 230 V520" fill="none" stroke={`url(#${id}g)`} strokeWidth="3" vectorEffect="non-scaling-stroke" opacity=".9" />
      </svg>
      <img ref={img} className="arch-img" src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      {children}
    </figure>
  );
}
