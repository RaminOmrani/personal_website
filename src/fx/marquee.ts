import gsap from 'gsap';

/**
 * Infinite marquees whose speed and direction react to scroll velocity.
 * Returns a function to feed the current scroll velocity.
 */
export function initMarquees(root: ParentNode, reduced: boolean): (velocity: number) => void {
  const rtl = document.documentElement.dir === 'rtl';
  const tweens: { tween: gsap.core.Tween; dir: number }[] = [];
  root.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('.marquee-track');
    if (!track) return;
    const dir = Number(el.dataset.marquee) || 1;
    const tween = gsap.to(track, { xPercent: rtl ? 50 : -50, duration: 38, ease: 'none', repeat: -1 });
    // start deep into the timeline so it can also play backwards
    tween.totalTime(tween.duration() * 400);
    tween.timeScale(reduced ? 0 : dir);
    tweens.push({ tween, dir });
  });

  let scrollDir = 1;
  return (velocity: number) => {
    if (reduced) return;
    if (Math.abs(velocity) > 0.1) scrollDir = velocity > 0 ? 1 : -1;
    const boost = 1 + Math.min(Math.abs(velocity), 60) / 7;
    for (const { tween, dir } of tweens) {
      gsap.to(tween, { timeScale: dir * scrollDir * boost, duration: 0.6, overwrite: true });
    }
  };
}
