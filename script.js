// Máscaras simples (CPF, telefone, CEP)
function maskCPF(v){return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')}
function maskPhone(v){v=v.replace(/\D/g,'');if(v.length>10){return v.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3')}return v.replace(/(\d{2})(\d{4})(\d{4}).*/,'($1) $2-$3')}
function maskCEP(v){return v.replace(/\D/g,'').replace(/(\d{5})(\d{3}).*/,'$1-$2')}

document.addEventListener('input', e=>{
  const el=e.target;
  if(el.dataset.mask==='cpf') el.value=maskCPF(el.value);
  if(el.dataset.mask==='phone') el.value=maskPhone(el.value);
  if(el.dataset.mask==='cep') el.value=maskCEP(el.value);
});

// Marcar link ativo da navegação
(function(){
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path || (href==='index.html' && path==='')){
      a.setAttribute('aria-current','page');
    }
  });
})();

// Simular envio do formulário
function handleFakeSubmit(ev){
  ev.preventDefault();
  const box=document.getElementById('feedback');
  if(box){
    box.hidden=false;
    box.scrollIntoView({behavior:'smooth',block:'center'});
  }
}
