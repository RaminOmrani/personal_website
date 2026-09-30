import { useEffect, useState } from 'react';
import { useAppCopy } from '../copy';
import { applyUpdate, useUpdateReady } from '../lib/pwa';
import { Icon } from './Icon';

type Item = { id: number; text: string; out?: boolean };
let push: (text: string) => void = () => {};

/** A short message above the tab bar. */
export const toast = (text: string) => push(text);

export function Toasts() {
  const [items, setItems] = useState<Item[]>([]);
  const t = useAppCopy();
  const update = useUpdateReady();

  useEffect(() => {
    let id = 0;
    push = (text) => {
      const item = { id: ++id, text };
      setItems((l) => [...l.filter((x) => x.text !== text).slice(-1), item]);
      setTimeout(() => setItems((l) => l.map((x) => (x.id === item.id ? { ...x, out: true } : x))), 2600);
      setTimeout(() => setItems((l) => l.filter((x) => x.id !== item.id)), 2800);
    };
    return () => {
      push = () => {};
    };
  }, []);

  return (
    <div className="toasts" role="status" aria-live="polite">
      {update && (
        <button type="button" className="toast toast--update" onClick={applyUpdate}>
          <Icon name="refresh" size={18} />
          <span>{t.net.update}</span>
          <strong>{t.net.updateAction}</strong>
        </button>
      )}
      {items.map((x) => (
        <div key={x.id} className={x.out ? 'toast is-out' : 'toast'}>
          {x.text}
        </div>
      ))}
    </div>
  );
}
