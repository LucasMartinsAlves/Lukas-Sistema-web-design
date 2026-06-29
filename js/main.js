import { initHeader } from './header.js';
import { initHeroVideo } from './hero-video.js';
import { initIntroAnimation } from './intro-animation.js';
import { initAboutAnimation } from './about-animation.js';
import { initAboutExAnimation } from './about-ex-animation.js';
import { initSolutionsAnimation } from './solutions-animation.js';
import { initSolutionsSymbolAnimation } from './solutions-symbol-animation.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

initHeader();
initHeroVideo(prefersReducedMotion);

if (!prefersReducedMotion && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  initIntroAnimation(gsap);
  initAboutAnimation(gsap);
  initAboutExAnimation(gsap);
  initSolutionsAnimation(gsap, ScrollTrigger);
  initSolutionsSymbolAnimation(gsap, ScrollTrigger);

  function refreshScrollTriggers() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    });
  }

  window.addEventListener('load', refreshScrollTriggers);
  window.addEventListener('pageshow', refreshScrollTriggers);
}
