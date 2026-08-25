const conditions = [
  ["01_neutral__01_normal", "neutral", "normal", ["afternoon_shopping", "book_on_table", "meet_tomorrow"]],
  ["02_calm__01_normal", "calm", "normal", ["take_it_slow", "sit_and_rest", "breathe"]],
  ["02_calm__02_strong", "calm", "strong", ["take_it_slow", "sit_and_rest", "breathe"]],
  ["03_happy__01_normal", "happy", "normal", ["celebrate", "good_news", "safe_return"]],
  ["03_happy__02_strong", "happy", "strong", ["celebrate", "good_news", "safe_return"]],
  ["04_sad__01_normal", "sad", "normal", ["miss_them", "no_hope", "all_alone"]],
  ["04_sad__02_strong", "sad", "strong", ["miss_them", "no_hope", "all_alone"]],
  ["05_angry__01_normal", "angry", "normal", ["told_you", "are_you_listening", "no_more_excuses"]],
  ["05_angry__02_strong", "angry", "strong", ["told_you", "are_you_listening", "no_more_excuses"]],
  ["06_fearful__01_normal", "fearful", "normal", ["noise_outside", "dont_leave_me", "run"]],
  ["06_fearful__02_strong", "fearful", "strong", ["noise_outside", "dont_leave_me", "run"]],
  ["07_disgust__01_normal", "disgust", "normal", ["rotten_food", "filthy_floor", "disgusting"]],
  ["07_disgust__02_strong", "disgust", "strong", ["rotten_food", "filthy_floor", "disgusting"]],
  ["08_surprised__01_normal", "surprised", "normal", ["really", "how_possible", "back_today"]],
  ["08_surprised__02_strong", "surprised", "strong", ["really", "how_possible", "back_today"]]
];

const scripts = {
  neutral: [
    ["我今仔日下晡欲去街仔買物件。", "I am going shopping this afternoon."],
    ["桌頂彼本冊是我的，等一下我會提走。", "The book on the table is mine; I will take it later."],
    ["明仔載早起八點，咱佇厝門口等。", "Tomorrow at eight, we will meet by the front door."]
  ],
  calm: [
    ["莫急，代誌慢慢講，咱一定會想出辦法。", "Do not rush; we can talk slowly and find a solution."],
    ["汝先坐落來歇睏一下，啉一喙水。", "Sit down, rest for a while, and drink some water."],
    ["無要緊，深深吸氣，心情放予輕鬆。", "It is all right; breathe deeply and let yourself relax."]
  ],
  happy: [
    ["今仔日真正歡喜，逐家做伙來食好料！", "I am so happy today; let us celebrate with good food!"],
    ["我等真久，總算等著這个好消息矣！", "I waited so long and finally received this good news!"],
    ["看著恁攏平安轉來，我心內實在真歡喜！", "Seeing everyone return safely makes me truly happy!"]
  ],
  sad: [
    ["伊已經離開真久矣，我猶原逐工咧想伊。", "They have been gone a long time, and I still miss them every day."],
    ["這擺真正無希望矣，想著心內就真艱苦。", "There is truly no hope this time; thinking about it hurts."],
    ["我一个人坐佇遮，連一个通講話的人都無。", "I sit here alone with nobody to talk to."]
  ],
  angry: [
    ["我已經共汝講幾若擺矣，毋通閣按呢做！", "I have told you repeatedly; stop doing this!"],
    ["汝到底有聽入去無？我真正予汝氣死矣！", "Are you listening at all? You are making me furious!"],
    ["夠矣，我無欲閣聽汝找藉口，今仔日講清楚！", "Enough! No more excuses; we settle this today!"]
  ],
  fearful: [
    ["外口彼个聲是啥物？敢有人咧行過來？", "What is that noise outside? Is someone approaching?"],
    ["我真驚，汝毋通放我一个人佇遮！", "I am frightened; do not leave me here alone!"],
    ["緊走！後壁好親像有啥物咧追咱！", "Run! Something behind us seems to be chasing us!"]
  ],
  disgust: [
    ["這碗物件酸臭甲欲死，莫閣叫我食矣！", "This food smells rotten; do not make me eat it!"],
    ["汝看地泥遐濟垃圾，真正予人看袂落去！", "Look at all that rubbish on the floor; it is revolting!"],
    ["伊彼款做法有夠噁心，我連看都無欲看！", "What they did is disgusting; I cannot bear to look!"]
  ],
  surprised: [
    ["啥物！汝講个是真个抑是假个？", "What! Are you telling the truth?"],
    ["按怎可能？我完全無想著會變成按呢！", "How is that possible? I never expected this!"],
    ["天啊，汝竟然今仔日就轉來矣！", "My goodness, you actually came back today!"]
  ]
};

const references = ["Kids are talking by the door.", "Dogs are sitting by the door."];
const samples = document.querySelector("#samples");

const player = (src, label) => `
  <div class="player">
    <button class="play" type="button" aria-label="Play ${label}">▶</button>
    <input class="progress" type="range" min="0" max="100" value="0" aria-label="Audio progress" />
    <span class="time">0:00</span>
    <audio preload="metadata" src="${src}"></audio>
  </div>`;

samples.innerHTML = conditions.map(([folder, emotion, intensity, names], conditionIndex) => `
  <section class="condition" data-intensity="${intensity}">
    <header class="condition-head">
      <span class="condition-number">${String(conditionIndex + 1).padStart(2, "0")} / 15</span>
      <h2>${emotion}</h2>
      <span class="intensity">${intensity} intensity</span>
    </header>
    <div class="references">
      ${[1, 2].map(reference => `
        <article class="reference">
          <div class="reference-head">
            <span class="reference-label">EN · 0${reference}</span>
            <div>
              <p class="reference-copy">${references[reference - 1]}</p>
              ${player(`audio/${folder}/ref_0${reference}/reference_english.wav`, `English reference ${reference}`)}
            </div>
          </div>
          ${names.map((name, trackIndex) => `
            <div class="track">
              <span class="track-index">HOK · 0${trackIndex + 1}</span>
              ${player(`audio/${folder}/ref_0${reference}/0${trackIndex + 1}_${name}.wav`, `${emotion} Hokkien sample ${trackIndex + 1}`)}
              <div class="track-copy">
                <p class="hanji" lang="nan-Hant">${scripts[emotion][trackIndex][0]}</p>
                <p class="gloss">${scripts[emotion][trackIndex][1]}</p>
              </div>
            </div>`).join("")}
        </article>`).join("")}
    </div>
  </section>`).join("");

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

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filter.active").classList.remove("active");
  button.classList.add("active");
  document.querySelectorAll(".condition").forEach(section => {
    section.hidden = button.dataset.filter !== "all" && section.dataset.intensity !== button.dataset.filter;
  });
}));

const scrollLine = document.querySelector(".scroll-line");
window.addEventListener("scroll", () => {
  const range = document.documentElement.scrollHeight - innerHeight;
  scrollLine.style.width = `${range ? (scrollY / range) * 100 : 0}%`;
}, { passive: true });
