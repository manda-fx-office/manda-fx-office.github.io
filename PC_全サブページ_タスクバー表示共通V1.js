/* PC subpages shared taskbar - 11/20 V2, test branch only. */
(function(){
'use strict';
var top='/11_20TOP_全ページ導線統合テストV3.html';
var paths={system:'/PC_SYSTEM_共通タスクバー統一修正テストV2.html',project:'/PC_伝助_共通導線設定接続テストV5.html',community:'/PC_コミュニティ_共通タスクバー移植テストV1.html',board:'/PC_BOARD_共通タスクバー移植テストV1.html',plusOne:'/PC_PLUS_ONE_タスクバー表示統一テストV3.html',qa:'/PC_管理人QA_共通タスクバー移植テストV1.html',login:'/PC_LOGIN_共通タスクバー移植テストV1.html'};
var labels=[['system','SYSTEM','システム'],['project','伝助のインジケーター','伝助のインジケーター'],['community','COMMUNITY','コミュニティー'],['board','BOARD','伝言板'],['plusOne','PLUS ONE','プラスワン'],['qa','管理人 Q&A','管理人 Q&A'],['login','LOGIN','ログイン']];
function topClick(e){e.preventDefault();e.stopImmediatePropagation();if(window.parent!==window){window.parent.postMessage({source:'iphone-densuke-v3',type:'top'},location.origin)}else window.location.assign(top)}
function apply(d){
 try{
 if(!d||!d.body)return;
 var nav=d.querySelector('.topbar .navlinks');
 if(!nav)return;
 if(!nav.dataset.pc1120V2){nav.dataset.pc1120V2='1';nav.replaceChildren();labels.forEach(function(it){var a=d.createElement('a');a.href=paths[it[0]];var en=d.createElement('span'),ja=d.createElement('span');en.className='nav-en';ja.className='nav-ja';en.textContent=it[1];ja.textContent=it[2];a.append(en,ja);nav.appendChild(a)});}
 var logos=d.querySelectorAll('.topbar a.brand-logo,.topbar a[aria-label*="TOP"],.mobile-taskbar a.brand-logo');
 logos.forEach(function(a){a.href=top;a.removeAttribute('target');if(!a.dataset.pc1120Logo){a.dataset.pc1120Logo='1';a.addEventListener('click',topClick,true)}});
 if(!d.getElementById('pc-1120-taskbar-style')){var css=d.createElement('style');css.id='pc-1120-taskbar-style';css.textContent='.topbar .navlinks{display:flex!important;flex-wrap:wrap!important;gap:6px!important;justify-content:center!important}.topbar .navlinks a{min-width:85px!important;min-height:50px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;text-align:center!important}.topbar .nav{display:flex!important;align-items:center!important;flex-wrap:wrap!important;justify-content:center!important;gap:12px!important}@media(max-width:800px){.topbar .navlinks a{min-width:72px!important;min-height:46px!important}}';d.head.appendChild(css)}
 }catch(e){console.warn('PC taskbar V2',e)}
}
function run(){apply(document);document.querySelectorAll('iframe').forEach(function(f){try{apply(f.contentDocument);if(!f.dataset.pc1120Bound){f.dataset.pc1120Bound='1';f.addEventListener('load',function(){apply(f.contentDocument);setTimeout(function(){apply(f.contentDocument)},250)})}}catch(e){}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
