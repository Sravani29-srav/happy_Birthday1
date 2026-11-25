const IMG={"b": ["assets/balloon-1.png", "assets/balloon-2.png", "assets/balloon-3.png", "assets/balloon-4.png", "assets/balloon-5.png", "assets/balloon-6.png", "assets/balloon-7.png", "assets/balloon-7.png"], "off": "assets/light-off.png", "bc": ["assets/light-on-1.png", "assets/light-on-2.png", "assets/light-on-3.png", "assets/light-on-4.png", "assets/light-on-5.png", "assets/light-on-6.png"], "ban": "assets/banner.png"};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('.nm').forEach(e=>e.textContent=NAME);$('#banner').src=IMG.ban;$$('[data-b]').forEach(e=>e.src=IMG.b[e.dataset.b]);
const COL=['#ffd400','#ff3b30','#2f7bff','#37e05a','#ff5cc8','#ff9a1f'];
$('#lights').innerHTML=Array.from({length:9},()=>`<img src="${IMG.off}" alt="">`).join('');
const au=$('#au'),rnd=(a,b)=>a+Math.random()*(b-a),sleep=t=>new Promise(r=>setTimeout(r,t));
/* ---------- audio ---------- */
let AC;const ac=()=>AC||(AC=new(window.AudioContext||window.webkitAudioContext)());
function snd(k){try{const x=ac(),t=x.currentTime,g=x.createGain();g.connect(x.destination);
 if(k=='pop'){const o=x.createOscillator();o.frequency.setValueAtTime(420,t);o.frequency.exponentialRampToValueAtTime(60,t+.1);g.gain.setValueAtTime(.4,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);o.start();o.stop(t+.12)}
 else if(k=='whistle'){const o=x.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(500,t);o.frequency.exponentialRampToValueAtTime(1800,t+.9);g.gain.setValueAtTime(.03,t);g.gain.exponentialRampToValueAtTime(.001,t+.9);o.connect(g);o.start();o.stop(t+.9)}
 else{const n=x.sampleRate*1.4,b=x.createBuffer(1,n,x.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);const s=x.createBufferSource(),f=x.createBiquadFilter();s.buffer=b;f.type='lowpass';f.frequency.value=420;g.gain.value=.7;s.connect(f);f.connect(g);s.start(t)}}catch(e){}}
/* ---------- real fireworks + confetti ---------- */
const cv=$('#fx'),c=cv.getContext('2d'),cv2=$('#cf'),c2=cv2.getContext('2d');let W,H,P=[],R=[],F=[];
const rs=()=>{W=cv.width=cv2.width=innerWidth;H=cv.height=cv2.height=innerHeight};rs();addEventListener('resize',rs);
const mk=(x,y,vx,vy,o)=>P.push(Object.assign({x,y,px:x,py:y,vx,vy,l:1,d:.012,g:.05,f:.985,h:40,s:100,fw:1,r:2},o));
function burst(x,y,n=30,s=4){const h=rnd(0,360);for(let i=0;i<n;i++){const a=6.283*i/n,v=s*rnd(.4,1);mk(x,y,Math.cos(a)*v,Math.sin(a)*v,{h:h+rnd(0,40),fw:0,d:.03,f:.96,r:2.5})}}
function confetti(n=140){for(let i=0;i<n;i++)mk(rnd(0,W),rnd(-40,-5),rnd(-1.5,1.5),rnd(2,5),{h:rnd(0,360),g:.02,d:.003,f:1,sq:1,fw:0,r:rnd(5,9)})}
function rocket(x=rnd(W*.12,W*.88),ty=rnd(H*.12,H*.42)){R.push({x,y:H,ty,h:rnd(0,360)});snd('whistle')}
function explode(x,y,h){snd('boom');F.push({x,y,l:1});const t=Math.floor(rnd(0,4));
 if(t==3){for(let i=0;i<80;i++){const a=i/80*6.283,hx=16*Math.pow(Math.sin(a),3),hy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));mk(x,y,hx*.27,hy*.27,{h:330,s:90,f:.955,g:.035,d:.011})}return}
 const n=t==2?70:120;for(let i=0;i<n;i++){const a=6.283*i/n+rnd(0,.1),v=rnd(2,7)*(t==1?rnd(.5,1.2):1);
  mk(x,y,Math.cos(a)*v,Math.sin(a)*v,t==2?{h:45,s:95,d:.006,g:.07,f:.975}:{h:t==1?rnd(0,360):h+rnd(-15,15),d:rnd(.009,.016),tw:Math.random()<.3})}
 if(t==0)for(let i=0;i<30;i++)mk(x,y,rnd(-3,3),rnd(-3,3),{h:50,s:20,r:1.4,d:.02})}
