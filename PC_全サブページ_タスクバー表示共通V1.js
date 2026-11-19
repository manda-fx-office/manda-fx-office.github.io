/* V25 work-in-progress: one BOARD-style taskbar per non-TOP page. */
(function(){
'use strict';
var root=document;
var route={
 top:'/PC_TOP_PLUS_ONE表示統一テストV25.html',
 system:'/PC_SYSTEM_共通タスクバー統一修正テストV2.html',
 project:'/PC_伝助_共通導線設定接続テストV5.html',
 community:'/PC_コミュニティ_共通タスクバー移植テストV1.html',
 board:'/PC_BOARD_共通タスクバー移植テストV1.html',
 plusOne:'/PC_PLUS_ONE_タスクバー表示統一テストV3.html',
 qa:'/PC_管理人QA_共通タスクバー移植テストV1.html',
 login:'/PC_LOGIN_共通タスクバー移植テストV1.html'
};
var buttons=[['system','SYSTEM','システム'],['project','伝助のインジケーター','伝助のインジケーター'],['community','COMMUNITY','コミュニティー'],['board','BOARD','伝言板'],['plusOne','PLUS ONE','プラスワン'],['qa','管理人 Q&A','管理人 Q&A'],['login','LOGIN','ログイン']];
var style=`
#ts-unified-taskbar{position:sticky!important;top:0!important;z-index:2147483000!important;width:100%!important;box-sizing:border-box!important;background:rgba(4,4,4,.95)!important;border-bottom:1px solid #292d31!important;font-family:Arial,"Noto Sans JP",sans-serif!important}
#ts-unified-taskbar .ts-nav{max-width:1220px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:12px 18px;gap:18px;box-sizing:border-box}
#ts-unified-taskbar .ts-logo{display:block;flex:0 0 auto}#ts-unified-taskbar .ts-logo img{width:150px;height:auto;display:block}
#ts-unified-taskbar .ts-links{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
#ts-unified-taskbar .ts-links a{min-width:92px;height:54px;padding:6px 8px;box-sizing:content-box;border:1px solid rgba(210,215,220,.58);border-radius:8px;background:linear-gradient(180deg,#484f56,#30363c 55%,#20252a);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;color:#fff!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 2px 5px #0007;text-decoration:none!important}
#ts-unified-taskbar .ts-en{font-size:11px;font-weight:700;letter-spacing:.5px;line-height:1.1}
#ts-unified-taskbar .ts-ja{margin-top:4px;font-size:9px;letter-spacing:.5px;line-height:1.1}
body:has(> #ts-unified-taskbar) > header.topbar,body:has(> #ts-unified-taskbar) > .mobile-taskbar,body:has(> #ts-unified-taskbar) > header.mobile-taskbar{display:none!important}
@media(max-width:900px){#ts-unified-taskbar .ts-nav{flex-wrap:wrap;justify-content:center;padding:10px 12px;gap:8px}#ts-unified-taskbar .ts-logo img{width:135px}#ts-unified-taskbar .ts-links{gap:4px}#ts-unified-taskbar .ts-links a{min-width:75px;height:48px;padding:4px 6px}#ts-unified-taskbar .ts-en{font-size:10px}#ts-unified-taskbar .ts-ja{font-size:8px}}
`;
function install(d){
 try{
 if(!d||!d.body||!d.head||d.getElementById('ts-unified-taskbar'))return;
 var st=d.createElement('style');st.id='ts-unified-taskbar-style';st.textContent=style;d.head.appendChild(st);
 var bar=d.createElement('header');bar.id='ts-unified-taskbar';
 var nav=d.createElement('nav');nav.className='ts-nav';
 var logo=d.createElement('a');logo.className='ts-logo';logo.href=route.top;logo.setAttribute('aria-label','TOPへ戻る');
 var img=d.createElement('img');img.src='/logo.png';img.alt='TRANSITION SYSTEM';logo.appendChild(img);nav.appendChild(logo);
 var links=d.createElement('div');links.className='ts-links';
 buttons.forEach(function(b){var a=d.createElement('a');a.href=route[b[0]];a.dataset.tsPage=b[0];var en=d.createElement('span');en.className='ts-en';en.textContent=b[1];var ja=d.createElement('span');ja.className='ts-ja';ja.textContent=b[2];a.appendChild(en);a.appendChild(ja);links.appendChild(a)});
 nav.appendChild(links);bar.appendChild(nav);d.body.insertBefore(bar,d.body.firstChild);
 bar.addEventListener('click',function(e){
 var a=e.target.closest('a');if(!a)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 var type=a.dataset.tsPage||'top';
 if(window.parent!==window){window.parent.postMessage({source:'iphone-densuke-v3',type:type},location.origin)}
 else if(d.defaultView&&d.defaultView.parent!==d.defaultView){d.defaultView.parent.postMessage({source:'iphone-densuke-v3',type:type},location.origin)}
 else window.location.assign(route[type]);
 },true);
 }catch(e){console.warn('unified taskbar',e)}
}
function scan(){
 var frames=root.querySelectorAll('iframe');
 if(!frames.length){install(root);return}
 var isDensuke=!!root.getElementById('project') && /PC_伝助_共通導線設定接続テストV5/.test(location.pathname);
 if(isDensuke){
   install(root);
   if(!root.getElementById('ts-densuke-frame-separation')){
     var st=root.createElement('style');st.id='ts-densuke-frame-separation';
     st.textContent='html,body{height:100%!important;overflow:hidden!important}body{display:flex!important;flex-direction:column!important}body>#ts-unified-taskbar{position:relative!important;flex:0 0 auto!important}body>#project{flex:1 1 auto!important;min-height:0!important;height:auto!important;width:100%!important;display:block!important}';
     root.head.appendChild(st);
   }
   frames.forEach(function(f){try{
     var d=f.contentDocument;if(d&&d.head&&!d.getElementById('ts-densuke-hide-inner-bar')){
       var hide=d.createElement('style');hide.id='ts-densuke-hide-inner-bar';
       hide.textContent='body>header.topbar,body>.mobile-taskbar,body>header.mobile-taskbar,body>#ts-unified-taskbar{display:none!important}body{padding-top:0!important}';
       d.head.appendChild(hide);
     }
     if(!f.dataset.tsUnifiedListener){f.dataset.tsUnifiedListener='1';f.addEventListener('load',scan)}
   }catch(e){}});
   return;
 }
 frames.forEach(function(f){try{install(f.contentDocument);if(!f.dataset.tsUnifiedListener){f.dataset.tsUnifiedListener='1';f.addEventListener('load',function(){install(f.contentDocument)})}}catch(e){}});
}
scan();
new MutationObserver(scan).observe(root.documentElement,{childList:true,subtree:true});
})();
