import type { ReactNode } from 'react';
import clsx from 'clsx';

/** A browser window with a glass toolbar. */
export function Browser({ src, alt = '', url, className, eager, children }: { src?: string; alt?: string; url?: string; className?: string; eager?: boolean; children?: ReactNode }) {
  return (
    <div className={clsx('frame-browser', className)}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        {url && (
          <span className="frame-url" dir="ltr">
            {url}
          </span>
        )}
      </div>
      <div className="frame-screen">{children ?? <img src={src} alt={alt} width={1280} height={800} loading={eager ? 'eager' : 'lazy'} decoding="async" />}</div>
    </div>
  );
}

/** A phone with a metal rim; content is sized in container units so live demos scale with it. */
export function Phone({ src, alt = '', className, eager, children }: { src?: string; alt?: string; className?: string; eager?: boolean; children?: ReactNode }) {
  return (
    <div className={clsx('frame-phone', className)}>
      <div className="frame-phone-screen">
        <span className="frame-island" aria-hidden="true" />
        {children ?? <img src={src} alt={alt} width={540} height={1170} loading={eager ? 'eager' : 'lazy'} decoding="async" />}
      </div>
    </div>
  );
}
