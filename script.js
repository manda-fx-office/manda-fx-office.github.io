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
// 投稿例はコミュニティーページの投稿例と同期：index.html内の post-card を差し替える
const postCards = document.querySelectorAll("[data-post-card]");
const postPage = document.getElementById("postPage");
const postPrev = document.getElementById("postPrev");
const postNext = document.getElementById("postNext");
if (postCards.length && postPage && postPrev && postNext) {
let idx = 0;
const render = () => {
postCards.forEach((c, i) => { c.style.display = i === idx ? "block" : "none"; });
postPage.textContent = (idx + 1) + " / " + postCards.length;
postPrev.disabled = idx === 0;
postNext.disabled = idx === postCards.length - 1;
const w = document.getElementById("postWindow");
if (w) w.scrollTop = 0;
};
postPrev.addEventListener("click", () => { if (idx > 0) { idx--; render(); }});
postNext.addEventListener("click", () => { if (idx < postCards.length - 1) { idx++; render(); }});
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
