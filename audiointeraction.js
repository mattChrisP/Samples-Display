const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pct = (t, d) => `${Math.max(0, Math.min(100, (t / d) * 100)).toFixed(2)}%`;
const OUTCOME = {
  hit: "replied on time", early: "too early (mid-question)", interrupt: "interrupted the question",
  late: "late", false: "replied to something it should ignore", other: "unclear",
};
const LABEL = { answers: "correct", on_topic: "on topic", off_topic: "off topic", generic: "generic", empty: "empty" };
const labelTag = l => (l ? `<span class="label label-${l}">${LABEL[l] || l}</span>` : "");
const langAttr = lang => (lang === "hok" ? "nan-Hant" : "en");

document.querySelector("#count").textContent = `${aiSections.length} models`;

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

const replyList = (track, lang) => {
  const rows = track.replies.map(r => {
    const lat = r.outcome === "hit" && r.lat != null ? ` (${r.lat >= 0 ? "+" : ""}${r.lat.toFixed(2)} s)` : "";
    return `<li class="${r.outcome === "hit" ? "ok" : "bad"}">${seek(r.t)} <span class="outcome">${esc(OUTCOME[r.outcome] || r.outcome)}${lat}</span>
      ${labelTag(r.label)}<q lang="${langAttr(lang)}">${esc(r.text)}</q>${r.en ? `<span class="gloss">${esc(r.en)}</span>` : ""}</li>`;
  });
  rows.push(...track.missed.map(m => `<li class="miss">${seek(m.t)} <span class="outcome">no reply to this question</span></li>`));
  return rows.length ? `<ul class="replies">${rows.join("")}</ul>` : `<p class="silent-note">Never spoke.</p>`;
};

const stat = (n, label, cls, of) => `
  <div class="stat stat-${cls}"><span class="stat-n">${n}<span class="stat-of">/${of}</span></span><span class="stat-label">${label}</span></div>`;

const timingSummary = t => {
  const w = t.when;
  const wrong = t.counts.wrong + t.counts.missed;
  const parts = [t.counts.wrong && `${t.counts.wrong} off topic`, t.counts.missed && `${t.counts.missed} no reply on time`].filter(Boolean);
  return `<p class="stats-head">When it replies</p>
    <div class="stats">
      ${stat(w.on_time, `questions answered on time (median +${w.median_lat.toFixed(2)} s after the question ends)`, "answers", w.n)}
      ${stat(w.cut_in, "questions it talked into before they ended", "off_topic", w.n)}
      ${stat(w.ignored, "noise, fillers or other people's talk it replied to (should stay silent)", "off_topic", w.n_ignore)}
    </div>
    <p class="stats-note">Answered on time with noise instead of silence in the pauses: ${t.other.map(o => `${esc(o.desc)} ${o.hits}/${o.n}`).join(" · ")}.</p>
    <p class="stats-head">Is the reply right?</p>
    <div class="stats">
      ${stat(t.counts.correct, "correct", "answers", t.n)}
      ${stat(t.counts.on_topic, "on topic, wrong answer", "on_topic", t.n)}
      ${stat(wrong, `wrong${parts.length ? ` (${parts.join(", ")})` : ""}`, "off_topic", t.n)}
    </div>`;
};

const answersSummary = a => `<div class="stats">
    ${stat(a.counts.correct, "correct", "answers", a.n)}
    ${stat(a.counts.on_topic, "on topic, wrong answer", "on_topic", a.n)}
    ${stat(a.counts.wrong, "wrong (off topic)", "off_topic", a.n)}
  </div>`;

