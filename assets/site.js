'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
for (const year of document.querySelectorAll('[data-year]')) year.textContent = new Date().getFullYear();
const updatesForm = document.getElementById('updates-form');
updatesForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!updatesForm.reportValidity()) return;
  const values = new FormData(updatesForm);
  const name = String(values.get('firstName') || '').trim();
  const email = String(values.get('email') || '').trim();
  const body = `Please send me PinWin Golf news and release updates.\n\nFirst name: ${name}\nEmail: ${email}\n\nI consent to receive these updates and understand I can ask to stop receiving them at any time.`;
  const href = `mailto:hello@pinwingolf.com?subject=${encodeURIComponent('PinWin Golf news and release updates')}&body=${encodeURIComponent(body)}`;
  const fallback = document.getElementById('email-fallback');
  fallback.href = href;
  fallback.hidden = false;
  document.getElementById('signup-status').textContent = 'Send the prepared message in your email app to submit your request. If your email app did not open, use the link below or email hello@pinwingolf.com directly. Your request has not been submitted by this page.';
  window.location.href = href;
});
