// Minimal JS ported from legacy to preserve UX with Tailwind structure

function throttle(fn, limit){let inThrottle;return function(){if(!inThrottle){fn.apply(this,arguments);inThrottle=true;setTimeout(()=>inThrottle=false,limit);}}}
function debounce(fn, wait){let t;return function(){clearTimeout(t);t=setTimeout(()=>fn.apply(this,arguments),wait)}}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setHeaderOffset(){const root=document.documentElement;const header=document.querySelector('header[role="banner"]');if(!header)return;const h=header.getBoundingClientRect().height;root.style.setProperty('--header-height', h+"px");root.style.scrollPaddingTop = h+"px";}

function initNav(){const toggle=document.getElementById('navToggle');const list=document.getElementById('navList');const mobile=document.getElementById('mobileMenu');if(!toggle||!list||!mobile)return;toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded', String(!expanded));if(!expanded){mobile.innerHTML = `<div class="menu"><ul class="space-y-2">${list.innerHTML}</ul></div>`;mobile.classList.add('is-open');}else{mobile.classList.remove('is-open');setTimeout(()=>mobile.innerHTML='',300);}setHeaderOffset();});
  document.addEventListener('click',(e)=>{if(!mobile.contains(e.target)&&!toggle.contains(e.target)){toggle.setAttribute('aria-expanded','false');mobile.classList.remove('is-open');}});
}

function initSmoothScroll(){document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',(e)=>{const id=a.getAttribute('href');if(!id||id==='#')return;const el=document.querySelector(id);if(!el)return;e.preventDefault();const header=document.querySelector('header[role="banner"]');const h=header?header.getBoundingClientRect().height:0;const top=el.getBoundingClientRect().top + window.pageYOffset - h;try{window.scrollTo({top,behavior:'smooth'});}catch{window.scrollTo(0,top);} });});}

function initProgress(){const bar=document.getElementById('progressBar');if(!bar)return;const up=()=>{const t=window.pageYOffset;const d=document.documentElement.scrollHeight - window.innerHeight;const p = d>0 ? (t/d)*100 : 0;bar.style.width = p+"%";};window.addEventListener('scroll', throttle(up,16), {passive:true});up();}

function initTabs(){const btns=document.querySelectorAll('.about__tab-btn');const panels=document.querySelectorAll('.about__tab-panel');if(!btns.length)return;btns.forEach(b=>b.addEventListener('click',()=>{const tab=b.getAttribute('data-tab');btns.forEach(x=>x.classList.remove('about__tab-btn--active'));b.classList.add('about__tab-btn--active');panels.forEach(p=>{p.classList.toggle('about__tab-panel--active', p.getAttribute('data-tab')===tab);});}));}

function initProjectModal(){const modal=document.getElementById('projectModal');const modalBtns=document.querySelectorAll('.project-modal-btn');const closeBtns=document.querySelectorAll('.project-modal__close, .project-modal__close-btn');const overlay=document.querySelector('.project-modal__overlay');if(!modal||!modalBtns.length)return;function openModal(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.addEventListener('keydown',handleEscapeKey);}function closeModal(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';document.removeEventListener('keydown',handleEscapeKey);}function handleEscapeKey(e){if(e.key==='Escape'){closeModal();}}modalBtns.forEach(btn=>{btn.addEventListener('click',openModal);});closeBtns.forEach(btn=>{btn.addEventListener('click',closeModal);});if(overlay){overlay.addEventListener('click',closeModal);}}

function initExperienceModal(){const modal=document.getElementById('experienceModal');const closeBtns=document.querySelectorAll('.experience-modal__close, .experience-modal__close-btn');const overlay=document.querySelector('.experience-modal__overlay');if(!modal){console.log('Experience modal not found, retrying...');setTimeout(initExperienceModal, 100);return;}function openModal(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.addEventListener('keydown',handleEscapeKey);}function closeModal(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';document.removeEventListener('keydown',handleEscapeKey);}function handleEscapeKey(e){if(e.key==='Escape'){closeModal();}}document.addEventListener('click',(e)=>{if(e.target.matches('.experience-modal-btn')||e.target.closest('.experience-modal-btn')){e.preventDefault();console.log('Experience button clicked, opening modal...');openModal();}});closeBtns.forEach(btn=>{btn.addEventListener('click',closeModal);});if(overlay){overlay.addEventListener('click',closeModal);}}

function initContactForm(){const form=document.getElementById('contact-form-new');if(!form)return;const ta=form.querySelector('textarea');if(ta){ta.addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,400)+'px';});}
  
  // Real-time validation
  const inputs=form.querySelectorAll('input, textarea');inputs.forEach(input=>{input.addEventListener('blur',validateField);input.addEventListener('input',clearError);});
  
  function validateField(e){const field=e.target;const value=field.value.trim();let isValid=true;let errorMsg='';if(field.id==='name-new'){if(!value){isValid=false;errorMsg='Name is required';}else if(value.length<2){isValid=false;errorMsg='Name must be at least 2 characters';}else if(value.length>50){isValid=false;errorMsg='Name must be less than 50 characters';}}else if(field.id==='email-new'){const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!value){isValid=false;errorMsg='Email is required';}else if(!emailRe.test(value)){isValid=false;errorMsg='Please enter a valid email address';}else if(value.length>100){isValid=false;errorMsg='Email must be less than 100 characters';}}else if(field.id==='message-new'){if(!value){isValid=false;errorMsg='Message is required';}else if(value.length<10){isValid=false;errorMsg='Message must be at least 10 characters';}else if(value.length>1000){isValid=false;errorMsg='Message must be less than 1000 characters';}}showFieldError(field,isValid,errorMsg);}
  
  function clearError(e){const field=e.target;showFieldError(field,true,'');}
  
  function showFieldError(field,isValid,errorMsg){const fieldId=field.id;const errorElement=document.getElementById(fieldId.replace('-new','-error'));if(isValid){field.style.borderColor='';field.style.boxShadow='';if(errorElement){errorElement.textContent='';errorElement.classList.remove('show');}}else{field.style.borderColor='#ef4444';field.style.boxShadow='0 0 0 3px rgba(239,68,68,.1)';if(errorElement){errorElement.textContent=errorMsg;errorElement.classList.add('show');}}}
  
  form.addEventListener('submit',(e)=>{e.preventDefault();const name=form.querySelector('#name-new');const email=form.querySelector('#email-new');const message=form.querySelector('#message-new');const btn=form.querySelector('button[type="submit"]');const btnText=btn.querySelector('#btn-text');const btnIcon=btn.querySelector('#btn-icon');let isValid=true;const fields=[name,email,message];fields.forEach(field=>{validateField({target:field});if(field.style.borderColor==='rgb(239, 68, 68)'){isValid=false;}});if(!isValid){btn.style.transform='scale(0.95)';setTimeout(()=>btn.style.transform='',200);return;} btnText.textContent='Sending...';btnIcon.innerHTML='<circle cx="12" cy="12" r="10" stroke-dasharray="31.416" stroke-dashoffset="31.416"><animate attributeName="stroke-dashoffset" values="0;31.416" dur="1s" repeatCount="indefinite"/></circle>';btn.disabled=true;setTimeout(()=>{form.submit();},500);});
  
  // Reset form state on page load (handles return from Formspree)
  function resetFormState(){const btn=form.querySelector('button[type="submit"]');const btnText=btn.querySelector('#btn-text');const btnIcon=btn.querySelector('#btn-icon');if(btn){btnText.textContent='Submit';btnIcon.innerHTML='<path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>';btn.disabled=false;}const inputs=form.querySelectorAll('input, textarea');inputs.forEach(input=>{input.value='';input.style.borderColor='';input.style.boxShadow='';});const errorMessages=form.querySelectorAll('.error-message');errorMessages.forEach(msg=>{msg.textContent='';msg.classList.remove('show');});}
  
  // Check if we're returning from a successful submission
  const urlParams=new URLSearchParams(window.location.search);if(urlParams.get('success')==='true'||window.location.pathname.includes('thanks')){resetFormState();}
  
  // Reset form state after successful submission
  window.addEventListener('pageshow',(e)=>{if(e.persisted){resetFormState();}});}

function initAnimations(){if(prefersReducedMotion)return;document.querySelectorAll('[data-animate]').forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='all .6s ease';el.style.transitionDelay = (i*0.1)+'s';setTimeout(()=>{el.style.opacity='1';el.style.transform='translateY(0)';},100 + (i*100));});}

