import type { ReactNode } from 'react';
import clsx from 'clsx';

/** A browser window. Shows a screenshot, or any children (a live demo). */
export function Browser({
  src,
  alt,
  url,
  children,
  className,
  eager,
}: {
  src?: string;
  alt?: string;
  url?: string;
  children?: ReactNode;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={clsx('browser', className)}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        {url && <span className="browser-url" dir="ltr">{url}</span>}
      </div>
      <div className="browser-screen">
        {children ?? <img src={src} alt={alt ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" width={1280} height={800} />}
      </div>
    </div>
  );
}

/** A phone with a notch. Shows a screenshot, or any children. */
export function Phone({
  src,
  alt,
  children,
  className,
  eager,
}: {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={clsx('phone', className)}>
      <div className="phone-screen">
        <span className="phone-island" aria-hidden="true" />
        {children ?? <img src={src} alt={alt ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" width={540} height={1170} />}
      </div>
    </div>
  );
}
