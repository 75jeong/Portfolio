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
