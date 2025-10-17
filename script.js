// Variables globales
let currentDay = 1;
let logosVisible = true;

// DOM Elements
const dayButtons = document.querySelectorAll('.day-btn');
const dayContents = document.querySelectorAll('.day-content');
const toggleLogosBtn = document.getElementById('toggleLogos');
const dualLogos = document.getElementById('dualLogos');
const statItems = document.querySelectorAll('.stat-item');
const interestToggles = document.querySelectorAll('.interest-toggle');

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

// Función de inicialización
function initializeApp() {
  setupDayNavigation();
  setupLogoToggle();
  setupTooltips();
  setupInterestSections();
  setupSmoothScrolling();
  setupResponsiveFeatures();
  console.log('✅ Aplicación Marketing Digital 2.0 inicializada correctamente');
}

// Navegación entre días
function setupDayNavigation() {
  dayButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const day = parseInt(this.dataset.day);
      switchToDay(day);
    });
  });
}

function switchToDay(day) {
  currentDay = day;
  dayButtons.forEach((btn) => {
    btn.classList.remove('active');
    if (parseInt(btn.dataset.day) === day) {
      btn.classList.add('active');
    }
  });
  dayContents.forEach((content) => {
    content.classList.remove('active');
    if (content.id === `day-${day}`) {
      content.classList.add('active');
    }
  });
  document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  trackEvent('Navigation', 'Day Switch', `Day ${day}`);
}

// Toggle de logos
function setupLogoToggle() {
  if (!toggleLogosBtn || !dualLogos) return;
  toggleLogosBtn.addEventListener('click', function () {
    logosVisible = !logosVisible;
    if (logosVisible) {
      dualLogos.classList.remove('hidden');
      this.title = 'Ocultar logos';
    } else {
      dualLogos.classList.add('hidden');
      this.title = 'Mostrar logos';
    }
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
    trackEvent('UI', 'Logo Toggle', logosVisible ? 'Show' : 'Hide');
  });
}

// Sistema de tooltips para estadísticas
function setupTooltips() {
  statItems.forEach((item) => {
    const tooltip = createTooltip(item.dataset.tooltip);
    item.addEventListener('mouseenter', function (e) {
      document.body.appendChild(tooltip);
      positionTooltip(tooltip, e);
      setTimeout(() => tooltip.classList.add('show'), 50);
    });
    item.addEventListener('mouseleave', function () {
      tooltip.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(tooltip)) {
          document.body.removeChild(tooltip);
        }
      }, 300);
    });
    item.addEventListener('mousemove', function (e) {
      if (document.body.contains(tooltip)) {
        positionTooltip(tooltip, e);
      }
    });
  });
}

function createTooltip(text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  return tooltip;
}

function positionTooltip(tooltip, event) {
  const x = event.pageX + 10;
  const y = event.pageY - 40;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

// Secciones de datos de interés expandibles
function setupInterestSections() {
  interestToggles.forEach((toggle) => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector('i');
    toggle.addEventListener('click', function () {
      const isActive = content.classList.contains('active');
      if (isActive) {
        content.classList.remove('active');
        if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
        content.classList.add('active');
        if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
      trackEvent('UI', 'Interest Toggle', isActive ? 'Collapse' : 'Expand');
    });
  });
}

// Smooth scrolling helpers
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Features responsivas simuladas
function setupResponsiveFeatures() {
  const mq = window.matchMedia('(max-width: 768px)');
  const apply = () => {
    document.body.dataset.mobile = mq.matches ? 'true' : 'false';
  };
  mq.addEventListener('change', apply);
  apply();
}

// Simulación de tracking
function trackEvent(category, action, label) {
  console.log(`[Track] ${category} | ${action} | ${label}`);
}
