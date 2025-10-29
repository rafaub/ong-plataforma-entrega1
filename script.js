// ======================================================
// Vida Solidária — Interatividade e Validação JS
// Entrega 3: JavaScript Avançado
// ======================================================

// Máscaras simples (CPF, telefone, CEP)
function maskCPF(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(v) {
  v = v.replace(/\D/g, '');
  if (v.length > 10) {
    return v.replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  }
  return v.replace(/(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
}

function maskCEP(v) {
  return v.replace(/\D/g, '').replace(/(\d{5})(\d{3}).*/, '$1-$2');
}

// Aplica máscaras dinamicamente
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.mask === 'cpf') el.value = maskCPF(el.value);
  if (el.dataset.mask === 'phone') el.value = maskPhone(el.value);
  if (el.dataset.mask === 'cep') el.value = maskCEP(el.value);
});

// Marcar link ativo da navegação
(function () {
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === 'index.html' && path === '')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// Validação real do formulário
function handleFakeSubmit(ev) {
  ev.preventDefault();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('tel');
  const cep = document.getElementById('cep');
  const feedback = document.getElementById('feedback');

  // Verificação de campos obrigatórios
  if (!nome.value || !email.value || !cpf.value || !tel.value || !cep.value) {
    alert("⚠️ Por favor, preencha todos os campos obrigatórios.");
    feedback.hidden = true;
    return;
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("⚠️ O e-mail informado é inválido.");
    email.focus();
    return;
  }

  // Validação de CPF
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfRegex.test(cpf.value)) {
    alert("⚠️ CPF inválido. Use o formato 000.000.000-00.");
    cpf.focus();
    return;
  }

  // Validação de CEP
  const cepRegex = /^\d{5}-\d{3}$/;
  if (!cepRegex.test(cep.value)) {
    alert("⚠️ CEP inválido. Use o formato 00000-000.");
    cep.focus();
    return;
  }

  // Se tudo estiver correto
  feedback.hidden = false;
  feedback.textContent = "✅ Formulário enviado com sucesso! (simulação)";

  // Armazenar localmente o último envio
  localStorage.setItem("ultimoCadastro", JSON.stringify({
    nome: nome.value,
    email: email.value,
    enviadoEm: new Date().toLocaleString("pt-BR")
  }));

  ev.target.reset();
}

// Simulação simples de SPA (Single Page Application)
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const main = document.querySelector("main");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");
      const res = await fetch(url);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newMain = doc.querySelector("main");
      if (newMain) main.innerHTML = newMain.innerHTML;
      history.pushState(null, "", url);
    });
  });
});

// Efeito visual nos botões
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.97)");
  btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
});

