/* Shared behavior for every page. Each block checks for its own markup. */
(function(){
  var root=document.documentElement,motion=root.classList.contains('motion');
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* language + theme */
  var btns=$$('[data-set]'),onLang=[];
  function mark(){btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.set===root.dataset.lang))})}
  function setLang(l){root.dataset.lang=l;root.lang=l;mark();try{localStorage.setItem('pf-lang-v2',l)}catch(e){}onLang.forEach(function(f){f()})}
  btns.forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.set)})});mark();
  var th=$('#theme');if(th)th.addEventListener('click',function(){var t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('cv-theme',t)}catch(e){}});

  /* page transition: fade out before leaving for another page of this site */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');if(!a||!motion)return;
    var h=a.getAttribute('href');if(!(/^\/cv(\/|$)/.test(h)||/\.html(\?|#|$)/.test(h))||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey)return;
    e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=h},300)});
  addEventListener('pageshow',function(e){if(e.persisted)document.body.classList.remove('leaving')});

  /* G: toggle the 8px grid overlay */
  document.addEventListener('keydown',function(e){if((e.key==='g'||e.key==='G')&&!/input|textarea/i.test((e.target.tagName||''))&&!e.metaKey&&!e.ctrlKey)document.body.classList.toggle('grid8')});

  /* Tokyo clock */
  var clock=$('#clock');
  if(clock){var fmt=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',hour:'numeric',minute:'2-digit'});
    var tick=function(){clock.textContent='Tokyo • '+fmt.format(new Date())};tick();setInterval(tick,15000)}

  /* copy mail */
  var msg={ja:'コピーしました',en:'Copied',ko:'복사되었습니다'};
  $$('[data-mail]').forEach(function(m){m.addEventListener('click',function(){var v=m.dataset.mail,n=m.nextElementSibling;
    function ok(){if(n){n.textContent=msg[root.dataset.lang]||msg.en;clearTimeout(m._t);m._t=setTimeout(function(){n.textContent=''},1600)}}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(ok,function(){location.href='mailto:'+v});else location.href='mailto:'+v})});

  /* print (Resume PDF) */
  $$('[data-print]').forEach(function(b){b.addEventListener('click',function(){window.print()})});
  if(/[?&]print=1/.test(location.search))addEventListener('load',function(){setTimeout(function(){window.print()},500)});

  /* home: the big word behind the cards becomes the card you point at */
  var big=$('#big');
  if(big){var NAME=big.textContent,cur=NAME;
    var swap=function(w){if(w===cur)return;cur=w;
      if(!motion||!big.animate){big.textContent=w;return}
      var a=big.animate([{opacity:1,filter:'blur(0)',transform:'none'},{opacity:0,filter:'blur(10px)',transform:'translateY(-22%)'}],{duration:180,easing:'ease-in',fill:'forwards'});
      a.onfinish=function(){big.textContent=cur;big.animate([{opacity:0,filter:'blur(10px)',transform:'translateY(24%)'},{opacity:1,filter:'blur(0)',transform:'none'}],{duration:520,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'})}};
    $$('.bento .c').forEach(function(c){var on=function(){swap(c.getAttribute('data-w-'+root.dataset.lang)||NAME)},off=function(){swap(NAME)};
      c.addEventListener('pointerenter',on);c.addEventListener('focus',on);c.addEventListener('pointerleave',off);c.addEventListener('blur',off)})}

  /* contact: compose an email from the form */
  var form=$('#form');
  if(form)form.addEventListener('submit',function(e){e.preventDefault();
    var name=$('#f-name').value.trim(),topics=$$('input[name=topic]:checked',form).map(function(i){return i.value}),body=$('#f-msg').value.trim();
    var subj='[aftworks] '+(topics.length?topics.join(' / '):'Inquiry')+(name?' from '+name:'');
    var text=(name?'Name: '+name+'\n':'')+(topics.length?'Topic: '+topics.join(', ')+'\n':'')+'\n'+body;
    location.href='mailto:jinho@aftworks.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(text)});

  if(!motion)return;
  requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.add('ready')})});

  /* about: words fill in as you read */
  var para=$('#para');
  if(para){
    $$('p',para).forEach(function(p){var ja=p.classList.contains('ja'),txt=p.textContent;p.setAttribute('aria-label',txt);p.textContent='';
      var parts=ja?(txt.match(/[^、。]+[、。]?/g)||[txt]).reduce(function(a,s){return a.concat(s.match(/.{1,3}/g)||[s])},[]):txt.split(/(\s+)/);
      parts.forEach(function(s){if(/^\s+$/.test(s)){p.appendChild(document.createTextNode(s));return}var w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');w.textContent=s;p.appendChild(w)})});
    var paint=function(){var ws=$$('.w',para).filter(function(w){return w.offsetParent!==null});
      var r=para.getBoundingClientRect(),start=innerHeight*.85,end=innerHeight*.35;
      var k=Math.max(0,Math.min(1,(start-r.top)/((start-end)+r.height*.9))),n=Math.round(k*ws.length);
      ws.forEach(function(w,i){w.classList.toggle('on',i<n)})};
    var tk=false;addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(function(){tk=false;paint()})}},{passive:true});
    addEventListener('resize',paint);onLang.push(paint);paint()}

  /* reveals + count-up */
  $$('.tl > li,.work li,.skills > div,.pf > a,.ct-l,.form,.cs-media > *,.step,.pn,.ow tbody tr').forEach(function(el){el.classList.add('rv')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');
    $$('[data-count]',e.target).forEach(function(b){var m=b.textContent.match(/^(\d+)(.*)$/),t0=performance.now();if(!m)return;
      (function f(t){var k=Math.min(1,(t-t0)/1100),e2=1-Math.pow(1-k,3);b.textContent=Math.round(+m[1]*e2)+m[2];if(k<1)requestAnimationFrame(f)})(t0)});
    io.unobserve(e.target)})},{rootMargin:'0px 0px -6% 0px'});
  $$('.rv').forEach(function(el){io.observe(el)});
  addEventListener('beforeprint',function(){$$('.rv').forEach(function(el){el.classList.add('in')});$$('.w').forEach(function(w){w.classList.add('on')})});
})();

