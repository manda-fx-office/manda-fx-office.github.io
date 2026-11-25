// TRANSITION SYSTEM - script.js
// 動きは全部このファイルで管理する。下位ページでも共通で読み込むため、
// 要素が無いページでは何も起きないよう、すべて存在チェックをしてから動かす。

// フッターの年を自動表示
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// BGMボタン：audio/bgm.mp3（MusMus）をループ再生／停止する
// 音源はボタンを押したときだけ読み込む（ページ表示を重くしないため）
const bgmButton = document.getElementById("bgmButton");
if (bgmButton) {
let bgmAudio = null;
bgmButton.addEventListener("click", async () => {
if (!bgmAudio) {
bgmAudio = new Audio("audio/bgm.mp3");
bgmAudio.loop = true;
}
if (bgmAudio.paused) {
try {
await bgmAudio.play();
bgmButton.textContent = "♪ BGM STOP";
} catch (e) {
bgmButton.textContent = "♪ BGM START";
}
} else {
bgmAudio.pause();
bgmButton.textContent = "♪ BGM START";
}
});
}

// コミュニティー投稿例の窓（戻る／次へ、1 / 8 表示）
// 投稿データはここだけを編集すればよい。本番の投稿に差し替える。
const posts = [
{ title: "本能寺の変＝蜘蛛の糸｜本編・フルストーリー", body: "コミュニティー投稿例です。本文はここに表示されます。"},
{ title: "本能寺の変＝運命の分かれ道", body: "コミュニティー投稿例です。本文はここに表示されます。"},
{ title: "投稿例 3", body: "元の掲示板の投稿は、ここへ移行します。"},
{ title: "投稿例 4", body: "元の掲示板の投稿は、ここへ移行します。"},
{ title: "投稿例 5", body: "元の掲示板の投稿は、ここへ移行します。"},
{ title: "投稿例 6", body: "元の掲示板の投稿は、ここへ移行します。"},
{ title: "投稿例 7", body: "元の掲示板の投稿は、ここへ移行します。"},
{ title: "投稿例 8", body: "元の掲示板の投稿は、ここへ移行します。"},
];
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const postPage = document.getElementById("postPage");
const postPrev = document.getElementById("postPrev");
const postNext = document.getElementById("postNext");
if (postTitle && postBody && postPage && postPrev && postNext) {
let idx = 0;
const render = () => {
postTitle.textContent = posts[idx].title;
postBody.textContent = posts[idx].body;
postPage.textContent = (idx + 1) + " / " + posts.length;
postPrev.disabled = idx === 0;
postNext.disabled = idx === posts.length - 1;
};
postPrev.addEventListener("click", () => { if (idx > 0) { idx--; render();}});
postNext.addEventListener("click", () => { if (idx < posts.length - 1) { idx++; render();}});
render();
}

// Information checkボタン：下の窓にお知らせを表示する
const infoButton = document.getElementById("infoButton");
const infoText = document.getElementById("infoText");
if (infoButton && infoText) {
infoButton.addEventListener("click", () => {
const now = new Date();
const ymd = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
infoText.textContent = ymd + " 現在、新しいお知らせはありません。お知らせの文面は script.js のこの部分を編集して差し替えます。";
});
}

// URLをコピー
const copyButton = document.getElementById("copyButton");
const siteUrl = document.getElementById("siteUrl");
if (copyButton && siteUrl) {
copyButton.addEventListener("click", async () => {
try {
await navigator.clipboard.writeText(siteUrl.textContent.trim());
copyButton.textContent = "コピーしました";
setTimeout(() => { copyButton.textContent = "URLをコピー";}, 2000);
} catch (e) {
copyButton.textContent = "コピーできませんでした";
}
});
}
