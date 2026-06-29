export function initHeader() {
  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigationLinks = document.querySelectorAll('#primary-navigation a');

  if (!siteHeader || !menuToggle) {
    return;
  }

  function closeMenu() {
    siteHeader.classList.remove('is-menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-menu-open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navigationLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteHeader.classList.contains('is-menu-open')) {
      closeMenu();
    }
  });
}