function preload(){const link=document.createElement('link');link.rel='preload';link.as='image';link.href='./assets/avatar.png';document.head.appendChild(link);}

function setYear(){const y=document.getElementById('current-year');if(y){y.textContent=new Date().getFullYear();}}

function scrollToHero(){const hero=document.getElementById('hero');if(hero){window.scrollTo({top:0,behavior:'smooth'});}}

function initSplashScreen(){const splash=document.getElementById('splashScreen');if(!splash)return;setTimeout(()=>{splash.classList.add('fade-out');setTimeout(()=>{splash.style.display='none';},800);},2500);}

function initScrollAnimations(){const elements=document.querySelectorAll('.animate-on-scroll');if(!elements.length)return;const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('animate-in');}else{entry.target.classList.remove('animate-in');}});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});elements.forEach(el=>observer.observe(el));const avatarWrap=document.querySelector('.about__image-wrap');if(avatarWrap){const avatarObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('avatar-animate-in');}else{entry.target.classList.remove('avatar-animate-in');}});},{threshold:0.05,rootMargin:'0px 0px -100px 0px'});avatarObserver.observe(avatarWrap);}}

function init(){setYear();setHeaderOffset();window.addEventListener('resize',debounce(setHeaderOffset,200));window.addEventListener('orientationchange',setHeaderOffset);initNav();initSmoothScroll();initProgress();initTabs();initProjectModal();initExperienceModal();initContactForm();initAnimations();preload();scrollToHero();initSplashScreen();initScrollAnimations();}

// More robust initialization for both file:// and http:// environments
function initializeApp(){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    // If DOM is already loaded, wait a bit to ensure all elements are available
    setTimeout(init, 50);
  }
}

initializeApp();


