/* =============================================
   PORTFÓLIO KAWAII — script.js
   JavaScript puro, sem frameworks
============================================= */

/* ------------------------------------------------
   1. HEADER: sombra ao scroll + link ativo
------------------------------------------------ */
var header   = document.getElementById('header');
var navLinks = document.querySelectorAll('.nav-link');
var sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Marca link ativo pela seção visível
var sectionObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      var id = entry.target.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(function(s) { sectionObs.observe(s); });


/* ------------------------------------------------
   2. MENU MOBILE (hamburger)
------------------------------------------------ */
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  var open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

// Fecha ao clicar em link mobile
document.querySelectorAll('.mobile-link').forEach(function(l) {
  l.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


/* ------------------------------------------------
   3. EFEITO DE DIGITAÇÃO (typewriter)
------------------------------------------------ */
var phrases = [
  'Desenvolvedora Back-End 🌷',
];
var typingEl   = document.getElementById('typingText');
var phraseIdx  = 0;
var charIdx    = 0;
var deleting   = false;

function typeWriter() {
  var current = phrases[phraseIdx];

  if (!deleting) {
    typingEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      setTimeout(function() { deleting = true; typeWriter(); }, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 50 : 85);
}
setTimeout(typeWriter, 600);


/* ------------------------------------------------
   4. SCROLL REVEAL com IntersectionObserver
------------------------------------------------ */
var revealEls = document.querySelectorAll(
  '.about-grid, .formation-card, .proj-card, .tl-item, ' +
  '.info-card, .hobby, .section-header, .contact-info, ' +
  '.form-wrapper, .blob, .lang-item, .course-item'
);

revealEls.forEach(function(el) { el.classList.add('reveal'); });

var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(function(el) { revealObs.observe(el); });


/* ------------------------------------------------
   5. BARRAS DE PROGRESSO (idiomas)
   Animadas ao entrar na viewport
------------------------------------------------ */
var progFills = document.querySelectorAll('.prog-fill');

var progObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var w = entry.target.getAttribute('data-w');
      entry.target.style.width = w + '%';
      progObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progFills.forEach(function(bar) { progObs.observe(bar); });


/* ------------------------------------------------
   6. FILTROS DO PORTFÓLIO
   Exibe/oculta cards com classe .hidden
------------------------------------------------ */
var filterBtns = document.querySelectorAll('.filter');
var projCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var cat = btn.getAttribute('data-filter');

    projCards.forEach(function(card) {
      if (cat === 'all' || card.getAttribute('data-category') === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ------------------------------------------------
   7. VALIDAÇÃO E ENVIO DO FORMULÁRIO
   - Valida campos obrigatórios
   - Valida formato do e-mail (regex)
   - Simula envio com loading
   - Exibe modal de sucesso
   - Limpa campos após envio
------------------------------------------------ */
var form       = document.getElementById('contactForm');
var submitBtn  = document.getElementById('submitBtn');
var fNome      = document.getElementById('nome');
var fEmail     = document.getElementById('email');
var fMsg       = document.getElementById('mensagem');
var gNome      = document.getElementById('groupNome');
var gEmail     = document.getElementById('groupEmail');
var gMsg       = document.getElementById('groupMensagem');
var eNome      = document.getElementById('erroNome');
var eEmail     = document.getElementById('erroEmail');
var eMsg       = document.getElementById('erroMensagem');
var modal      = document.getElementById('successModal');
var closeBtn   = document.getElementById('closeModal');

// Regex de validação de e-mail
function emailValido(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function setErro(grp, el, txt) {
  grp.classList.add('error');
  el.textContent = txt;
}
function clearErro(grp, el) {
  grp.classList.remove('error');
  el.textContent = '';
}

function validar() {
  var ok = true;

  if (!fNome.value.trim()) {
    setErro(gNome, eNome, 'Por favor, insira seu nome. 🌸');
    ok = false;
  } else { clearErro(gNome, eNome); }

  if (!fEmail.value.trim()) {
    setErro(gEmail, eEmail, 'Por favor, insira seu e-mail. ✉');
    ok = false;
  } else if (!emailValido(fEmail.value)) {
    setErro(gEmail, eEmail, 'E-mail inválido. Use: usuario@dominio.com');
    ok = false;
  } else { clearErro(gEmail, eEmail); }

  if (!fMsg.value.trim()) {
    setErro(gMsg, eMsg, 'Por favor, escreva uma mensagem. 💌');
    ok = false;
  } else if (fMsg.value.trim().length < 10) {
    setErro(gMsg, eMsg, 'A mensagem deve ter pelo menos 10 caracteres.');
    ok = false;
  } else { clearErro(gMsg, eMsg); }

  return ok;
}

// Validação em tempo real ao sair do campo
fNome.addEventListener('blur', function() {
  if (fNome.value.trim()) clearErro(gNome, eNome);
});
fEmail.addEventListener('blur', function() {
  if (fEmail.value.trim() && emailValido(fEmail.value)) clearErro(gEmail, eEmail);
});
fMsg.addEventListener('blur', function() {
  if (fMsg.value.trim().length >= 10) clearErro(gMsg, eMsg);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (!validar()) {
    var primeiro = form.querySelector('.error .form-input');
    if (primeiro) primeiro.focus();
    return;
  }

  // Simular loading
  var btnText = submitBtn.querySelector('.btn-text');
  var btnLoad = submitBtn.querySelector('.btn-loading');
  submitBtn.disabled     = true;
  btnText.style.display  = 'none';
  btnLoad.style.display  = 'inline';

  setTimeout(function() {
    // Limpar campos
    fNome.value = '';
    fEmail.value = '';
    fMsg.value = '';
    clearErro(gNome, eNome);
    clearErro(gEmail, eEmail);
    clearErro(gMsg, eMsg);

    // Restaurar botão
    submitBtn.disabled    = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';

    // Mostrar modal
    modal.style.display = 'flex';
  }, 1500);
});

// Fechar modal
closeBtn.addEventListener('click', function() { modal.style.display = 'none'; });
modal.addEventListener('click', function(e) {
  if (e.target === modal) modal.style.display = 'none';
});


/* ------------------------------------------------
   8. NAVEGAÇÃO SUAVE POR ÂNCORAS
   Compensa a altura do header fixo
------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var id = link.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var offset = header.offsetHeight + 24;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});
