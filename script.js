document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const openInvitation = document.getElementById('open-invitation');
  const audioFrame = document.getElementById('audio-frame');
  const musicControl = document.getElementById('music-control');
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  const rsvpButton = document.getElementById('rsvp-btn');
  const form = document.getElementById('rsvp-form');
  const cancelButton = document.getElementById('cancel-btn');
  const success = document.getElementById('form-success');
  const targetDate = new Date('2026-10-08T18:00:00+05:30').getTime();

  // const nasheedUrl = 'https://www.youtube-nocookie.com/embed/ivrumxRUz_Y?autoplay=1&controls=0&rel=0&loop=1&playlist=ivrumxRUz_Y&enablejsapi=1';
  // let musicPlaying = false;

  // const sendMusicCommand = (command) => {
  //   audioFrame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
  // };

  // openInvitation.addEventListener('click', () => {
  //   audioFrame.src = nasheedUrl;
  //   musicPlaying = true;
  //   loader.classList.add('is-hidden');
  //   musicControl.hidden = false;
  //   musicLabel.textContent = 'Nasheed playing';
  //   musicToggle.setAttribute('aria-label', 'Pause wedding nasheed');
  // });

  // musicToggle.addEventListener('click', () => {
  //   musicPlaying = !musicPlaying;
  //   sendMusicCommand(musicPlaying ? 'playVideo' : 'pauseVideo');
  //   musicLabel.textContent = musicPlaying ? 'Nasheed playing' : 'Nasheed paused';
  //   musicToggle.setAttribute('aria-label', musicPlaying ? 'Pause wedding nasheed' : 'Play wedding nasheed');
  // });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const updateCountdown = () => {
    const distance = targetDate - Date.now();
    const safeDistance = Math.max(distance, 0);
    const values = {
      days: Math.floor(safeDistance / 86400000),
      hours: Math.floor((safeDistance / 3600000) % 24),
      minutes: Math.floor((safeDistance / 60000) % 60),
      seconds: Math.floor((safeDistance / 1000) % 60)
    };
    Object.entries(values).forEach(([key, value]) => {
      const node = document.getElementById(key);
      if (node) node.textContent = String(value).padStart(2, '0');
    });
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const openForm = () => {
    form.hidden = false;
    rsvpButton.hidden = true;
    success.hidden = true;
    form.querySelector('input').focus();
  };
  const closeForm = () => {
    form.hidden = true;
    rsvpButton.hidden = false;
  };

  rsvpButton.addEventListener('click', openForm);
  cancelButton.addEventListener('click', closeForm);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) return;
    form.hidden = true;
    rsvpButton.hidden = true;
    success.hidden = false;
    success.querySelector('span').textContent = name;
    form.reset();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
