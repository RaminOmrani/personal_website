import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Item = { id: number; text: string };
let push: (text: string) => void = () => {};

/** Show a short message at the bottom of the screen. */
export const toast = (text: string) => push(text);

export function Toaster() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    let id = 0;
    push = (text) => {
      const item = { id: ++id, text };
      setItems((l) => [...l.slice(-2), item]);
      setTimeout(() => setItems((l) => l.filter((x) => x.id !== item.id)), 3200);
    };
    return () => {
      push = () => {};
    };
  }, []);
  return (
    <div className="toasts" role="status" aria-live="polite">
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            className="toast"
            initial={{ opacity: 0, transform: 'translateY(16px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: 'translateY(8px) scale(0.98)', transition: { duration: 0.16 } }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
