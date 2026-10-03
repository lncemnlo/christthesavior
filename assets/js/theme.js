(function () {
  var d = document;
  var $ = function (s) { return d.querySelector(s); };
  var $$ = function (s) { return [].slice.call(d.querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  var btn = $('#menu'), nav = $('#nav');
  function shut() { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o);
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
    d.addEventListener('click', function (e) { if (!nav.contains(e.target) && !btn.contains(e.target)) shut(); });
  }

  var slides = $$('.slide'), dots = $$('.dot'), cur = 0, timer;
  function go(k) {
    cur = (k + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('on', i === cur); });
    dots.forEach(function (s, i) { s.classList.toggle('on', i === cur); });
  }
  function play() { if (!reduce && slides.length > 1) { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6000); } }
  if (slides.length > 1) {
    var p = $('.prev'), n = $('.next'), hero = $('.hero');
    if (p) p.addEventListener('click', function () { go(cur - 1); play(); });
    if (n) n.addEventListener('click', function () { go(cur + 1); play(); });
    dots.forEach(function (x, i) { x.addEventListener('click', function () { go(i); play(); }); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', play);
    play();
  }

  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 5) * 70 + 'ms'; io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }
})();
