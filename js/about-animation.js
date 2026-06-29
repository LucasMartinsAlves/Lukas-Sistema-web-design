export function initAboutAnimation(gsap) {
  const aboutTitle = document.querySelector('.about-title');

  if (!aboutTitle) {
    return;
  }

  const words = aboutTitle.textContent.trim().split(/\s+/);

  aboutTitle.innerHTML = words
    .map(word => `<span class="about-title-word">${word}</span>`)
    .join(' ');

  gsap.to('.about-title-word', {
    color: 'var(--black-color)',
    stagger: 0.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      end: 'top top',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}
