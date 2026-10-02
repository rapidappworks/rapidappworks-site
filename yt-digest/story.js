const demo=document.querySelector('.native-demo');
const captions=['A long video. One idea worth finding.','Open the words. Choose your format.','Customize your prompt. Press Send.','Your ChatGPT. Your possibilities.','Click the time. Watch the moment.','More value from every video.'];
const rows=[['0:02','Welcome. Today we’ll explore creative workflows with Geometry Nodes.'],['0:18','Think of a node as one small rule you can combine with others.'],['1:42','We start with a curve, then turn that curve into something useful.'],['4:06','Procedural systems let you change the result without starting again.'],['8:35','The artist still chooses the shape, the rhythm, and the detail.'],['14:20','Reuse the same building blocks across different production tasks.'],['21:58','Here is the embroidery tool. Draw a curve and scatter stitches along it.'],['23:10','Adjust the spacing and variation to keep the result organic.'],['31:42','A simple setup can become a flexible tool for the whole team.'],['45:12','Start small, experiment, and keep creative control.']];
let format='timestamped',current=0,promptTween=null,promptKey=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function renderRows(query=''){document.querySelector('.transcript-rows').innerHTML=rows.filter(r=>r[1].toLowerCase().includes(query.toLowerCase())).map(r=>`<div class="transcript-row" style="${format==='raw'?'grid-template-columns:1fr':''}">${format==='raw'?'':`<button type="button" data-time="${r[0]}" aria-label="Preview video at ${r[0]}">${r[0]}</button>`}<span>${r[1]}</span></div>`).join('');document.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>jump(b.dataset.time)));}
function openTranscript(open=true){demo.dataset.open=String(open);document.querySelector('.open-transcript span').textContent=open?'Close Transcription':'View Transcription';}
function jump(time='21:58'){demo.dataset.seek='true';document.querySelector('#clock').textContent=time+' / 47:24';document.querySelector('#caption').textContent=time+' — back to the explanation.';}
function reveal(target){const panels=document.querySelectorAll('.prepared,.summary,.poster-scene,.answer-scene');if(window.gsap&&!reduced){gsap.killTweensOf(panels);gsap.set(panels,{autoAlpha:0});gsap.fromTo(target,{y:12},{autoAlpha:1,y:0,duration:.45});}else{panels.forEach(p=>{p.style.opacity='0';p.style.visibility='hidden';});document.querySelector(target).style.cssText='opacity:1;visibility:visible';}}
function scene(n,example){const previous=current;current=n;if(n!==2&&n!==3&&promptTween){promptTween.kill();promptTween=null;}demo.dataset.composing='false';demo.dataset.split=String(n>=2);demo.dataset.seek=String(n===5);openTranscript(n>=1);document.querySelector('#clock').textContent=n===5?'21:58 / 47:24':'0:02 / 47:24';document.querySelector('#caption').textContent=captions[n];document.querySelector('#address').textContent=n<2?'youtube.com/watch · Geometry Nodes':'YouTube  ◫  ChatGPT';const vars={width:n>=2?'54%':'100%',duration:.6,overwrite:true,ease:'power2.inOut'};if(window.gsap&&!reduced){gsap.to('.video-pane',vars);gsap.to('.chat-pane',{width:n>=2?'46%':'0%',opacity:n>=2?1:0,duration:.6,overwrite:true});}else{document.querySelector('.video-pane').style.width=vars.width;document.querySelector('.chat-pane').style.cssText=n>=2?'width:46%;opacity:1':'width:0;opacity:0';}if(!((previous===2||previous===3)&&(n===2||n===3)))reveal(n===2||n===3?'.prepared':'.answer-scene');if(n===2)showExample('intro','.prepared');if(n===3)showExample(example||'intro','.prepared');}
renderRows();
document.querySelector('.open-transcript').addEventListener('click',()=>openTranscript(demo.dataset.open!=='true'));
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{format=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(t=>t.classList.toggle('active',t===b));document.querySelector('.search-box').style.display=format==='search'?'block':'none';document.querySelector('.segment-box').style.display=format==='segment'?'block':'none';renderRows();}));
document.querySelector('.search-box input').addEventListener('input',e=>renderRows(e.target.value));
document.querySelector('.summarize-btn').addEventListener('click',()=>scene(2));
document.addEventListener('click',event=>{if(event.target.closest('.composer-send')){document.querySelector('#caption').textContent='Your custom prompt is ready to send with the transcript.';}});
document.querySelectorAll('.jump,.jump-mobile,.time-link').forEach(b=>b.addEventListener('click',()=>jump()));
if(window.gsap&&window.ScrollTrigger&&!reduced){gsap.registerPlugin(ScrollTrigger);document.querySelectorAll('[data-scene]').forEach((el,n)=>{ScrollTrigger.create({trigger:el,start:()=>matchMedia('(max-width:850px)').matches?'top top+=8':'top 65%',end:()=>matchMedia('(max-width:850px)').matches?'bottom top+=8':'bottom 65%',onEnter:()=>scene(Number(el.dataset.scene),el.dataset.example),onEnterBack:()=>scene(Number(el.dataset.scene),el.dataset.example)});if(Number(el.dataset.scene)===4)ScrollTrigger.create({trigger:el,start:'75% 65%',onEnter:()=>jump(),onLeaveBack:()=>{demo.dataset.seek='false';document.querySelector('#clock').textContent='0:02 / 47:24';}});});gsap.to('.progress div',{width:'100%',ease:'none',scrollTrigger:{trigger:'.journey-layout',start:'top center',end:'bottom bottom',scrub:true}});window.addEventListener('load',()=>ScrollTrigger.refresh());}else{document.body.classList.add('static');new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)scene(Number(e.target.dataset.scene));}),{threshold:.4}).observe(document.querySelector('[data-scene]'));}
scene(0);

