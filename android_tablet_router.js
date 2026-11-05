(function(){
 'use strict';
 if(window.__TS_TABLET_ROUTER_V1__)return;
 window.__TS_TABLET_ROUTER_V1__=true;
 var ROUTES={
  top:'/android_tablet_saved_top_20261105_%E3%81%93%E3%81%93%E3%81%AB%E6%88%BB%E3%82%8BV2.html',
  home:'/android_tablet_home_v6_wrapper.html?tablet_home_saved_V6_direct=20261105',
  project:'/android_tablet_project_saved.html?tablet=20261103v2'
 };
 function pathOf(url){try{return decodeURIComponent(url.pathname||'').toLowerCase()}catch(e){return (url.pathname||'').toLowerCase()}}
 function routeFor(a,u){
  var p=pathOf(u), label=((a.textContent||'')+' '+(a.getAttribute('aria-label')||'')+' '+(a.getAttribute('title')||'')).toLowerCase();
  if(p==='/'||p.endsWith('/index.html')||p.indexOf('android_tablet_top')>=0||p.indexOf('android_start')>=0||label.indexOf('topページへ')>=0||label.indexOf('topページに戻る')>=0)return 'top';
  if(p.indexOf('android_tablet_home_v6_preview_direct_v2_20261105.html')>=0)return null;
  if(p.endsWith('/home.html')||p.indexOf('transition_system_home_')>=0||p.indexOf('android_tablet_home')>=0||label.indexOf('home')>=0||label.indexOf('ホーム')>=0)return 'home';
  if(p.endsWith('/project.html')||p.indexOf('android_tablet_project')>=0||label.indexOf('伝助')>=0)return 'project';
  return null;
 }
 document.addEventListener('click',function(ev){
  var a=ev.target&&ev.target.closest?ev.target.closest('a[href]'):null;
  if(!a)return;
  var raw=a.getAttribute('href')||'';
  if(!raw||raw.charAt(0)==='#'||/^(mailto:|tel:|javascript:)/i.test(raw))return;
  var u;try{u=new URL(raw,document.baseURI)}catch(e){return}
  if(u.origin!==location.origin)return;
  var key=routeFor(a,u);if(!key)return;
  ev.preventDefault();ev.stopPropagation();
  window.top.location.replace(ROUTES[key]);
 },true);
})();