/* TRANSITION SYSTEM - PC TOP / 伝助 共通導線・タスクバー設定
 * 基準: PC TOP V13, 統合テスト V14, 伝助 V4
 * 保存版。変更時は新しい版名を作り、承認済みの本ファイルを上書きしない。
 * このファイルだけでは既存HTMLのリンクは変わらない。HTML側の読み込み・適用が必要。
 */
(function(root){
'use strict';
var routes=Object.freeze({
 top:'/PC_TOP_PLUS_ONE表示統一テストV25.html',
 home:'/PC版FXの入口_下部表示ここに戻る保存版V2.html',
 project:'/PC_伝助_共通導線設定接続テストV5.html',
 community:'/PC_コミュニティ_共通タスクバー移植テストV1.html',
 broker:'/PC_証券会社_共通タスクバー移植テストV1.html',
 qa:'/PC_管理人QA_共通タスクバー移植テストV1.html',
 system:'/PC_SYSTEM_共通タスクバー統一修正テストV2.html',
 board:'/PC_BOARD_共通タスクバー移植テストV1.html',
 login:'/PC_LOGIN_共通タスクバー移植テストV1.html',
 plusOne:'/PC_PLUS_ONE_タスクバー表示統一テストV3.html'
});
var topButtons=Object.freeze([
 Object.freeze({id:'home',label:'FXの入口',href:routes.home}),
 Object.freeze({id:'project',label:'伝助のインジケータ',href:routes.project}),
 Object.freeze({id:'broker',label:'証券会社',href:routes.broker}),
 Object.freeze({id:'qa',label:'管理人Q&A',href:routes.qa}),
 Object.freeze({id:'system',label:'SYSTEM',href:routes.system}),
 Object.freeze({id:'board',label:'BOARD',href:routes.board}),
 Object.freeze({id:'login',label:'LOGIN',href:routes.login}),
 Object.freeze({id:'plusOne',label:'PLUS ONE',href:routes.plusOne})
]);
var densukeTaskbar=Object.freeze({
 logo:{label:'TRANSITION SYSTEM',action:'return-to-retained-top',standaloneHref:routes.top},
 replace:{oldEnglish:'TOOLS',oldJapanese:'ツール',newEnglish:'PLUS ONE',newJapanese:'プラスワン',href:routes.plusOne}
});
root.TRANSITION_PC_NAV_V12=Object.freeze({
 version:'12',baseline:'11_19PC_TOP_ここに戻る基準保存版V13.html',
 routes:routes,topButtons:topButtons,densukeTaskbar:densukeTaskbar,
 returnMessage:Object.freeze({source:'iphone-densuke-v3',type:'top'})
});
})(window);
