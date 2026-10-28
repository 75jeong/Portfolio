// Page modules. Each registers through onPage, checks for its markup, and cleans up after itself.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, scrollToTarget } from '../engine';

gsap.registerPlugin(ScrollTrigger);

// Hero: the tagline sets line by line, then the editor strikes "not just screens".
onPage(({ intro }) => {
  const lines = document.querySelectorAll('[data-hero-ln]');
  if (!lines.length || prefersReducedMotion()) return;
  gsap.set(lines, { yPercent: 110 });
  intro.to(lines, { yPercent: 0, duration: 1.2, stagger: 0.09, ease: ease.out }, 0);
  document.querySelectorAll<HTMLElement>('[data-strike="intro"] .strike__rule').forEach((r) => {
    intro.fromTo(r, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: ease.inOut }, 1.15);
  });
});

// Strikes drawn when they enter the viewport (case decisions, 404 uses intro).
onPage(({ intro }) => {
  if (prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-strike="scroll"] .strike__rule').forEach((r) => {
    gsap.fromTo(r, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: ease.inOut, scrollTrigger: { trigger: r.parentElement!, start: 'top 80%', once: true } });
  });
  if (!document.querySelector('[data-hero-ln]')) {
    document.querySelectorAll<HTMLElement>('[data-strike="intro"] .strike__rule').forEach((r) => {
      gsap.set(r, { scaleX: 0 });
      intro.to(r, { scaleX: 1, duration: 0.9, ease: ease.inOut }, 0.5);
    });
  }
});

// Signature: the cuts ledger. Scroll scrubs each strike; once the cut is struck the kept line sets.
onPage(() => {
  const list = document.querySelector('[data-ledger]');
  if (!list) return;
  const rows = [...list.querySelectorAll<HTMLElement>('.cut')];
  if (!prefersReducedMotion()) {
    rows.forEach((row) => {
      const rule = row.querySelector('.strike__rule');
      const what = row.querySelector('.cut__what');
      const kept = row.querySelector('[data-kept]');
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 40%', scrub: 0.6 } });
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 })
        .fromTo(what, { opacity: 1 }, { opacity: 0.55, ease: 'none', duration: 0.6 }, 0.4)
        .fromTo(kept, { yPercent: 105 }, { yPercent: 0, ease: 'power2.out', duration: 0.7 }, 0.75);
    });
  }

  // Hover peek: the case cover follows the pointer, clipped open in the same direction as the strike.
  const box = document.querySelector<HTMLElement>('[data-peek-box]');
  if (!box || isTouch() || prefersReducedMotion()) return;
  const imgs = [...box.querySelectorAll<HTMLImageElement>('[data-peek-img]')];
  const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
  const r = gsap.quickTo(box, 'rotation', { duration: 0.8, ease: 'power3.out' });
  let lastX = 0;
  const move = (e: PointerEvent) => {
    x(e.clientX + 24); y(e.clientY - box.offsetHeight / 2);
    r(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4)); lastX = e.clientX;
  };
  const enterRow = (src: string) => {
    imgs.forEach((i) => i.classList.toggle('is-on', i.dataset.peekImg === src));
    gsap.to(box, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.out, overwrite: 'auto' });
  };
  const leaveList = () => gsap.to(box, { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.5, ease: ease.inOut, overwrite: 'auto', onComplete: () => { gsap.set(box, { clipPath: 'inset(0% 0% 0% 100%)' }); } });
  gsap.set(box, { clipPath: 'inset(0% 0% 0% 100%)' });
  const anchors = [...list.querySelectorAll<HTMLAnchorElement>('[data-peek]')];
  const handlers = anchors.map((a) => { const h = () => enterRow(a.dataset.peek!); a.addEventListener('pointerenter', h); return [a, h] as const; });
  list.addEventListener('pointermove', move as EventListener);
  list.addEventListener('pointerleave', leaveList);
  return () => {
    handlers.forEach(([a, h]) => a.removeEventListener('pointerenter', h));
    list.removeEventListener('pointermove', move as EventListener);
    list.removeEventListener('pointerleave', leaveList);
  };
});

// Career: the row crossing the middle of the screen is set in ink.
onPage(() => {
  const list = document.querySelector('[data-career]');
  if (!list || prefersReducedMotion()) return;
  list.querySelectorAll('li').forEach((li) => {
    ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-on' });
  });
});

// Tokyo clock in the header: real, quiet, keeps the page alive when the pointer rests.
onPage(() => {
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
  const tick = () => { el.textContent = `Tokyo ${fmt.format(new Date())}`; };
  tick();
  const id = setInterval(tick, 15000);
  return () => clearInterval(id);
});

// Copy email, back to top.
onPage(() => {
  const btns = [...document.querySelectorAll<HTMLButtonElement>('[data-copy-btn]')];
  const top = document.querySelector<HTMLAnchorElement>('[data-top]');
  const copy = async (b: HTMLButtonElement) => {
    try {
      await navigator.clipboard.writeText(b.dataset.copyBtn!);
      const t = b.textContent; b.textContent = 'Copied'; b.classList.add('copied');
      setTimeout(() => { b.textContent = t; b.classList.remove('copied'); }, 1600);
    } catch { location.href = `mailto:${b.dataset.copyBtn}`; }
  };
  const hs = btns.map((b) => { const h = () => copy(b); b.addEventListener('click', h); return [b, h] as const; });
  const goTop = (e: Event) => { e.preventDefault(); scrollToTarget(0); (document.getElementById('main') as HTMLElement)?.focus({ preventScroll: true }); };
  top?.addEventListener('click', goTop);
  return () => { hs.forEach(([b, h]) => b.removeEventListener('click', h)); top?.removeEventListener('click', goTop); };
});

// Header: hides while reading down, returns on the way up, inverts over the ink contact sheet.
onPage(() => {
  const hd = document.querySelector<HTMLElement>('.hd');
  const ct = document.getElementById('contact');
  if (!hd) return;
  let last = 0;
  const off = onScroll(({ y }) => {
    hd.classList.toggle('is-solid', y > 40);
    if (!hd.contains(document.activeElement)) hd.classList.toggle('is-hidden', y > last && y > 200);
    last = y;
  });
  if (ct) ScrollTrigger.create({ trigger: ct, start: () => `top ${hd.offsetHeight}px`, end: 'bottom top', toggleClass: { targets: hd, className: 'is-inv' } });
  return () => { off(); };
});
