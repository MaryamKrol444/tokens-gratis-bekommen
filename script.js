(() => {
  'use strict';

  const config = window.TOKEN_SITE_CONFIG || {};

  // Enhance outbound links from one editable configuration file; internal anchors remain the no-JS fallback.
  document.querySelectorAll('[data-offer]').forEach((link) => {
    const destination = config.offers && config.offers[link.dataset.offer];
    if (!destination) return;

    try {
      const url = new URL(destination);
      if (url.protocol !== 'https:') return;
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'sponsored nofollow noopener noreferrer';
    } catch (_error) {
      // Keep the working in-page fallback if a configured URL is malformed.
    }
  });

  if (config.officialUrl) {
    document.querySelectorAll('[data-official-link]').forEach((link) => {
      try {
        const url = new URL(config.officialUrl);
        if (url.protocol === 'https:') link.href = url.href;
      } catch (_error) {
        // The valid fallback URL stays in the HTML.
      }
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const primaryNavigation = document.querySelector('#primary-navigation');

  const setNavigationOpen = (isOpen) => {
    if (!navToggle || !primaryNavigation) return;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    primaryNavigation.dataset.open = String(isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  if (navToggle && primaryNavigation) {
    navToggle.addEventListener('click', () => {
      setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    primaryNavigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavigationOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavigationOpen(false);
        navToggle.focus();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 761px)');
    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) setNavigationOpen(false);
    });
  }

  const stickyBar = document.querySelector('#sticky-cta');
  const stickyClose = document.querySelector('#sticky-close');
  const stickyStorageKey = 'tokenKompassOfferBarClosed';

  if (stickyBar && stickyClose) {
    try {
      if (window.sessionStorage.getItem(stickyStorageKey) === 'true') {
        stickyBar.hidden = true;
        document.body.classList.add('sticky-dismissed');
      }
    } catch (_error) {
      // The close button still works for this page view if storage is unavailable.
    }

    stickyClose.addEventListener('click', () => {
      stickyBar.hidden = true;
      document.body.classList.add('sticky-dismissed');
      try {
        window.sessionStorage.setItem(stickyStorageKey, 'true');
      } catch (_error) {
        // Dismissal remains active until the page is reloaded.
      }
    });
  }

  const calculator = document.querySelector('#price-calculator');
  const calculatorResult = document.querySelector('#calculator-result');

  if (calculator && calculatorResult) {
    calculator.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(calculator);
      const total = Number(formData.get('total'));
      const tokens = Number(formData.get('tokens'));

      if (!Number.isFinite(total) || !Number.isFinite(tokens) || total <= 0 || tokens <= 0) {
        calculatorResult.textContent = 'Bitte gib einen Betrag größer als 0 und eine Tokenzahl größer als 0 ein.';
        calculatorResult.hidden = false;
        return;
      }

      const perToken = total / tokens;
      const oneHundred = perToken * 100;
      const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
      calculatorResult.textContent = `Rechnerischer Stückpreis: ${currency.format(perToken)} pro Token. 100 Tokens entsprächen nach deinen Eingaben ${currency.format(oneHundred)}. Das ist nur eine Rechenhilfe, kein offizieller Kurs.`;
      calculatorResult.hidden = false;
    });
  }
})();
