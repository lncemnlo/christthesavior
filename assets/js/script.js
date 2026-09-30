const $=s=>document.querySelector(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=$('#nav'),btn=$('#menu');
btn.onclick=()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)};
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
addEventListener('click',e=>{if(!nav.contains(e.target)&&!btn.contains(e.target)){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded',false)});
addEventListener('scroll',()=>$('header').classList.toggle('scrolled',scrollY>10),{passive:true});
$('#yr').textContent=new Date().getFullYear();
$('#years').dataset.to=new Date().getFullYear()-2011;
function count(el){const to=+el.dataset.to;if(reduce){el.textContent=to;return}
 const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);io.unobserve(e.target)}),{threshold:.15});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%6)*70+'ms';io.observe(el)});
