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

// Information check：データファイル info.json を読み込んで窓に表示する
// info.json を差し替えると、窓の表示が同期される
const infoButton = document.getElementById("infoButton");
const infoTitle = document.getElementById("infoTitle");
const infoUpdated = document.getElementById("infoUpdated");
const infoBody = document.getElementById("infoBody");
function loadInfo() {
if (!infoBody) return;
fetch("info.json?t=" + Date.now())
.then((r) => { if (!r.ok) throw new Error("info"); return r.json(); })
.then((d) => {
if (infoTitle) infoTitle.textContent = d.title || "Information";
if (infoUpdated) infoUpdated.textContent = d.updated ? "更新：" + d.updated : "";
infoBody.textContent = d.body || "";
})
.catch(() => {
if (infoTitle) infoTitle.textContent = "Information";
infoBody.textContent = "現在、新しいお知らせはありません。";
});
}
if (infoBody) loadInfo();
if (infoButton) infoButton.addEventListener("click", () => { loadInfo(); loadStrength(); });

// 通貨強弱グラフ：strength.json（1時間ごとに自動更新）を読み込んで描く
const STRENGTH_COLORS = { USD: "#e5e7eb", EUR: "#4da3ff", GBP: "#c084fc", JPY: "#ffd83d", AUD: "#34d399", NZD: "#2dd4bf", CAD: "#fb923c", CHF: "#f87171" };
const STRENGTH_ORDER = ["USD", "EUR", "GBP", "JPY", "AUD", "NZD", "CAD", "CHF"];
function loadStrength() {
const canvas = document.getElementById("strengthChart");
const latestBox = document.getElementById("strengthLatest");
if (!canvas || !latestBox) return;
fetch("strength.json?t=" + Date.now())
.then((r) => { if (!r.ok) throw new Error("strength"); return r.json(); })
.then((d) => {
const points = (d.points || []).filter((p) => p && p.scores);
if (!points.length) { latestBox.textContent = "通貨強弱データは準備中です。"; return; }
// 最新ランキング（強い順）
const last = points[points.length - 1];
const ranking = STRENGTH_ORDER.slice().sort((a, b) => (last.scores[b] || 0) - (last.scores[a] || 0));
latestBox.innerHTML = "最新（" + last.time + "）強い順：<br>" + ranking.map((c) => {
const v = last.scores[c] || 0;
return "<span style=\"color:" + STRENGTH_COLORS[c] + "\">●</span> " + c + " " + (v >= 0 ? "+" : "") + v.toFixed(2);
}).join("　");
// グラフ描画
const dpr = window.devicePixelRatio || 1;
const W = canvas.clientWidth || 600;
const H = 220;
canvas.width = W * dpr;
canvas.height = H * dpr;
const ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);
const padL = 34, padR = 8, padT = 10, padB = 22;
const iw = W - padL - padR, ih = H - padT - padB;
let maxAbs = 0.1;
points.forEach((p) => STRENGTH_ORDER.forEach((c) => { maxAbs = Math.max(maxAbs, Math.abs(p.scores[c] || 0)); }));
const x = (i) => padL + (points.length === 1 ? iw / 2 : (iw * i) / (points.length - 1));
const y = (v) => padT + ih / 2 - (v / maxAbs) * (ih / 2);
ctx.strokeStyle = "rgba(255,255,255,0.35)";
ctx.fillStyle = "rgba(255,255,255,0.55)";
ctx.font = "10px sans-serif";
ctx.beginPath(); ctx.moveTo(padL, y(0)); ctx.lineTo(W - padR, y(0)); ctx.stroke();
ctx.fillText("+" + maxAbs.toFixed(2), 2, y(maxAbs) + 3);
ctx.fillText("-" + maxAbs.toFixed(2), 2, y(-maxAbs) + 3);
ctx.fillText(points[0].time, padL, H - 6);
const lastLabel = points[points.length - 1].time;
ctx.fillText(lastLabel, W - padR - ctx.measureText(lastLabel).width, H - 6);
STRENGTH_ORDER.forEach((c) => {
ctx.strokeStyle = STRENGTH_COLORS[c];
ctx.lineWidth = 1.6;
ctx.beginPath();
points.forEach((p, i) => { const px = x(i), py = y(p.scores[c] || 0); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
ctx.stroke();
});
})
.catch(() => { latestBox.textContent = "通貨強弱データは準備中です。"; });
}
loadStrength();

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
