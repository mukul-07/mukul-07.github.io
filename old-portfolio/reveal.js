/* ============================================================
   reveal.js — scroll-triggered entrance animations
   ------------------------------------------------------------
   Watches every [data-reveal] element (and every direct child
   of [data-reveal-stagger]) and adds .is-revealed when they
   enter the viewport. The CSS in index.css handles the visual
   transition; this file only deals with timing.

   Pair with the inline <html>.classList.add('js-ready') script
   in <head> so the hidden state only applies when JS is ready.
   ============================================================ */
(function () {
  'use strict';

  /* Stagger delay between siblings inside a [data-reveal-stagger] group. */
  var STEP_MS = 90;

  /* Honour the user's OS-level motion preference. */
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    /* Apply staggered transition-delay to children of stagger groups. */
    var groups = document.querySelectorAll('[data-reveal-stagger]');
    for (var g = 0; g < groups.length; g++) {
      var children = groups[g].children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.transitionDelay = (i * STEP_MS) + 'ms';
      }
    }

    /* Collect every reveal target (single + stagger children). */
    var targets = document.querySelectorAll(
      '[data-reveal], [data-reveal-stagger] > *'
    );

    /* If reduced motion is preferred OR IntersectionObserver isn't
       available, just reveal everything immediately. */
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      for (var k = 0; k < targets.length; k++) {
        targets[k].classList.add('is-revealed');
      }
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        var entry = entries[e];
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    for (var t = 0; t < targets.length; t++) {
      io.observe(targets[t]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================================
   Count-up animation for .impact-stat__number elements.
   Each number animates from 0 to its target value when the
   impact strip enters the viewport. The seven stats stagger
   90ms apart, matching the reveal-stagger cadence above.
   Honours prefers-reduced-motion (no-ops if user prefers it).
   ============================================================ */
(function () {
  'use strict';

  var DURATION = 1400;  /* ms — total per-number count animation */
  var STAGGER  = 90;    /* ms — delay between sibling stats      */

  /* Bail completely if the user prefers reduced motion — leave
     the original numbers in place, no animation, no text reset. */
  if (window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (!('IntersectionObserver' in window)) {
    return;
  }

  /* Pull a number out of strings like "35+", "10+", "5+", "2", "10"
     so we can animate the digits and reattach the suffix at the end. */
  function parseTarget(text) {
    var m = text.trim().match(/^(\d+)(.*)$/);
    if (!m) return null;
    return { target: parseInt(m[1], 10), suffix: m[2] || '' };
  }

  function animateCount(el, parsed) {
    var startTime = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / DURATION, 1);
      /* ease-out cubic — fast start, gentle landing on the target */
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(parsed.target * eased);
      el.textContent = current + parsed.suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var nums = document.querySelectorAll('.impact-stat__number');
    if (!nums.length) return;

    /* Parse + reset to 0 immediately so we never see a flash of the
       final number before the count animation starts. The .impact-stat
       parent is opacity:0 (data-reveal-stagger) until reveal.js fires,
       so the user doesn't actually see the "0" state until the strip
       is in view. */
    var entries = [];
    for (var i = 0; i < nums.length; i++) {
      var el = nums[i];
      var parsed = parseTarget(el.textContent);
      if (!parsed) continue;
      el.textContent = '0' + parsed.suffix;
      entries.push({ el: el, parsed: parsed });
    }

    var io = new IntersectionObserver(function (events) {
      events.forEach(function (ev) {
        if (!ev.isIntersecting) return;
        var idx = -1;
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].el === ev.target) { idx = i; break; }
        }
        if (idx === -1) return;
        var parsed = entries[idx].parsed;
        setTimeout(function () {
          animateCount(ev.target, parsed);
        }, idx * STAGGER);
        io.unobserve(ev.target);
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -60px 0px'
    });

    entries.forEach(function (e) { io.observe(e.el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
