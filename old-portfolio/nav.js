/* ============================================================
   nav.js — single source of truth for the site navigation
   Injects the nav into <div id="nav-root"> and wires up the
   mobile hamburger menu.
   ============================================================ */
(function () {
  'use strict';

  function currentPage() {
    var path = location.pathname;
    if (path.indexOf('about.html') !== -1)   return 'about';
    if (path.indexOf('writing.html') !== -1) return 'writing';
    return 'home';
  }

  function buildNav() {
    var page = currentPage();
    var onSubpage = page !== 'home';
    var indexPrefix = onSubpage ? 'index.html' : '';
    var ariaAbout   = page === 'about'   ? ' aria-current="page"' : '';
    var ariaWriting = page === 'writing' ? ' aria-current="page"' : '';

    /* Contact link: pages that have their own #contact section use a local
       anchor so the click scrolls within the page. Home uses #contact too
       (it has the section); subpages (about, writing) now also have local
       #contact sections. Only fall back to index.html#contact if a future
       page lacks one. */
    var hasLocalContact = (page === 'about' || page === 'writing' || page === 'home');
    var contactHref = hasLocalContact ? '#contact' : indexPrefix + '#contact';

    return '' +
      '<nav class="nav" role="navigation" aria-label="Main navigation">' +
        '<div class="nav__inner">' +
          '<a href="/" class="nav__logo">Mukul Dharpure</a>' +
          '<ul class="nav__links" id="nav-links">' +
            '<li><a href="' + indexPrefix + '#work">Work</a></li>' +
            '<li><a href="about.html"'   + ariaAbout   + '>About</a></li>' +
            '<li><a href="writing.html"' + ariaWriting + '>Writing</a></li>' +
            '<li><a href="' + contactHref + '">Contact</a></li>' +
            '<li><a href="mukul-dharpure-cv.pdf" class="nav__cv" id="nav-cv-btn" download>CV &#8595;</a></li>' +
          '</ul>' +
          '<button class="nav__hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
        '<div class="nav__mobile" id="nav-mobile" aria-hidden="true">' +
          '<ul>' +
            '<li><a href="' + indexPrefix + '#work">Work</a></li>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="writing.html">Writing</a></li>' +
            '<li><a href="' + contactHref + '">Contact</a></li>' +
            '<li><a href="mukul-dharpure-cv.pdf" download>Download CV &#8595;</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>';
  }

  function attachMobileToggle() {
    var btn    = document.getElementById('nav-hamburger');
    var mobile = document.getElementById('nav-mobile');
    if (!btn || !mobile) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      mobile.setAttribute('aria-hidden', String(open));
      btn.classList.toggle('is-open', !open);
      mobile.classList.toggle('is-open', !open);
    });

    /* Close on any mobile link click */
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
        btn.classList.remove('is-open');
        mobile.classList.remove('is-open');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !mobile.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
        btn.classList.remove('is-open');
        mobile.classList.remove('is-open');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('nav-root');
    if (root) {
      root.outerHTML = buildNav();
    }
    attachMobileToggle();
  });
})();
