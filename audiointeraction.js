const container = document.querySelector("#samples");
document.querySelector("#count").textContent = `${aiSamples.length} scenarios`;

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (t, d) => `${Math.max(0, Math.min(100, (t / d) * 100)).toFixed(2)}%`;
const OUTCOME = {
  hit: "answered", early: "too early (mid-question)", interrupt: "interrupted the question",
  late: "late", false: "replied to something it should ignore", other: "unclear",
};

const player = (src, label) => `
  <div class="player">
    <button class="play" type="button" aria-label="Play ${esc(label)}">▶</button>
    <input class="progress" type="range" min="0" max="100" step="0.1" value="0" aria-label="Audio progress" />
    <span class="time">0:00</span>
    <audio preload="none" src="${src}"></audio>
  </div>`;

const strip = (sample, track) => {
  const d = sample.duration;
  const items = sample.items.map(it => {
    const cls = it.item === "noise clip" ? "noise" : it.todo === "answer" ? "answer" : it.todo === "wait" ? "wait" : "silent";
    return `<span class="seg seg-${cls}" style="left:${pct(it.s, d)};width:${pct(it.e - it.s, d)}" title="${esc(it.item)}: ${esc(it.text)}"></span>`;
  }).join("");
  const marks = track.replies.map(r =>
    `<span class="mark ${r.outcome === "hit" ? "mark-hit" : "mark-wrong"}" style="left:${pct(r.t, d)}" title="${r.t.toFixed(1)} s: ${esc(OUTCOME[r.outcome] || r.outcome)}"></span>`
  ).join("");
  return `<div class="strip" data-duration="${d}" role="slider" aria-label="Timeline">${items}${marks}<span class="playhead"></span></div>`;
};

const seek = t => `<button class="seek" type="button" data-t="${t}">${t.toFixed(1)} s</button>`;

const replyList = track => {
  const rows = track.replies.map(r => {
    const lat = r.outcome === "hit" && r.lat != null ? ` (${r.lat >= 0 ? "+" : ""}${r.lat.toFixed(2)} s after the question)` : "";
    return `<li class="${r.outcome === "hit" ? "ok" : "bad"}">${seek(r.t)} <span class="outcome">${esc(OUTCOME[r.outcome] || r.outcome)}${lat}</span>
      <span class="during">during ${esc(r.during)}</span><q>${esc(r.text)}</q></li>`;
  });
  rows.push(...track.missed.map(m =>
    `<li class="miss">${seek(m.t)} <span class="outcome">missed this question</span>
      <span class="during">highest P(speak) ${m.pmax.toFixed(2)}</span></li>`));
  return rows.length ? `<ul class="replies">${rows.join("")}</ul>` : `<p class="silent-note">Never spoke.</p>`;
};

container.innerHTML = aiSamples.map((s, i) => `
  <section class="sample" id="${s.id}">
    <header class="sample-head">
      <span class="sample-number">${String(i + 1).padStart(2, "0")} / ${aiSamples.length}</span>
      <h2>${esc(s.title)}</h2>
      <span class="lang">${s.lang === "en" ? "English" : "Hokkien"} · ${s.duration} s</span>
    </header>
    <p class="sample-note">${esc(s.note)}</p>
    <details class="script" open>
      <summary>What it hears</summary>
      <table>
        <thead><tr><th>time</th><th>item</th><th>should</th><th>said</th></tr></thead>
        <tbody>${s.items.map(it => `<tr>
          <td class="num">${it.s.toFixed(1)}–${it.e.toFixed(1)}</td><td>${esc(it.item)}</td><td>${esc(it.todo)}</td>
          <td>${it.text ? `<span lang="${s.lang === "hok" ? "nan-Hant" : "en"}">${esc(it.text)}</span>` : "<span class='muted'>(noise)</span>"}
          ${it.en ? `<span class="gloss">${esc(it.en)}</span>` : ""}</td></tr>`).join("")}</tbody>
      </table>
    </details>
    <div class="ai-tracks">
      ${s.tracks.map(t => `
      <div class="ai-track" data-sample="${s.id}">
        <div class="ai-track-head">
          <span class="track-index">${esc(t.label)}</span>
          <span class="score ${t.targets && t.hits === t.targets ? "score-ok" : "score-bad"}">${t.hits}/${t.targets} answered</span>
        </div>
        <p class="track-note">${esc(t.desc)}</p>
        ${player(t.audio, t.label)}
        ${t.sent ? `<div class="sent"><span class="track-index">what the gate sent to the model</span>${player(t.sent, "what the demo sent")}</div>` : ""}
        ${strip(s, t)}
        ${replyList(t)}
      </div>`).join("")}
    </div>
  </section>`).join("");

let activeAudio;
const fmt = sec => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

document.querySelectorAll(".ai-track").forEach(trackNode => {
  const audios = [...trackNode.querySelectorAll("audio")];
  const main = audios[0];
  const head = trackNode.querySelector(".playhead");
  const stripNode = trackNode.querySelector(".strip");
  const dur = parseFloat(stripNode.dataset.duration);

  trackNode.querySelectorAll(".player").forEach(node => {
    const audio = node.querySelector("audio");
    const button = node.querySelector(".play");
    const progress = node.querySelector(".progress");
    const time = node.querySelector(".time");
    audio.addEventListener("play", () => { button.textContent = "Ⅱ"; button.classList.add("playing"); });
    audio.addEventListener("pause", () => { button.textContent = "▶"; button.classList.remove("playing"); });
    audio.addEventListener("timeupdate", () => {
      progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      time.textContent = fmt(audio.currentTime);
      head.style.left = pct(audio.currentTime, dur);
    });
    audio.addEventListener("ended", () => { audio.currentTime = 0; });
    progress.addEventListener("input", () => { if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration; });
  });

  const playAt = t => {
    if (activeAudio && activeAudio !== main) activeAudio.pause();
    const go = () => { main.currentTime = Math.max(0, t - 1); main.play(); activeAudio = main; };
    if (main.readyState >= 1) go(); else { main.preload = "auto"; main.addEventListener("loadedmetadata", go, { once: true }); main.load(); }
  };
  stripNode.addEventListener("click", e => {
    const box = stripNode.getBoundingClientRect();
    playAt(((e.clientX - box.left) / box.width) * dur + 1);
  });
  trackNode.querySelectorAll(".seek").forEach(b => b.addEventListener("click", () => playAt(parseFloat(b.dataset.t))));
});

document.addEventListener("click", event => {
  const button = event.target.closest(".play");
  if (!button) return;
  const audio = button.closest(".player").querySelector("audio");
  if (activeAudio && activeAudio !== audio) activeAudio.pause();
  if (audio.paused) { audio.play(); activeAudio = audio; } else { audio.pause(); }
});

const scrollLine = document.querySelector(".scroll-line");
window.addEventListener("scroll", () => {
  const range = document.documentElement.scrollHeight - innerHeight;
  scrollLine.style.width = `${range ? (scrollY / range) * 100 : 0}%`;
}, { passive: true });
