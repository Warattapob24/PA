'use strict';
const modal = document.getElementById('detailModal');
const main = document.querySelector('main');
const header = document.querySelector('.site-header');
const closeButton = modal.querySelector('button');
let returnFocus = null;
// Display the source report's short math expressions without requiring a math CDN.
function readableNotation(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    node.textContent = node.textContent
      .replace(/\\\((.*?)\\\)/g, (_, value) => value)
      .replace(/(?:\\bar|\u0008ar)\{X\}/g, 'X̄')
      .replace(/E_1/g, 'E₁').replace(/E_2/g, 'E₂')
      .replace(/\\%/g, '%');
  }
}
readableNotation(main);
function openDetailModal(id) {
  const data = detailsData[id];
  if (!data) return;
  returnFocus = document.activeElement;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBody').innerHTML = data.content;
  readableNotation(document.getElementById('modalBody'));
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  main.inert = true;
  header.inert = true;
  document.body.style.overflow = 'hidden';
  document.getElementById('modalBody').scrollTop = 0;
  requestAnimationFrame(() => { if (modal.classList.contains('active')) closeButton.focus(); });
}
function closeModal() {
  if (!modal.classList.contains('active')) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  main.inert = false;
  header.inert = false;
  document.body.style.overflow = '';
  returnFocus?.focus();
}
function scrollToSection(index) {
  const section = document.getElementById('section-' + index);
  if (section) { location.hash = section.id; }
}
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
modal.addEventListener('transitionend', event => {
  if (event.target === modal && modal.classList.contains('active') && !modal.contains(document.activeElement)) closeButton.focus();
});
document.addEventListener('keydown', event => {
  if (modal.classList.contains('active')) {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
      const items = [...modal.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
});
document.querySelectorAll('[role="button"][onclick]').forEach(card => {
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
  });
});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
function closeMenu() { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); }
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded',String(opened));
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
header.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach(link => {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('.section-screen').forEach(section => observer.observe(section));
