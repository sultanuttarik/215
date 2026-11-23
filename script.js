(() => {
  const $ = (selector) => document.querySelector(selector);
  const config = window.LETTER_CONFIG || {};
  const body = $('#letterBody');
  const shell = $('#letterShell');
  const openButton = $('#openLetter');
  const skipButton = $('#skipTyping');
  const replayButton = $('#replayTyping');
  const status = $('#typingStatus');
  const progress = $('#readingProgress');
  let typingTimer = null;
  let isTyping = false;
  let fullText = '';

  $('#letterTitle').innerHTML = (config.title || 'A few things<br><em>I wanted you to know.</em>')
    .split('\n').map((line, i) => i === 1 ? `<em>${escapeHTML(line)}</em>` : escapeHTML(line)).join('<br>');
  $('#letterDate').textContent = config.date || '';
  $('#letterDate').hidden = !config.date;
  $('#signature').textContent = config.signature || 'Someone who cares.';
  $('.letter-signoff p').textContent = config.signoff || 'With sincerity,';
  $('#year').textContent = new Date().getFullYear();

  const paragraphs = Array.isArray(config.paragraphs) ? config.paragraphs : [];
  fullText = paragraphs.join('\n\n');

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function renderComplete() {
    clearTimeout(typingTimer);
    isTyping = false;
    body.replaceChildren();
    paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      body.appendChild(p);
    });
    status.textContent = 'YOU HAVE REACHED THE END';
    shell.classList.add('finished');
  }

  function startTyping() {
    clearTimeout(typingTimer);
    body.replaceChildren();
    shell.classList.add('is-open');
    shell.classList.remove('finished');
    isTyping = true;
    status.textContent = 'WORDS ARE FINDING THEIR WAY';
    let paragraphIndex = 0;
    let charIndex = 0;
    let current = null;
    const speed = Math.max(8, Number(config.typingSpeed) || 23);

    function tick() {
      if (paragraphIndex >= paragraphs.length) {
        isTyping = false;
        status.textContent = 'YOU HAVE REACHED THE END';
        shell.classList.add('finished');
        return;
      }
      if (!current) {
        current = document.createElement('p');
        body.appendChild(current);
        charIndex = 0;
      }
      const paragraph = paragraphs[paragraphIndex];
      current.textContent = paragraph.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= paragraph.length) {
        paragraphIndex++;
        current = null;
        typingTimer = setTimeout(tick, speed * 8);
      } else {
        typingTimer = setTimeout(tick, speed);
      }
    }
    tick();
  }

  openButton.addEventListener('click', () => {
    $('#letter').scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(startTyping, 450);
  });
  skipButton.addEventListener('click', renderComplete);
  replayButton.addEventListener('click', () => {
    $('#letter').scrollIntoView({ behavior: 'smooth', block: 'start' });
    startTyping();
  });
  $('#backToTop').addEventListener('click', () => $('#top').scrollIntoView({ behavior: 'smooth' }));
  $('#copyLetter').addEventListener('click', async () => {
    const text = [config.title || '', ...paragraphs, config.signoff || '', config.signature || ''].join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      $('#copyStatus').textContent = 'THE LETTER HAS BEEN COPIED';
    } catch {
      $('#copyStatus').textContent = 'COPYING IS UNAVAILABLE IN THIS BROWSER';
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const starField = $('.stars');
  for (let i = 0; i < 55; i++) {
    const star = document.createElement('i');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 7}s`;
    star.style.opacity = `${0.12 + Math.random() * 0.5}`;
    starField.appendChild(star);
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