/* booking: open cal.com in a bottom sheet instead of a new tab (desktop and mobile) */
(function(){
  var URL='https://cal.com/jeong75/30min',root=document.documentElement;
  if(!document.querySelector('a[href^="'+URL+'"]'))return;
  var st=document.createElement('style');st.textContent=
   '.bk-sheet{position:fixed;inset:0;z-index:1000}.bk-sheet[hidden]{display:none}'+
   '.bk-back{position:absolute;inset:0;background:rgba(10,10,12,.48);backdrop-filter:blur(8px);opacity:0;transition:opacity .4s ease}.bk-sheet.on .bk-back{opacity:1}'+
   '.bk-panel{position:absolute;inset:calc(20px + env(safe-area-inset-top,0px)) 20px 0 20px;display:flex;flex-direction:column;background:var(--bg);color:var(--ink);border-radius:24px 24px 0 0;box-shadow:0 -24px 64px rgba(0,0,0,.25);transform:translateY(100%);transition:transform .5s cubic-bezier(.2,.8,.2,1);outline:none}'+
   '.bk-sheet.on .bk-panel{transform:none}'+
   '.bk-bar{position:relative;flex:none;display:flex;align-items:center;gap:8px;padding:24px 24px 16px;border-bottom:1px solid var(--line);touch-action:none;user-select:none;cursor:grab}'+
   '.bk-handle{position:absolute;left:50%;top:8px;width:40px;height:4px;transform:translateX(-50%);border-radius:999px;background:var(--line)}'+
   '.bk-t{position:absolute;left:50%;transform:translateX(-50%);margin:0;font-weight:600;font-size:15px;white-space:nowrap;max-width:calc(100% - 336px);overflow:hidden;text-overflow:ellipsis}'+
   '.bk-ext{font-size:13px;color:var(--muted);text-decoration:none;white-space:nowrap}.bk-ext:hover{color:var(--ink)}'+
   '.bk-x{margin-left:auto;display:grid;place-items:center;width:40px;height:40px;padding:0;border-radius:999px;border:1px solid var(--ink);background:var(--ink);color:var(--bg);cursor:pointer}'+
   '.bk-body{position:relative;flex:1;display:flex;overflow:hidden}.bk-body iframe{position:relative;z-index:1;flex:1;width:100%;height:100%;border:0;opacity:0;transition:opacity .3s}.bk-body iframe.ok{opacity:1}'+
   '.bk-wait{position:absolute;inset:0;display:grid;place-items:center;margin:0;color:var(--muted);font-size:13px}'+
   'html.bk-open{overflow:hidden}'+
   '@media (max-width:640px){.bk-panel{inset:calc(8px + env(safe-area-inset-top,0px)) 0 0 0;border-radius:16px 16px 0 0}.bk-t{position:static;transform:none;max-width:none;order:1}.bk-ext{order:2}.bk-x{order:3;margin-left:auto}.bk-bar{padding-inline:16px}}'+
   '@media (prefers-reduced-motion:reduce){.bk-panel,.bk-back{transition:none}}';
  document.head.appendChild(st);
  var s=document.createElement('div');s.className='bk-sheet';s.hidden=true;s.innerHTML=
   '<div class="bk-back" data-bk-close></div><div class="bk-panel" role="dialog" aria-modal="true" aria-labelledby="bk-title" tabindex="-1">'+
   '<div class="bk-bar"><span class="bk-handle" aria-hidden="true"></span>'+
   '<a class="bk-ext" href="'+URL+'" target="_blank" rel="noopener" data-bk-ext><span class="ja">新しいタブで開く</span><span class="en">Open in new tab</span><span class="ko">새 탭에서 열기</span> ↗</a>'+
   '<p class="bk-t" id="bk-title"><span class="ja">面談を予約する</span><span class="en">Book a 1:1</span><span class="ko">면담 예약하기</span></p>'+
   '<button type="button" class="bk-x" data-bk-close aria-label="Close"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button></div>'+
   '<div class="bk-body"><p class="bk-wait"><span class="ja">カレンダーを読み込んでいます…</span><span class="en">Loading the calendar…</span><span class="ko">캘린더를 불러오는 중…</span></p></div></div>';
  document.body.appendChild(s);
  var panel=s.querySelector('.bk-panel'),body=s.querySelector('.bk-body'),frame=null,last=null,closing=0,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function open(push){
    clearTimeout(closing);
    if(!frame){frame=document.createElement('iframe');frame.title='Cal.com';frame.setAttribute('allow','payment');frame.addEventListener('load',function(){frame.classList.add('ok');var w=body.querySelector('.bk-wait');if(w)w.remove()});
      frame.src=URL+'?embed=true&layout=month_view&theme='+(root.dataset.theme==='dark'?'dark':'light');body.appendChild(frame)}
    if(s.hidden){last=document.activeElement;s.hidden=false;root.classList.add('bk-open');requestAnimationFrame(function(){requestAnimationFrame(function(){s.classList.add('on')})})}
    panel.focus({preventScroll:true});
    if(push!==false){try{history.pushState({book:1},'','#book')}catch(e){}}
  }
  function close(fromPop){
    if(s.hidden)return;s.classList.remove('on');panel.style.transform='';
    closing=setTimeout(function(){s.hidden=true;root.classList.remove('bk-open');if(last&&last.focus)last.focus({preventScroll:true})},reduce?0:420);
    if(!fromPop&&history.state&&history.state.book){try{history.back()}catch(e){}}
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-bk-close]')){close();return}
    var a=e.target.closest&&e.target.closest('a[href^="'+URL+'"]');
    if(!a||a.hasAttribute('data-bk-ext')||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();open();
  });
  document.addEventListener('keydown',function(e){if(!s.hidden&&e.key==='Escape'){e.preventDefault();close()}});
  addEventListener('popstate',function(e){if(e.state&&e.state.book)open(false);else close(true)});
  addEventListener('hashchange',function(){if(location.hash==='#book')open(false)});
  var bar=s.querySelector('.bk-bar'),y0=null,dy=0;
  bar.addEventListener('pointerdown',function(e){if(e.target.closest('button,a'))return;y0=e.clientY;dy=0;panel.style.transition='none';bar.setPointerCapture(e.pointerId)});
  bar.addEventListener('pointermove',function(e){if(y0===null)return;dy=Math.max(0,e.clientY-y0);panel.style.transform='translateY('+dy+'px)'});
  function end(){if(y0===null)return;panel.style.transition='';y0=null;if(dy>120)close();else panel.style.transform=''}
  bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);
  if(location.hash==='#book')setTimeout(function(){try{history.replaceState({book:1},'','#book')}catch(e){}open(false)},300);
})();

