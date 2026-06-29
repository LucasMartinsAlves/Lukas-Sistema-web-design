export function initAboutExAnimation(gsap) {
  const media = gsap.matchMedia();

  media.add('(min-width: 75rem)', () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-ex',
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      }
    })

    timeline
      .to('.about-ex-proof-column--primary', {
        y: -452,
        ease: 'none',
      }, 0)
      .to('.about-ex-proof-column--secondary', {
        y: -572,
        ease: 'none',
      }, 0);
  });
}