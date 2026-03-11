const body = document.body;
const dropdown = document.querySelector('[data-dropdown]');
const langBtn = document.querySelector('.lang-pill');
if (dropdown && langBtn) {
  langBtn.addEventListener('click', () => {
    const open = dropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

const burger = document.querySelector('.burger');
const drawer = document.querySelector('.mobile-drawer');
const overlay = document.querySelector('.mobile-overlay');
const closeDrawerBtn = document.querySelector('.drawer-close');
const drawerLinks = drawer ? drawer.querySelectorAll('a,button') : [];
let lastFocus = null;

function trapFocus(e) {
  if (!drawer.classList.contains('open') || e.key !== 'Tab') return;
  const nodes = [...drawer.querySelectorAll('a,button')];
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
  document.removeEventListener('keydown', trapFocus);
  if (lastFocus) lastFocus.focus();
}
function openDrawer() {
  lastFocus = document.activeElement;
  drawer.classList.add('open');
  overlay.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
  document.addEventListener('keydown', trapFocus);
  if (drawerLinks[0]) drawerLinks[0].focus();
}
if (burger && drawer) {
  burger.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
}

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach((el) => el.setAttribute('aria-expanded', 'false'));
    item.setAttribute('aria-expanded', 'true');
  });
});

const modal = document.getElementById('privacy-modal');
const openModal = document.querySelector('[data-open-modal]');
const closeModal = document.querySelector('[data-close-modal]');
const closeX = document.querySelector('.modal-x');
function hideModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
}
function showModal(e) {
  e.preventDefault();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
}
if (modal) {
  openModal.addEventListener('click', showModal);
  closeModal.addEventListener('click', hideModal);
  closeX.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });
}

document.querySelectorAll('section').forEach((s) => s.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.createElement('p');
    msg.textContent = 'Thank you. After you sign up, you get instant access to the next steps.';
    msg.className = 'meaning';
    form.appendChild(msg);
  }, { once: true });
});