/* METAJOB symbol: replay the build on hover or focus */
(function(){function rp(p){p.classList.add('replay');void p.offsetWidth;p.classList.remove('replay')}
document.addEventListener('mouseover',function(e){var p=e.target.closest&&e.target.closest('.p-metajob');if(p&&!p.contains(e.relatedTarget))rp(p)});
document.addEventListener('focusin',function(e){var p=e.target.closest&&e.target.closest('.p-metajob');if(p)rp(p)})})();

/* METAJOB LP carousel: arrows, counter, mouse drag */
(function(){
  function setup(car){
    var t=car.querySelector('.mj-track'),sl=[].slice.call(t.children),cnt=car.querySelector('.mj-count'),pv=car.querySelector('.mj-prev'),nx=car.querySelector('.mj-next'),n=sl.length,cur=0;
    function pad(i){return(i<10?'0':'')+i}
    function upd(){var c=t.scrollLeft+t.clientWidth/2,best=0,bd=1e9;sl.forEach(function(s,i){var d=Math.abs(s.offsetLeft+s.offsetWidth/2-c);if(d<bd){bd=d;best=i}});cur=best;
      sl.forEach(function(s,i){s.classList.toggle('on',i===cur)});cnt.textContent=pad(cur+1)+' / '+pad(n);pv.disabled=cur===0;nx.disabled=cur===n-1}
    function go(i){i=Math.max(0,Math.min(n-1,i));var s=sl[i];t.scrollTo({left:s.offsetLeft-(t.clientWidth-s.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
    pv.addEventListener('click',function(){go(cur-1)});nx.addEventListener('click',function(){go(cur+1)});
    t.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}});
    var x0=null,s0=0,moved=0;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;x0=e.clientX;s0=t.scrollLeft;moved=0;t.classList.add('drag');t.setPointerCapture(e.pointerId)});
    t.addEventListener('pointermove',function(e){if(x0===null)return;moved=Math.abs(e.clientX-x0);t.scrollLeft=s0-(e.clientX-x0)});
    function end(){if(x0===null)return;x0=null;t.classList.remove('drag');upd();go(cur)}
    t.addEventListener('pointerup',end);t.addEventListener('pointercancel',end);
    addEventListener('resize',upd,{passive:true});upd();
    car._mjUpd=upd;
  }
  function init(){[].forEach.call(document.querySelectorAll('.mj-car'),function(c){if(!c._mj){c._mj=1;setup(c)}})}
  init();
  /* the case sheet moves the article in later; re-check sizes when it becomes visible */
  new MutationObserver(function(){[].forEach.call(document.querySelectorAll('.mj-car'),function(c){if(c._mjUpd)c._mjUpd()})}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
})();

