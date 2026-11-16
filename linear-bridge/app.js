const container = document.querySelector("#samples");

const player = (src, label) => `
  <div class="player">
    <button class="play" type="button" aria-label="Play ${label}">▶</button>
    <input class="progress" type="range" min="0" max="100" value="0" aria-label="Audio progress" />
    <span class="time">0:00</span>
    <audio preload="metadata" src="${src}"></audio>
  </div>`;

const track = (label, src, hanzi, gloss, note) => `
  <div class="track">
    <span class="track-index">${label}</span>
    <div>
      ${player(src, label)}
      ${note ? `<p class="track-note">${note}</p>` : ""}
    </div>
    <div class="track-copy">
      <p class="hanji" lang="nan-Hant">${hanzi}</p>
      <p class="gloss">${gloss}</p>
    </div>
  </div>`;

container.innerHTML = samples.map((sample, index) => {
  const base = `audio/linear_bridge_v1/${sample.id}`;
  return `
  <section class="sample">
    <header class="sample-head">
      <span class="sample-number">${String(index + 1).padStart(2, "0")} / ${samples.length}</span>
      <h2>${sample.id}</h2>
    </header>
    <div class="tracks">
      ${track("Input · question", `${base}/input.wav`, sample.input.hanzi, sample.input.gloss)}
      ${track("Output reference", `${base}/reference.wav`, sample.reference.hanzi, sample.reference.gloss)}
      ${methods.map(method =>
        track(method.label, `${base}/${method.file}`, sample.answer.hanzi, sample.answer.gloss, method.note)
      ).join("")}
    </div>
  </section>`;
}).join("");

let activeAudio;

document.addEventListener("click", event => {
  const button = event.target.closest(".play");
  if (!button) return;
  const playerNode = button.closest(".player");
  const audio = playerNode.querySelector("audio");

  if (activeAudio && activeAudio !== audio) activeAudio.pause();
  if (audio.paused) {
    audio.play();
    activeAudio = audio;
  } else {
    audio.pause();
  }
});

document.querySelectorAll("audio").forEach(audio => {
  const node = audio.closest(".player");
  const button = node.querySelector(".play");
  const progress = node.querySelector(".progress");
  const time = node.querySelector(".time");

  audio.addEventListener("play", () => { button.textContent = "Ⅱ"; button.classList.add("playing"); });
  audio.addEventListener("pause", () => { button.textContent = "▶"; button.classList.remove("playing"); });
  audio.addEventListener("timeupdate", () => {
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    const seconds = Math.floor(audio.currentTime);
    time.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  });
  audio.addEventListener("ended", () => { audio.currentTime = 0; });
  progress.addEventListener("input", () => { if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration; });
});

const scrollLine = document.querySelector(".scroll-line");
window.addEventListener("scroll", () => {
  const range = document.documentElement.scrollHeight - innerHeight;
  scrollLine.style.width = `${range ? (scrollY / range) * 100 : 0}%`;
}, { passive: true });
