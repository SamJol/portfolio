import Lenis from '@studio-freight/lenis'

// Lenis
window.lenis = new Lenis();
function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// Color mode
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.documentElement.classList.add('is-dark-mode');
}
else {
  document.documentElement.classList.add('is-light-mode');
}