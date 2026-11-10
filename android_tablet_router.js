(function(){
 'use strict';
 if(window.__TS_TABLET_ROUTER_V2__)return;
 window.__TS_TABLET_ROUTER_V2__=true;
 var ROUTES={
  top:'/android_tablet_saved_top_20261105_%E3%81%93%E3%81%93%E3%81%AB%E6%88%BB%E3%82%8BV2.html',
  home:'/android_tablet_HOME_test_20261106.html?tablet-home-copy=20261106-test-v2',
  project:'/伝助のインジケータ_ここに戻る_V1.html?restore=1813-densuke-v1'
 };
 function pathOf(url){try{return decodeURIComponent(url.pathname||'').toLowerCase()}catch(e){return (url.pathname||'').toLowerCase()}}
 function routeFor(el,u){
  var p=u?pathOf(u):'';
  var label=((el.textContent||'')+' '+(el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')).replace(/\s+/g,' ').toLowerCase();
  if(label.indexOf('topページへ')>=0||label.indexOf('topページに戻る')>=0)return 'top';
  if(label.indexOf('home')>=0||label.indexOf('ホーム')>=0||label.indexOf('fxの入口')>=0)return 'home';
  if(label.indexOf('伝助')>=0)return 'project';
  if(!u)return null;
  if(p==='/'||p.endsWith('/index.html')||p.indexOf('android_tablet_top')>=0||p.indexOf('android_start')>=0)return 'top';
  if(p.indexOf('android_tablet_home_v6_preview_direct_v2_20261105.html')>=0)return null;
  if(p.endsWith('/home.html')||p.indexOf('transition_system_home_')>=0||p.indexOf('android_tablet_home')>=0)return 'home';
  if(p.endsWith('/project.html')||p.indexOf('android_tablet_project')>=0)return 'project';
  return null;
 }
 // Rename only the TOP page HOME navigation button; preserve its destination.
 function renameTopHomeButton(){
  var path='';try{path=decodeURIComponent(location.pathname)}catch(e){path=location.pathname}
  if(path.indexOf('android_tablet_saved_top_')<0)return;
  document.querySelectorAll('a,button,[role="button"]').forEach(function(el){
   var label=(el.textContent||'').replace(/\\s+/g,' ').trim();
   if(label!=='HOME' && label!=='HOMEページ')return;
   var nodes=[];var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null);
   while(walker.nextNode())nodes.push(walker.currentNode);
   var changed=false;
   nodes.forEach(function(n){if(/HOME/.test(n.nodeValue||'')){n.nodeValue=n.nodeValue.replace(/HOME(?:ページ)?/g,'FXの入口');changed=true;}});
   if(changed)el.setAttribute('aria-label','FXの入口');
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renameTopHomeButton);
 else renameTopHomeButton();
 document.addEventListener('click',function(ev){
  var el=ev.target&&ev.target.closest?ev.target.closest('a,button,[role="button"]'):null;
  if(!el)return;
  var raw=el.getAttribute('href')||'';
  var u=null;
  if(raw&&!/^(mailto:|tel:|javascript:)/i.test(raw)){
   try{u=new URL(raw,document.baseURI)}catch(e){}
   if(u&&u.origin!==location.origin)return;
  }
  var key=routeFor(el,u);
  if(!key)return;
  ev.preventDefault();ev.stopPropagation();
  window.top.location.replace(ROUTES[key]);
 },true);
})();