/* Jiffcy demo: play in view, highlight the current step, tap a step to jump */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].forEach.call(document.querySelectorAll('.jf-demo'),function(box){
    var v=box.querySelector('video'),items=[].slice.call(box.querySelectorAll('.jf-steps li')),bar=box.querySelector('.jf-bar i'),btn=box.querySelector('.jf-play'),T=items.map(function(li){return +li.querySelector('button').dataset.t}),user=false;
    function mark(){var t=v.currentTime,k=0;T.forEach(function(x,i){if(t>=x-.05)k=i});items.forEach(function(li,i){li.classList.toggle('on',i===k)});if(v.duration)bar.style.width=(t/v.duration*100)+'%'}
    function state(){box.classList.toggle('paused',v.paused);btn.setAttribute('aria-label',v.paused?'Play demo':'Pause demo')}
    v.addEventListener('timeupdate',mark);v.addEventListener('play',state);v.addEventListener('pause',state);state();
    btn.addEventListener('click',function(){user=true;if(v.paused)v.play().catch(function(){});else v.pause()});
    items.forEach(function(li,i){li.querySelector('button').addEventListener('click',function(){v.currentTime=T[i];mark();user=false;v.play().catch(function(){})})});
    if(reduce){v.removeAttribute('loop');return}
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!user)v.play().catch(function(){});else if(!e.isIntersecting)v.pause()})},{threshold:.35}).observe(v);
  });
})();

/* WealthPark: screens scroll on their own while in view; touch, wheel or hover takes over */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  [].forEach.call(document.querySelectorAll('.wpd[data-auto],.wlw[data-auto]'),function(d,idx){
    var s=d.querySelector('.wpd-scr,.wlw-scr'),speed=+d.dataset.auto||30,vis=false,hold=0,raf=0,last=0,phase='down',wait=1200+idx*400;
    function pause(ms){hold=performance.now()+ms}
    ['pointerdown','wheel','touchstart','keydown'].forEach(function(e){s.addEventListener(e,function(){pause(6000)},{passive:true})});
    d.addEventListener('mouseenter',function(){pause(1e9)});d.addEventListener('mouseleave',function(){pause(1500)});
    function tick(t){raf=requestAnimationFrame(tick);var dt=Math.min(64,t-(last||t));last=t;if(!vis||t<hold)return;
      if(wait>0){wait-=dt;return}
      var max=s.scrollHeight-s.clientHeight;if(max<=2)return;
      if(phase==='down'){s.scrollTop=Math.min(max,s.scrollTop+speed*dt/1000*(s.clientWidth/240));if(s.scrollTop>=max-1){phase='up';wait=1800}}
      else{s.scrollTo({top:0,behavior:'smooth'});phase='down';wait=2600}}
    new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;if(vis&&!raf){last=0;raf=requestAnimationFrame(tick)}else if(!vis&&raf){cancelAnimationFrame(raf);raf=0}})},{threshold:.5}).observe(d);
  });
})();