const timingExample = (s, verdict) => `
  <article class="sample ex" id="${s.id}">
    <header class="ex-head">
      <span class="label label-${verdict === "right" ? "answers" : "off_topic"}">${verdict === "right" ? "right" : "wrong"}</span>
      <h4>${esc(s.title)}</h4>
    </header>
    <p class="sample-note">${esc(s.note)}</p>
    ${s.excerpt ? `<p class="excerpt-note">Excerpt ${s.excerpt.s.toFixed(1)}–${s.excerpt.e.toFixed(1)} s of a ${s.excerpt.full} s stream; the model heard the whole stream.</p>` : ""}
    <details class="script">
      <summary>What it hears</summary>
      <table>
        <tbody>${s.items.map(it => `<tr>
          <td class="num">${it.s.toFixed(1)}–${it.e.toFixed(1)}</td><td>${esc(it.item)}</td>
          <td>${it.text ? `<span lang="${langAttr(s.lang)}">${esc(it.text)}</span>` : "<span class='muted'>(noise)</span>"}
          ${it.en && it.en !== it.text ? `<span class="gloss">${esc(it.en)}</span>` : ""}</td></tr>`).join("")}</tbody>
      </table>
    </details>
    <div class="ai-track">
      ${player(s.track.audio, s.title)}
      ${strip(s, s.track)}
      ${replyList(s.track, s.lang)}
    </div>
  </article>`;

const answerExample = (e, lang) => `
  <article class="qa">
    <p class="qa-q"><span lang="${langAttr(lang)}">${esc(e.q)}</span>${lang === "hok" ? `<span class="gloss">${esc(e.q_en)}</span>` : ""}</p>
    <p class="qa-ref"><span class="who">reference</span>${esc(e.ref)}</p>
    <ul class="qa-replies"><li>
      ${labelTag(e.label)}<span class="why">${esc(e.why)}</span>
      <q lang="${langAttr(lang)}">${esc(e.text)}</q>${e.en ? `<span class="gloss">${esc(e.en)}</span>` : ""}
    </li></ul>
  </article>`;

document.querySelector("#sections").innerHTML = aiSections.map((sec, i) => `
  <section class="model-section" id="${sec.id}">
    <h2><span class="sample-number">${String(i + 1).padStart(2, "0")}</span> ${esc(sec.title)}</h2>

    <div class="part">
      <p class="mode mode-online">Online</p>
      <h3>Streaming: it decides when to speak · ${sec.timing.n} questions, digital silence in the pauses</h3>
      ${timingSummary(sec.timing)}
      <div class="examples">
        ${sec.timing.examples.map((s, j) => timingExample(s, j < sec.timing.examples.length - 1 ? "right" : "wrong")).join("")}
      </div>
    </div>

    <div class="part">
      <p class="mode mode-offline">Offline</p>
      <h3>Reply forced at the end of each question · ${sec.answers.n} questions</h3>
      <p class="task-note"><strong>Task: spoken question answering (QA).</strong> It hears the same spoken question, in the same
        streaming layout, and must reply at the question's last chunk. The reply is judged against a reference answer.</p>
      ${answersSummary(sec.answers)}
      <div class="answers">${sec.answers.examples.map(e => answerExample(e, sec.lang)).join("")}</div>
    </div>
  </section>`).join("");

let activeAudio;
const fmt = sec => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

document.querySelectorAll(".ai-track").forEach(trackNode => {
  const main = trackNode.querySelector("audio");
  const button = trackNode.querySelector(".play");
  const progress = trackNode.querySelector(".progress");
  const time = trackNode.querySelector(".time");
  const head = trackNode.querySelector(".playhead");
  const stripNode = trackNode.querySelector(".strip");
  const dur = parseFloat(stripNode.dataset.duration);

  main.addEventListener("play", () => { button.textContent = "Ⅱ"; button.classList.add("playing"); });
  main.addEventListener("pause", () => { button.textContent = "▶"; button.classList.remove("playing"); });
  main.addEventListener("timeupdate", () => {
    progress.value = main.duration ? (main.currentTime / main.duration) * 100 : 0;
    time.textContent = fmt(main.currentTime);
    head.style.left = pct(main.currentTime, dur);
  });
  main.addEventListener("ended", () => { main.currentTime = 0; });
  progress.addEventListener("input", () => { if (main.duration) main.currentTime = (progress.value / 100) * main.duration; });

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
