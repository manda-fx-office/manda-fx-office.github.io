/* V25-only taskbar display unification; original page files remain unchanged. */
(function(){
'use strict';
var cfg=window.TRANSITION_PC_NAV_V12;if(!cfg)return;
var items=[['system','SYSTEM','システム'],['project','伝助のインジケーター','伝助のインジケーター'],['community','COMMUNITY','コミュニティー'],['board','BOARD','伝言板'],['plusOne','PLUS ONE','プラスワン'],['qa','管理人 Q&A','管理人 Q&A'],['login','LOGIN','ログイン']];
var css='.v25-unified-bar{position:sticky!important;top:0!important;z-index:2147483000!important;width:100%!important;box-sizing:border-box!important;background:rgba(4,4,4,.95)!important;border-bottom:1px solid #292d31!important;font-family:Arial,sans-serif!important}.v25-unified-bar .v25-nav{max-width:1220px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:12px 18px;gap:18px}.v25-unified-bar .v25-logo{flex:0 0 auto;display:block}.v25-unified-bar .v25-logo img{width:150px;height:auto;display:block}.v25-unified-bar .v25-links{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.v25-unified-bar .v25-links a{box-sizing:content-box;min-width:92px;height:54px;padding:6px 8px;border:1px solid rgba(210,215,220,.58);border-radius:8px;background:linear-gradient(180deg,#484f56,#30363c 55%,#20252a);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-decoration:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 2px 5px #0007}.v25-unified-bar .v25-en{font-size:11px;font-weight:700;letter-spacing:.5px;line-height:1.1}.v25-unified-bar .v25-ja{font-size:9px;margin-top:4px;letter-spacing:.5px;line-height:1.1}@media(max-width:900px){.v25-unified-bar .v25-nav{flex-wrap:wrap;justify-content:center;padding:10px 12px}.v25-unified-bar .v25-logo img{width:135px}.v25-unified-bar .v25-links{gap:4px}.v25-unified-bar .v25-links a{min-width:75px;height:48px;padding:4px 6px}.v25-unified-bar .v25-en{font-size:10px}.v25-unified-bar .v25-ja{font-size:8px}}';
function apply(d){
 try{
 if(!d||!d.body||!d.head||d.getElementById('v25-unified-bar'))return;
 var old=d.querySelector('header.topbar,.mobile-taskbar,header.taskbar,.taskbar');
 if(!old)return;
 var st=d.createElement('style');st.id='v25-unified-style';st.textContent=css;d.head.appendChild(st);
 var bar=d.createElement('header');bar.id='v25-unified-bar';bar.className='v25-unified-bar';
 var nav=d.createElement('nav');nav.className='v25-nav';
 var logo=d.createElement('a');logo.className='v25-logo';logo.href=cfg.routes.top;logo.setAttribute('aria-label','TOPへ戻る');
 var img=d.createElement('img');img.src='/logo.png';img.alt='TRANSITION SYSTEM';logo.appendChild(img);
 var links=d.createElement('div');links.className='v25-links';
 items.forEach(function(it){var a=d.createElement('a');a.href=cfg.routes[it[0]];var en=d.createElement('span');en.className='v25-en';en.textContent=it[1];var ja=d.createElement('span');ja.className='v25-ja';ja.textContent=it[2];a.append(en,ja);links.appendChild(a)});
 nav.append(logo,links);bar.appendChild(nav);
 var prev=old.style.display;old.style.setProperty('display','none','important');
 old.parentNode.insertBefore(bar,old);
 bar.addEventListener('click',function(e){
 var a=e.target.closest('a');if(!a)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 if(a===logo){if(typeof window.__iphoneReturnToLoadedTop==='function')window.__iphoneReturnToLoadedTop();return;}
 var key=items.find(function(it){return cfg.routes[it[0]]===a.getAttribute('href')});
 if(key&&typeof window.__v25Navigate==='function')window.__v25Navigate(key[0]);
 else window.location.assign(a.href);
 },true);
 }catch(e){console.warn('V25 unified taskbar',e)}
}
function scan(f,depth){
 if(depth>3)return;
 try{var d=f.contentDocument;if(!d)return; if(f.id!=='tablet-page')apply(d);
 d.querySelectorAll('iframe').forEach(function(child){scan(child,depth+1);if(!child.__v25TaskbarListener){child.__v25TaskbarListener=true;child.addEventListener('load',function(){scan(child,depth+1)})}});
 }catch(e){}
}
function init(){
 document.querySelectorAll('iframe').forEach(function(f){scan(f,0);if(!f.__v25TaskbarListener){f.__v25TaskbarListener=true;f.addEventListener('load',function(){scan(f,0)})}});
}
new MutationObserver(init).observe(document.body,{childList:true,subtree:false});init();
})();
