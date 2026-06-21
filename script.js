// ===== АНИМАЦИЯ ПЛАВНОГО ПЕРЕХОДА МЕЖДУ СТРАНИЦАМИ =====
// Подключается на всех страницах (index.html, project1.html и т.д.),
// чтобы не дублировать один и тот же код в каждом файле.

// ===== ЛАЙТБОКС: УВЕЛИЧЕНИЕ ОТДЕЛЬНЫХ КАРТИНОК ПОВЕРХ СТРАНИЦЫ =====
// Достаточно добавить картинке класс "lightbox-img" — клик по ней
// плавно открывает увеличенную версию поверх страницы с затемнением.
// Закрыть можно крестиком, кликом по фону или клавишей Esc.
function initLightbox() {
  const images = document.querySelectorAll('.lightbox-img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-overlay__close" aria-label="Закрыть">&times;</button>
    <img class="lightbox-overlay__image" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('.lightbox-overlay__image');
  const closeBtn = overlay.querySelector('.lightbox-overlay__close');

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // чтобы страница не скроллилась под лайтбоксом
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Клик по тёмному фону (не по самой картинке) закрывает лайтбокс
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.page-transition-overlay');
  // Сюда попадают и карточки проектов на главной (.project-card),
  // и кнопка "Назад" на странице проекта (.project-nav__back)
  const transitionLinks = document.querySelectorAll('.project-card, .project-nav__back');

  transitionLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // 1. Останавливаем мгновенный переход браузера
      e.preventDefault();
      const targetUrl = this.getAttribute('href');

      // 2. Включаем черную плашку
      if (overlay) {
        overlay.classList.add('active');
      }

      // 3. Ждем, пока плашка потемнеет, и только потом переходим
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });

  initLightbox();
});