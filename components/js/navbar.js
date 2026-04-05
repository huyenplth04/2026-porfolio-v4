const btn = document.getElementById('logoBtn');
const navPills = document.querySelectorAll('.nav-pill');

btn.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  requestAnimationFrame(updateToggleSlide);
});

navPills.forEach(pill => {
  pill.addEventListener('click', () => {
    navPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

function updateToggleSlide() {
  const btn = document.querySelector('.logo-btn');
  const circle = document.querySelector('.logo-circle');
  if (!btn || !circle) return;
  const trackW = btn.clientWidth - 8;
  const circleW = circle.clientWidth;
  const travel = trackW - circleW;
  if (document.body.classList.contains('nav-open')) {
    circle.style.transform = `translateX(${travel}px)`;
  } else {
    circle.style.transform = 'translateX(0)';
  }
}

document.querySelector('.logo-circle').style.marginLeft = '0';
window.addEventListener('resize', updateToggleSlide);