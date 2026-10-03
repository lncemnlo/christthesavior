const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=$('#nav'),btn=$('#menu'),shut=()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded',false)};
btn.onclick=()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)};
$$('#nav a').forEach(a=>a.onclick=shut);
addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
addEventListener('click',e=>{if(!nav.contains(e.target)&&!btn.contains(e.target))shut()});
addEventListener('scroll',()=>$('header').classList.toggle('scrolled',scrollY>10),{passive:true});
const yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();
const ys=$('#years');if(ys)ys.dataset.to=new Date().getFullYear()-2011;
function count(el){const to=+el.dataset.to;if(reduce){el.textContent=to;return}
 const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);io.unobserve(e.target)}),{threshold:.1});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%6)*70+'ms';io.observe(el)});
const q=$('#q'),sp=$('#sp');
if(q){const docs=[...$$('.doc')],run=()=>{const t=q.value.trim().toLowerCase(),s=sp.value;let n=0;
 docs.forEach(d=>{const ok=d.dataset.n.includes(t)&&(!s||d.dataset.s===s);d.hidden=!ok;if(ok)n++});$('#none').hidden=n>0};
 q.oninput=run;sp.onchange=run}
