/**
 * Generative ambient soundscape built with the Web Audio API — no audio files.
 * Off by default; it only starts after the visitor presses the sound button.
 */
export class Ambient {
  on = false;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private fx: GainNode | null = null;

  private build(): void {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // soft space: feedback delay
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(master);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 6;
    filter.connect(master);
    filter.connect(delay);

    // slow breathing filter sweep
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.055;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 320;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // a drone on A with a fifth and a shimmering octave
    const voices: [OscillatorType, number, number][] = [
      ['sawtooth', 55, 0.16],
      ['sawtooth', 55.3, 0.12],
      ['triangle', 82.41, 0.14],
      ['sine', 110, 0.12],
      ['sine', 164.81, 0.05],
      ['sine', 220.4, 0.035],
    ];
    for (const [type, freq, gain] of voices) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = gain;
      osc.connect(g).connect(filter);
      osc.start();
    }

    const fx = ctx.createGain();
    fx.gain.value = 1;
    fx.connect(master);
    fx.connect(delay);

    this.ctx = ctx;
    this.master = master;
    this.fx = fx;
  }

  async toggle(): Promise<boolean> {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    const g = this.master!.gain;
    this.on = !this.on;
    if (this.on) await ctx.resume();
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(this.on ? 0.22 : 0, now + (this.on ? 2.2 : 0.6));
    if (!this.on) window.setTimeout(() => !this.on && ctx.suspend(), 700);
    return this.on;
  }

  /** Short glassy tick for hovers. */
  blip(pitch = 1): void {
    if (!this.on || !this.ctx || !this.fx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1320 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(660 * pitch, now + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.05, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(g).connect(this.fx);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}
