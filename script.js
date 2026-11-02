/* ========== SCROLL REVEAL ========== */
var revealEls = document.querySelectorAll('.reveal');
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
} else {
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
}

/* ========== PAGE TRANSITION ========== */
(function () {
    var overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.insertBefore(overlay, document.body.firstChild);
    }

    var duration = 450;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    requestAnimationFrame(function () {
        overlay.classList.remove('is-active');
    });

    function isInternalPage(href) {
        if (!href) return false;
        var path = href.split('#')[0];
        return /^project\d+\.html$/.test(path) || path === 'index.html';
    }

    document.querySelectorAll('a[href]').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!isInternalPage(href)) return;

        link.setAttribute('target', '_self');

        link.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();

            if (prefersReduced) {
                window.location.href = href;
                return;
            }

            overlay.classList.add('is-active');
            setTimeout(function () {
                window.location.href = href;
            }, duration);
        });
    });
})();

/* ========== PROJECT NAV ON SCROLL ========== */
(function () {
    var nav = document.querySelector('.project-nav');
    if (!nav) return;

    var onScroll = function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 36);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ========== LIGHTBOX ========== */
(function() {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox__close">&times;</button><img src="" alt="">';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('img');
    var lbClose = lightbox.querySelector('.lightbox__close');

    function openLightbox(src) {
        lbImg.src = src;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(function() { lbImg.src = ''; }, 400);
    }

    document.querySelectorAll('.lightbox-img, .gallery-quad__item img, .gallery-side-media img').forEach(function(img) {
        img.parentElement.style.cursor = 'zoom-in';
        img.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(img.src);
        });
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();
