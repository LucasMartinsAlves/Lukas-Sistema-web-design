export function initHeader() {
  const body = document.body;
  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const solutionsDropdown = document.querySelector('.solutions-dropdown');
  const solutionsDropdownToggle = document.querySelector('.solutions-dropdown-toggle');
  const navigationLinks = document.querySelectorAll('#primary-navigation a');

  if (!siteHeader || !menuToggle) {
    return;
  }

  function closeSolutionsDropdown() {
    if (!solutionsDropdown || !solutionsDropdownToggle) {
      return;
    }

    solutionsDropdown.classList.remove('is-open');
    body.classList.remove('is-solutions-dropdown-open');
    solutionsDropdownToggle.setAttribute('aria-expanded', 'false');
  }

  function closeMenu() {
    siteHeader.classList.remove('is-menu-open');
    body.classList.remove('is-scroll-locked');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    closeSolutionsDropdown();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-menu-open');

    body.classList.toggle('is-scroll-locked', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

    if (!isOpen) {
      closeSolutionsDropdown();
    }
  });

  if (solutionsDropdown && solutionsDropdownToggle) {
    solutionsDropdownToggle.addEventListener('click', () => {
      const isOpen = solutionsDropdown.classList.toggle('is-open');

      body.classList.toggle('is-solutions-dropdown-open', isOpen);
      solutionsDropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navigationLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteHeader.classList.contains('is-menu-open')) {
      closeMenu();
    }

    if (event.key === 'Escape') {
      closeSolutionsDropdown();
    }
  });

  document.addEventListener('click', event => {
    if (!solutionsDropdown || !solutionsDropdown.contains(event.target)) {
      closeSolutionsDropdown();
    }
  });
}
