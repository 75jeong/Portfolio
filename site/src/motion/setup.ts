// Global motion: the loader counts his career (2000 to 2026), the exit strikes the year,
// page transitions strike across the screen before the ink sheet covers it.
import { gsap } from 'gsap';
import { ease, setLoaderExit, setLoaderFormat, setTransition } from '../engine';

export function setupMotion() {
  setLoaderFormat((p) => String(2000 + Math.round((p / 100) * 26)));

  setLoaderExit((root) => {
    const tl = gsap.timeline();
    tl.to(root.querySelector('.ld__strike'), { scaleX: 1, duration: 0.4, ease: ease.inOut })
      .to(root.querySelector('.ld__year span'), { yPercent: -105, duration: 0.5, ease: ease.inOut }, '+=0.05')
      .to(root.querySelectorAll('.ld__top, .ld__bar, .ld__strike'), { autoAlpha: 0, duration: 0.25 }, '<')
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: ease.inOut }, '-=0.3');
    return tl;
  });

  setTransition({
    leave: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const rule = c.querySelector('.curtain__rule');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { yPercent: 100 })
        .fromTo(rule, { scaleX: 0, transformOrigin: '0% 50%', autoAlpha: 1 }, { scaleX: 1, duration: 0.45, ease: ease.inOut })
        .to(panel, { yPercent: 0, duration: 0.65, ease: ease.inOut }, '-=0.1');
    },
    enter: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const rule = c.querySelector('.curtain__rule');
      return gsap.timeline()
        .to(rule, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.4, ease: ease.inOut })
        .to(panel, { yPercent: -100, duration: 0.8, ease: ease.inOut }, '-=0.15')
        .set(c, { autoAlpha: 0 });
    },
  });
}
