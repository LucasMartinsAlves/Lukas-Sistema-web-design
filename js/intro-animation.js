export function initIntroAnimation(gsap) {
  gsap.to('.hero-title, .hero-content, .hero-scroll', {
    y: '-18vh',
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  gsap.fromTo('.about-content',
    {
      y: '18vh',
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    }
  );

  const media = gsap.matchMedia();

  media.add('(max-width: 74.99rem)', () => {
    gsap.fromTo('.intro-background-image',
      {
        top: '54%',
        width: 'clamp(44rem, 190vw, 56rem)',
        filter: 'blur(0)',
      },
      {
        top: '32%',
        width: 'clamp(38rem, 180vw, 52rem)',
        filter: 'blur(0)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  media.add('(min-width: 75rem)', () => {
    gsap.fromTo('.intro-background-image',
      {
        top: '53%',
        width: 'clamp(90rem, 125vw, 112rem)',
        filter: 'blur(0)',
      },
      {
        top: '50%',
        width: 'clamp(70rem, 85vw, 82rem)',
        filter: 'blur(0.25rem)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}
