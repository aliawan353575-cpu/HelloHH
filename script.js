/* ==========================================================
   >>> PASTE YOUR GOOGLE FORM URL BELOW (between the quotes) <<<
   Keep the quotes. Example: googleFormUrl: "https://forms.gle/xxxxxxxx"

   Suggested Google Form fields:
   - Full name
   - Business name
   - Business email
   - Current website URL (optional)
   - Country and service area
   - Type of project (new website or redesign)
   - Services offered
   - Preferred package or approximate budget
   - Project requirements and additional details

   Google Form setup: forms.google.com > create form > add fields above >
   Responses tab (turn on "Accepting responses") > "Link to Sheets" (optional)
   > Send > Link icon > copy the URL > paste it below.
   ========================================================== */
const SITE_CONFIG = {
  googleFormUrl: "PASTE_YOUR_GOOGLE_FORM_URL_HERE"
};

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var btn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Close" : "Menu";
  }
  btn.addEventListener("click", function () {
    setMenu(btn.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      btn.focus();
    }
  });

  // Quote buttons
  var url = SITE_CONFIG.googleFormUrl;
  var configured = /^https:\/\//i.test(url);
  var notice = document.getElementById("quote-notice");
  var close = document.getElementById("notice-close");

  document.querySelectorAll(".js-quote").forEach(function (link) {
    if (configured) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", link.textContent.trim() + " (opens in a new tab)");
    } else {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        notice.hidden = false;
        document.getElementById("contact").scrollIntoView();
        notice.setAttribute("tabindex", "-1");
        notice.focus();
      });
    }
  });

  close.addEventListener("click", function () {
    notice.hidden = true;
  });

  // FAQ: keep one answer open at a time
  var faqs = document.querySelectorAll(".faq details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // Close mobile menu if the window grows to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 980) setMenu(false);
  });

  // Subtle reveal on scroll (skipped for reduced motion; content stays visible without JS)
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !still) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".card, .steps li, .flow li").forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