(function loop(){c.globalCompositeOperation='destination-out';c.fillStyle='rgba(0,0,0,.2)';c.fillRect(0,0,W,H);c.globalCompositeOperation='lighter';c2.clearRect(0,0,W,H);
 F=F.filter(f=>{const g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,260);g.addColorStop(0,`rgba(255,240,210,${f.l*.5})`);g.addColorStop(1,'rgba(255,200,150,0)');c.fillStyle=g;c.fillRect(f.x-260,f.y-260,520,520);f.l-=.09;return f.l>0});
 R=R.filter(r=>{const v=Math.max(2.5,(r.y-r.ty)*.06+2);r.y-=v;r.x+=Math.sin(r.y/20)*.4;mk(r.x,r.y,rnd(-.4,.4),rnd(.5,1.6),{h:35,s:100,d:.05,g:.02,r:1.6});c.fillStyle='#fff3c8';c.beginPath();c.arc(r.x,r.y,2.4,0,7);c.fill();if(r.y-r.ty<4){explode(r.x,r.y,r.h);return false}return true});
 P=P.filter(p=>{p.px=p.x;p.py=p.y;p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=p.f;if(p.f<1)p.vy*=p.f;p.l-=p.d;const a=Math.max(p.l,0)*(p.tw?(Math.random()<.5?1:.3):1),k=p.fw?c:c2;k.fillStyle=k.strokeStyle=`hsla(${p.h},${p.s}%,${p.fw?62:60}%,${a})`;
  if(p.sq)k.fillRect(p.x,p.y,p.r,p.r*.6);else if(p.fw){c.lineWidth=p.r;c.lineCap='round';c.beginPath();c.moveTo(p.px,p.py);c.lineTo(p.x,p.y);c.stroke()}else{c2.beginPath();c2.arc(p.x,p.y,p.r,0,7);c2.fill()}
  return p.l>0&&p.y<H+20});requestAnimationFrame(loop)})();
const pop=()=>snd('pop'),dark=o=>$('#dark').style.opacity=o;
/* ---------- events (one per tap) ---------- */
async function lights(){dark(.05);$('#hello').style.opacity=0;const L=$$('#lights img');for(let k=0;k<L.length;k++){await sleep(300);L[k].src=IMG.bc[k%6];L[k].style.setProperty('--c',COL[k%6]);L[k].classList.add('on')}}
function music(){au.play().catch(()=>{});$('#mute').style.display='block';for(let k=0;k<9;k++)setTimeout(()=>{const n=document.createElement('div');n.className='note';n.textContent=['🎵','🎶','💜'][k%3];n.style.left=rnd(10,85)+'%';n.addEventListener('animationend',()=>n.remove());document.body.appendChild(n)},k*300)}
$('#mute').onclick=function(){au.paused?(au.play(),this.textContent='🔊'):(au.pause(),this.textContent='🔇')};
function decorate(){$$('.dc').forEach((e,k)=>setTimeout(()=>{e.classList.add('in');if(k==3)confetti(60)},k*330));setTimeout(()=>burst(W/2,H*.2,60,5),3800)}
function balloons(){const L=[...NAME.toUpperCase(),'💖'],n=L.length;L.forEach((ch,k)=>{const w=Math.min(innerWidth/n*1.1,92),x=(k+.5)*innerWidth/n-w/2,y=innerHeight*(.25+(k%2?.04:0)+rnd(-.01,.02));
 const d=document.createElement('div');d.className='bl';d.style.cssText=`width:${w}px;left:${x}px;top:${y}px;transform:translateY(${innerHeight}px) rotate(${rnd(-12,12)}deg);transition-duration:${rnd(3,4.2)}s;transition-timing-function:cubic-bezier(.15,.8,.3,1);transition-delay:${k*.3}s`;
 d.innerHTML=`<div class="in" style="animation-duration:${rnd(2.8,4.4)}s"><img src="${IMG.b[k%8]}" alt=""><span>${ch}</span></div>`;
 d.onclick=e=>{e.stopPropagation();const r=d.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height*.35,34,4);pop();d.remove()};document.body.appendChild(d);requestAnimationFrame(()=>requestAnimationFrame(()=>d.style.transform='none'))})}
