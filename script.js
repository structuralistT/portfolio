// ===== АНИМАЦИЯ ПЛАВНОГО ПЕРЕХОДА МЕЖДУ СТРАНИЦАМИ =====
// Подключается на всех страницах (index.html, project1.html и т.д.),
// чтобы не дублировать один и тот же код в каждом файле.

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
});