function showExample(key,target='.poster-scene'){
const examples={
intro:['','Explain this video shortly.',''],
memory:['Memory','Can you explain this based on what we discussed yesterday?',''],
project:['Projects','Apply the suggestions to my project UI.','UI redesign'],
apps:['Connected apps','Can you update the notes in my Drive with the key ideas from this video?','Google Drive'],
plugin:['Plugins','Prepare a single page poster explaining the core ideas of the speaker.','ppt'],
skill:['Skills','Turn these ideas into class slides using my presentation skill.','Presentation']
};
const e=examples[key]||examples.intro,panel=document.querySelector(target);
const contextIcons={project:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3Z"/>',apps:'<path d="m8 3 6 0 7 12-3 6H4l-3-6Z"/><path d="m8 3 7 12H1m13-12L4 21m11-6h6"/>',plugin:'<path d="M9 3h6v5h5v6h-5v7H9v-7H4V8h5Z"/>',skill:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>'};
const chip=e[2]?'<span class="composer-context context-'+key+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(contextIcons[key]||contextIcons.plugin)+'</svg><span>'+e[2]+'</span><svg class="context-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></span>':'';
if(!panel.querySelector('.prompt-demo'))panel.innerHTML='<div class="prompt-demo"><div class="chat-mode"><span>Chat</span><span>Work</span></div><div class="prompt-greeting">What’s on your mind today?</div><div class="unified-composer"><svg class="composer-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/></svg><div class="composer-transcript"><div>45:12: Start small and experiment with the tools.</div><div>45:28: Keep the artist in control of the result.</div><div>46:05: Combine simple rules into reusable systems.</div><div>46:31: Adapt the workflow to your own projects.</div><div>47:03: Thanks for watching this demonstration.</div><div>47:24: See you in the next one.</div></div><div class="composer-prompt"><div class="prompt-context-slot"></div><div><span class="prompt-text"></span><span class="typing-caret"></span></div></div><div class="unified-footer"><span class="composer-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg></span><span class="composer-medium">Medium <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span><svg class="composer-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3"/></svg><button class="composer-send" type="button" aria-label="Send example prompt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"/></svg></button></div></div></div>';
const text=panel.querySelector('.prompt-text'),context=panel.querySelector('.prompt-context-slot');
if(promptKey!==key){
 if(promptTween)promptTween.kill();
 const old=text.textContent;promptKey=key;
 if(reduced||!window.gsap){context.innerHTML=chip;text.textContent=e[1];}
 else{
  const state={count:old.length};
  promptTween=gsap.timeline();
  promptTween.to(state,{count:0,duration:Math.min(.35,old.length*.006),ease:'none',onUpdate:()=>{text.textContent=old.slice(0,Math.round(state.count));}});
  promptTween.call(()=>{context.innerHTML=chip;state.count=0;});
  promptTween.to(state,{count:e[1].length,duration:Math.max(.55,Math.min(1.6,e[1].length*.022)),ease:'none',onUpdate:()=>{text.textContent=e[1].slice(0,Math.round(state.count));}});
 }
}
demo.dataset.composing='true';
document.querySelector('#caption').textContent=key==='intro'?'Customize your prompt. Press Send.':e[0]+' — take the transcript further.';
}
// Gentle editorial reveals preserve native scrolling and reduced-motion preferences.
if(window.gsap&&window.ScrollTrigger&&!reduced){
 gsap.from('.hero-pill,h1,.intro p,.scroll-link',{autoAlpha:0,y:20,duration:.85,stagger:.13,ease:'power3.out'});
 document.querySelectorAll('.chapters section').forEach(section=>{
  gsap.from(section.children,{autoAlpha:0,y:24,duration:.8,stagger:.09,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 85%',toggleActions:'play none none none'}});
 });
 gsap.from('.closing p',{autoAlpha:0,y:25,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.closing',start:'top 85%'}});
}
// One short wheel gesture advances one story segment. Scrollable transcript controls retain normal scrolling.
if(!reduced){
 const segments=[document.querySelector('.intro'),...document.querySelectorAll('.chapters section'),document.querySelector('.closing')];
 const dotNav=document.querySelector('.segment-dots');
 let moving=false,total=0,resetTimer,index=0;
 function targetY(i){return Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,segments[i].getBoundingClientRect().top+scrollY-(i===0||matchMedia('(max-width:850px)').matches?0:90)));}
 function nearest(){let best=0,dist=Infinity;segments.forEach((el,i)=>{const d=Math.abs(targetY(i)-scrollY);if(d<dist){dist=d;best=i;}});return best;}
 function updateDots(){index=nearest();dotNav.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-current',i===index?'step':'false');});}
 function go(i){if(moving)return;i=Math.max(0,Math.min(segments.length-1,i));moving=true;total=0;const from=scrollY,to=targetY(i),start=performance.now(),duration=480;function frame(now){const p=Math.min(1,(now-start)/duration),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;window.scrollTo({top:from+(to-from)*e,behavior:'instant'});if(p<1)requestAnimationFrame(frame);else{const el=segments[i];if(el.dataset.scene)scene(Number(el.dataset.scene),el.dataset.example);updateDots();setTimeout(()=>moving=false,180);}}requestAnimationFrame(frame);}
 segments.forEach((el,i)=>{const b=document.createElement('button');b.type='button';const label=el.querySelector('h1,h2')?.textContent||'A new way to explore';b.setAttribute('aria-label','Go to '+label);b.title=label;b.innerHTML='<span></span>';b.addEventListener('click',()=>go(i));dotNav.appendChild(b);});
 window.addEventListener('wheel',event=>{if(event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||event.target.closest('input,textarea,.transcript-rows'))return;event.preventDefault();if(moving)return;clearTimeout(resetTimer);total+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);resetTimer=setTimeout(()=>total=0,160);if(Math.abs(total)>=28)go(nearest()+(total>0?1:-1));},{passive:false});
 window.addEventListener('scroll',updateDots,{passive:true});updateDots();
}
// The blob tracks the pointer smoothly without intercepting clicks or scrolling.
if(!reduced&&matchMedia('(pointer:fine)').matches){
 const blob=document.createElement('div');blob.className='cursor-blob';blob.setAttribute('aria-hidden','true');document.body.appendChild(blob);
 let x=0,y=0,targetX=0,targetY=0,frame=0;
 function follow(){x+=(targetX-x)*.14;y+=(targetY-y)*.14;blob.style.transform=`translate3d(${x-125}px,${y-115}px,0)`;if(Math.abs(targetX-x)+Math.abs(targetY-y)>.2)frame=requestAnimationFrame(follow);else frame=0;}
 window.addEventListener('pointermove',e=>{targetX=e.clientX;targetY=e.clientY;if(!blob.classList.contains('visible')){x=targetX;y=targetY;blob.classList.add('visible');}if(!frame)frame=requestAnimationFrame(follow);},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>{blob.classList.remove('visible');if(frame)cancelAnimationFrame(frame);frame=0;});
 window.addEventListener('blur',()=>blob.classList.remove('visible'));
}
// Touch gestures use the same segment positions as wheel navigation.
if(!reduced&&matchMedia('(max-width:850px)').matches){
 const touchSegments=[document.querySelector('.intro'),...document.querySelectorAll('.chapters section'),document.querySelector('.closing')];
 let touchStartY=0,touchStartX=0,touchIgnore=false,touchLocked=false;
 const position=i=>Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,touchSegments[i].getBoundingClientRect().top+scrollY));
 function touchIndex(){let index=0,distance=Infinity;touchSegments.forEach((_,i)=>{const d=Math.abs(position(i)-scrollY);if(d<distance){distance=d;index=i;}});return index;}
 window.addEventListener('touchstart',e=>{touchIgnore=!!e.target.closest('input,textarea,.transcript-rows,button,a,.segment-copy');touchStartY=e.touches[0].clientY;touchStartX=e.touches[0].clientX;},{passive:true});
 window.addEventListener('touchmove',e=>{if(!touchIgnore&&Math.abs(e.touches[0].clientY-touchStartY)>Math.abs(e.touches[0].clientX-touchStartX))e.preventDefault();},{passive:false});
 window.addEventListener('touchend',e=>{if(touchIgnore||touchLocked)return;const delta=touchStartY-e.changedTouches[0].clientY;if(Math.abs(delta)<28)return;const index=Math.max(0,Math.min(touchSegments.length-1,touchIndex()+(delta>0?1:-1)));touchLocked=true;const from=scrollY,to=position(index),start=performance.now();function frame(now){const p=Math.min(1,(now-start)/420),ease=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;scrollTo({top:from+(to-from)*ease,behavior:'instant'});if(p<1)requestAnimationFrame(frame);else{const el=touchSegments[index];if(el.dataset.scene)scene(Number(el.dataset.scene),el.dataset.example);setTimeout(()=>touchLocked=false,150);}}requestAnimationFrame(frame);},{passive:true});
}