const say=t=>$('#say').textContent=t,ck=()=>$('#ck');
function cakeIn(){$('#cs').classList.add('in');confetti(50);say('Here is your birthday cake 🍰')}
function light(){ck().classList.add('lit');say('Make a wish… 💫')}
function blow(){ck().classList.add('out');say('Yay! Your wish is on its way ✨');confetti(80);setTimeout(()=>say('Time to cut the cake 🔪🍰'),2000)}
function cut(){ck().classList.add('cut');setTimeout(()=>{dark(.45);confetti(220);$('#pop').classList.add('on');say('Happy Birthday! 🎉🎉');pop();const xs=[.2,.8,.5,.3,.7,.5,.15,.85];xs.forEach((p,k)=>setTimeout(()=>{rocket(W*p+rnd(-20,20));if(k==2||k==5)confetti(60)},k*650));setTimeout(()=>dark(.05),xs.length*650+1500)},2800)}
function az(){$('#pop').classList.remove('on');const g=$('#az');g.innerHTML='';$('#azp').classList.add('on');WORDS.forEach((w,i)=>{const d=document.createElement('div');d.className='chip';d.innerHTML=`<b>${String.fromCharCode(65+i)}</b><span>${w}</span>`;g.appendChild(d);setTimeout(()=>{d.classList.add('v');d.scrollIntoView({block:'nearest',behavior:'smooth'});if(i==13)confetti(80)},500+i*560)})}
function letterBox(){$('#azp').classList.remove('on');$('#envw').classList.add('show')}
$('#env').onclick=()=>{$('#env').classList.add('open');$('#eh').textContent='💖';setTimeout(()=>{$('#envw').classList.remove('show');openPaper()},1900)};
function openPaper(){const p=$('#paper');$$('#paper p').forEach(e=>e.remove());$('#paperw').classList.add('show');LETTER.forEach((t,i)=>{const e=document.createElement('p');e.textContent=t;e.style.animationDelay=i*1.1+.4+'s';p.appendChild(e)});setTimeout(()=>confetti(180),LETTER.length*1100)}
$('#x').onclick=()=>{$('#paperw').classList.remove('show');const b=$('#act');b.textContent='🔁 Celebrate again';b.onclick=()=>location.reload();b.parentElement.style.display='flex';$('#stp').textContent='💖 Happy Birthday '+NAME+' 💖'};
/* ---------- step runner ---------- */
const S=[['💡 Turn on the lights',lights,3500],['🎵 Play the music',music,3000],['🎀 Let’s decorate',decorate,4800],['🎈 Fly with balloons',balloons,5500],['🍰 Bring the cake',cakeIn,3000],['🕯️ Light the candles',light,2200],['🌬️ Blow the candles',blow,3600],['🔪 Cut the cake',cut,8500],['🔤 A to Z wishes',az,16000],['💌 Open your letter',letterBox,0]];
let i=0;const act=$('#act');
function showBtn(){act.textContent=S[i][0];$('#stp').textContent=`Step ${i+1} of ${S.length}`;act.parentElement.style.display='flex'}
act.onclick=()=>{if(i>=S.length)return;const[,f,d]=S[i];act.parentElement.style.display='none';f();i++;if(i<S.length)setTimeout(showBtn,d)};
showBtn();
document.addEventListener('click',e=>{if(i>=3&&!e.target.closest('button,#azp,#envw,#paperw'))burst(e.clientX,e.clientY,28,4)});
