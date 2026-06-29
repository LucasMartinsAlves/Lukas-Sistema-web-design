export function initSolutionsAnimation(gsap, ScrollTrigger) {
  const title = document.querySelector('.solutions-intro-title');

  if (!title) {
    return;
  }

  const words = title.textContent.trim().split(/\s+/);

  title.innerHTML = words
    .map(word => `<span class="solutions-intro-title-word">${word}</span>`)
    .join(' ');

  gsap.to('.solutions-intro-title-word', {
    color: 'var(--black-color)',
    stagger: 0.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '.solutions-intro',
      start: 'top 45%',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const sections = gsap.utils.toArray('.solution');
  const navigationItems = gsap.utils.toArray('.solution-navigation-item');

  function setActiveItem(activeIndex) {
    navigationItems.forEach((item, index) => {
      item.classList.toggle('is-active', index === activeIndex);
    });
  }

  gsap.to('.solutions-intro-eyebrow, .solutions-intro-title-word, .solutions-intro-glow', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.solutions-intro',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  const solutionOverlayPairs = [
    ['.solution-management', '.solution-web'],
    ['.solution-web', '.solution-mobile'],
    ['.solution-mobile', '.solution-automation'],
  ];

  solutionOverlayPairs.forEach(([currentSection, nextSection]) => {
    gsap.to(currentSection, {
      '--overlay-opacity': 0.15,
      scrollTrigger: {
        trigger: nextSection,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
  });

  sections.forEach((section, index) => {
    const solutionItems = section.querySelectorAll(
      '.solution-title, .solution-content, .solution-image'
    );

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      onEnter: () => setActiveItem(index),
      onEnterBack: () => setActiveItem(index),
    });

    gsap.to(solutionItems, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top -10%',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}