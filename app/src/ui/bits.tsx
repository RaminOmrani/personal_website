import { useId, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import logoMark from '../../../v3/public/brand/logo-mark.svg';
import { navigate } from '../lib/router';

/** The mark (lapis tile, gold arch, ر), straight from v3's brand file; inlined by the build. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return <img className="logo-mark" src={logoMark} width={size} height={size} alt="" draggable={false} />;
}

/** An in-app link: a real href (so long-press and new-tab still work), a pushed screen on tap. */
export function Link({ to, children, ...rest }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`#${to}`}
      {...rest}
      onClick={(e) => {
        rest.onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

/** A picture that fades in over a soft tile once it has loaded. */
export function Img({ src, alt, className, style, eager, width, height }: { src: string; alt: string; className?: string; style?: CSSProperties; eager?: boolean; width?: number; height?: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={`img ${className ?? ''}`} style={style} data-loaded={loaded || undefined}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoaded(true);
        }}
      />
    </span>
  );
}

/** Ramin standing in a Persian arch, the logo's shape; his head steps just out of the frame. */
export function ArchPortrait({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <figure className={`arch ${className ?? ''}`}>
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
      <img className="arch-img" src={src} alt={alt} loading="eager" decoding="async" draggable={false} />
    </figure>
  );
}
