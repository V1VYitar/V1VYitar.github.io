document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    { label: "信息作品", number: "01", title: ["信息", "作品"], note: "设计、研究与可视化表达" },
    { label: "绘画作品", number: "02", title: ["绘画", "作品"], note: "插画、角色与视觉练习" },
    { label: "世界观作品", number: "03", title: ["世界观", "作品"], note: "设定、故事与原创世界" }
  ];
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const home = document.querySelector("#content > .SideNav");
  const description = document.querySelector("#content > div:first-child");
  if (home && description && !document.querySelector(".tagTitle, #postBody, .portfolio-hero")) {
    document.body.classList.add("portfolio-home");
    const hero = make("section", "portfolio-hero");
    const copy = make("div");
    copy.append(make("p", "portfolio-kicker", "创作者档案 / CREATOR ARCHIVE"));
    const title = make("h1", "portfolio-title");
    title.append(document.createTextNode("成为一个"));
    const accent = make("em", "", "不一样的人。");
    title.append(accent);
    copy.append(title);
    const intro = make("p", "portfolio-note", description.textContent.trim());
    copy.append(intro);
    const actions = make("div", "portfolio-actions");
    const browse = make("a", "portfolio-action", "浏览全部文章 ↗");
    browse.href = "tag.html#All";
    const aboutLink = make("a", "portfolio-action", "关于我 ↗");
    aboutLink.href = "#about-me";
    actions.append(browse, aboutLink);
    hero.append(copy, actions);

    const heading = make("div", "category-heading");
    heading.append(make("h2", "", "选择一个门类"));
    heading.append(make("span", "", "ARCHIVE / 03 CATEGORIES"));
    const grid = make("nav", "category-grid");
    grid.setAttribute("aria-label", "作品门类");
    categories.forEach(category => {
      const card = make("a", "category-card");
      card.href = "tag.html#" + encodeURIComponent(category.label);
      card.append(make("span", "category-index", "CATEGORY / " + category.number));
      const cardTitle = make("h3");
      cardTitle.append(make("span", "", category.title[0]), document.createElement("br"), make("span", "", category.title[1]));
      card.append(cardTitle, make("p", "", category.note));
      card.append(make("span", "category-arrow", "↗"));
      grid.append(card);
    });
    const archive = make("div", "archive-heading");
    archive.append(make("h2", "", "最近更新"));
    archive.append(make("span", "", "RECENT ENTRIES / 最近记录"));
    const about = make("section", "about-section");
    about.id = "about-me";
    about.setAttribute("aria-labelledby", "about-heading");
    const aboutHeading = make("div", "category-heading");
    const aboutTitle = make("h2", "", "关于我");
    aboutTitle.id = "about-heading";
    aboutHeading.append(aboutTitle, make("span", "", "PERSONAL FILE / V1VY"));
    const profile = make("div", "about-profile");
    const avatar = document.querySelector(".avatar");
    if (avatar) {
      const portrait = avatar.cloneNode(true);
      portrait.removeAttribute("id");
      portrait.className = "about-portrait";
      portrait.alt = "V1VY 的头像";
      profile.append(portrait);
    }
    const bio = make("div", "about-copy");
    bio.append(make("p", "about-eyebrow", "BEHIND THE WORKS"), make("h3", "", "V1VY"));
    const bioContent = make("div", "about-content", "自我简介尚未填写。");
    bio.append(bioContent);
    profile.append(bio);
    const interests = ["游戏", "音乐", "影视", "漫画", "小说"];
    const tabs = make("div", "about-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "我的兴趣");
    const panels = make("div", "about-panels");
    const destinations = new Map([["自我简介", bioContent]]);
    const buttons = [];
    const activate = index => {
      buttons.forEach((button, i) => {
        button.setAttribute("aria-selected", String(i === index));
        button.tabIndex = i === index ? 0 : -1;
        destinations.get(interests[i]).hidden = i !== index;
      });
    };
    interests.forEach((label, index) => {
      const button = make("button", "about-tab", label);
      button.type = "button";
      button.id = "interest-tab-" + index;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", "interest-panel-" + index);
      const panel = make("div", "about-content about-panel", "还没有分享" + label + "相关的内容。");
      panel.id = "interest-panel-" + index;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);
      panel.tabIndex = 0;
      buttons.push(button);
      destinations.set(label, panel);
      button.addEventListener("click", () => activate(index));
      button.addEventListener("keydown", event => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % interests.length;
        else if (event.key === "ArrowLeft") next = (index + interests.length - 1) % interests.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = interests.length - 1;
        else return;
        event.preventDefault();
        activate(next);
        buttons[next].focus();
      });
      tabs.append(button);
      panels.append(panel);
    });
    activate(0);
    const status = make("p", "about-status", "正在读取个人档案…");
    status.setAttribute("role", "status");
    about.append(aboutHeading, profile, tabs, panels, status);
    description.before(hero, heading, grid, about, archive);
    description.hidden = true;

    // A full-bleed photographic opening; scroll reveals the crop without moving the page layout.
    const scene = make("section", "cover-scene");
    scene.setAttribute("aria-label", "暮色、身影与飞鸟封面");
    const backdrop = make("div", "cover-backdrop");
    backdrop.setAttribute("aria-hidden", "true");
    const photo = make("img", "cover-photo");
    photo.src = new URL("assets/twilight-cover.jpg", document.baseURI).href;
    photo.alt = "";
    photo.width = 2048;
    photo.height = 1080;
    photo.fetchPriority = "high";
    backdrop.append(photo, make("div", "cover-texture"));
    const foreground = make("div", "cover-foreground");
    const header = document.querySelector("#header");
    scene.append(backdrop, foreground);
    document.body.prepend(scene);
    if (header) foreground.append(header);
    foreground.append(hero);
    const cue = make("span", "cover-scroll-cue", "向下滑动，展开这一刻 ↓");
    foreground.append(cue);
    const closing = make("section", "cover-scene closing-scene");
    closing.setAttribute("aria-label", "野花与草地封面");
    const closingBackdrop = make("div", "cover-backdrop");
    closingBackdrop.setAttribute("aria-hidden", "true");
    const closingPhoto = make("img", "cover-photo");
    closingPhoto.src = new URL("assets/meadow-cover.jpg", document.baseURI).href;
    closingPhoto.alt = "";
    closingPhoto.width = 1080;
    closingPhoto.height = 1082;
    closingPhoto.loading = "lazy";
    closingPhoto.decoding = "async";
    closingBackdrop.append(closingPhoto, make("div", "cover-texture"));
    closing.append(closingBackdrop);
    const pageFooter = document.querySelector("#footer");
    if (pageFooter) pageFooter.before(closing);
    else document.body.append(closing);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousProgress = -1;
    let previousClosingProgress = -1;
    const renderCover = () => {
      frame = 0;
      const progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / 240));
      if (progress !== previousProgress) {
      previousProgress = progress;
      photo.style.clipPath = `inset(0 0 ${32 * (1 - progress)}% 0)`;
      photo.style.transform = `scale(${1 + .08 * (1 - progress)})`;
      cue.style.opacity = String(1 - progress);
      }
      const closingProgress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0,
        (window.innerHeight - closing.getBoundingClientRect().top) / (Math.min(window.innerHeight, closingBackdrop.offsetHeight) + 240)));
      if (closingProgress !== previousClosingProgress) {
        previousClosingProgress = closingProgress;
        closingPhoto.style.clipPath = `inset(0 0 ${100 * (1 - closingProgress)}% 0)`;
        closingPhoto.style.transform = "none";
      }
    };
    const scheduleCover = () => { if (!frame) frame = requestAnimationFrame(renderCover); };
    window.addEventListener("scroll", scheduleCover, { passive: true });
    window.addEventListener("resize", scheduleCover);
    window.addEventListener("pageshow", scheduleCover);
    reducedMotion.addEventListener("change", scheduleCover);
    renderCover();

    // The personal file has its own space, outside the recent works list.
    home.querySelectorAll(".SideNav-item").forEach(item => {
      if (Array.from(item.querySelectorAll(".LabelName")).some(label => label.textContent.trim() === "关于我")) {
        item.hidden = true;
      }
    });

    const loadProfile = async () => {
      try {
        const indexResponse = await fetch("postList.json");
        if (!indexResponse.ok) throw new Error("Cannot load archive");
        const posts = await indexResponse.json();
        const entries = Object.entries(posts).filter(([key, post]) => /^P\d+$/.test(key) && post.labels?.includes("关于我"));
        entries.sort((a, b) => Number(b[0].slice(1)) - Number(a[0].slice(1)));
        if (!entries.length) {
          status.textContent = "个人档案，待续。";
          return;
        }
        const postUrl = new URL(entries[0][1].postUrl, location.href);
        if (postUrl.origin !== location.origin || !postUrl.pathname.includes("/post/")) throw new Error("Invalid profile URL");
        const response = await fetch(postUrl);
        if (!response.ok) throw new Error("Cannot load profile");
        const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
        const body = parsed.querySelector("#postBody");
        if (!body) throw new Error("Missing profile content");
        // Only keep passive Markdown content when embedding an article on the homepage.
        body.querySelectorAll("script,style,iframe,object,embed,form,input,button,svg,math,link,meta").forEach(node => node.remove());
        body.querySelectorAll("*").forEach(node => {
          for (const attribute of Array.from(node.attributes)) {
            if (!['href', 'src', 'alt', 'title', 'colspan', 'rowspan'].includes(attribute.name)) node.removeAttribute(attribute.name);
          }
          for (const name of ["href", "src"]) {
            if (!node.hasAttribute(name)) continue;
            try {
              const url = new URL(node.getAttribute(name), postUrl);
              if (!["https:", "http:"].includes(url.protocol)) node.removeAttribute(name);
              else node.setAttribute(name, url.href);
            } catch { node.removeAttribute(name); }
          }
          if (node.tagName === "IMG") { node.loading = "lazy"; node.decoding = "async"; }
        });
        let target = null;
        const filled = new Set();
        for (const node of Array.from(body.childNodes)) {
          if (node.nodeType === 1 && node.tagName === "H3" && destinations.has(node.textContent.trim())) {
            target = destinations.get(node.textContent.trim());
            target.replaceChildren();
            filled.add(target);
          } else if (target) {
            if (node.textContent.trim() === "_No response_" || node.textContent.trim() === "无响应") continue;
            target.append(node.cloneNode(true));
          }
        }
        destinations.forEach((target, label) => {
          if (!filled.has(target) || (!target.textContent.trim() && !target.querySelector("img"))) {
            target.textContent = label === "自我简介" ? "自我简介尚未填写。" : "还没有分享" + label + "相关的内容。";
          }
        });
        const full = make("a", "", "阅读完整个人档案 ↗");
        full.href = postUrl.href;
        status.replaceChildren(full);
      } catch {
        status.textContent = "个人档案暂时无法加载，请稍后刷新。";
      }
    };
    loadProfile();
  }

  const footer = document.querySelector("#footer");
  if (footer && !footer.querySelector(".site-credits")) {
    const credits = make("div", "site-credits");
    credits.append(make("span", "", "项目支持者："));
    const supporter = make("a", "", "ChatGPT");
    supporter.href = "https://chatgpt.com/";
    credits.append(supporter);
    const tools = make("details", "owner-tools");
    tools.append(make("summary", "", "站主工具"));
    const publish = make("a", "", "在 GitHub 发布作品 ↗");
    publish.href = "https://github.com/V1VYitar/V1VYitar.github.io/issues/new/choose";
    tools.append(publish);
    const editAbout = make("a", "", "管理关于我 ↗");
    editAbout.href = "https://github.com/V1VYitar/V1VYitar.github.io/issues?q=is%3Aissue+label%3A%E5%85%B3%E4%BA%8E%E6%88%91";
    const createAbout = make("a", "", "首次填写关于我 ↗");
    createAbout.href = "https://github.com/V1VYitar/V1VYitar.github.io/issues/new?template=04-about-me.yml";
    tools.append(editAbout, createAbout);
    footer.append(credits, tools);
  }


  // The library is a small editable manifest; visitors only see the current track.
  const music = make("aside", "music-player");
  music.setAttribute("aria-label", "随机音乐播放器");
  const musicTop = make("div", "music-top");
  const musicLabel = make("span", "music-label", "随身听 / RADIO");
  const fold = make("button", "music-fold", "−");
  fold.type = "button";
  fold.setAttribute("aria-label", "收起音乐播放器");
  fold.setAttribute("aria-expanded", "true");
  const musicBody = make("div", "music-body");
  musicBody.id = "music-controls";
  fold.setAttribute("aria-controls", musicBody.id);
  fold.addEventListener("click", () => {
    musicBody.hidden = !musicBody.hidden;
    music.classList.toggle("is-folded", musicBody.hidden);
    fold.textContent = musicBody.hidden ? "+" : "−";
    fold.setAttribute("aria-expanded", String(!musicBody.hidden));
    fold.setAttribute("aria-label", musicBody.hidden ? "展开音乐播放器" : "收起音乐播放器");
  });
  musicTop.append(musicLabel, fold);
  const cover = make("img", "music-cover");
  cover.alt = "";
  cover.width = cover.height = 48;
  cover.addEventListener("error", () => { cover.hidden = true; });
  const trackInfo = make("div", "music-info");
  const nowPlaying = make("p", "music-track", "正在读取音乐库…");
  const artist = make("p", "music-artist");
  const musicStatus = make("p", "music-status", "点击播放，让音乐陪你浏览。");
  musicStatus.setAttribute("role", "status");
  const controls = make("div", "music-buttons");
  const playerIcon = (button, kind, label) => {
    button.replaceChildren();
    button.setAttribute("aria-label", label);
    button.title = label;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const paths = {
      play: ["M8 5l11 7-11 7V5z"],
      pause: ["M8 5v14", "M16 5v14"],
      shuffle: ["M3 6h3c4 0 8 12 12 12h3", "M18 15l3 3-3 3", "M3 18h3c1.8 0 3.5-2.3 5-5", "M13 9c1.7-2 3.2-3 5-3h3", "M18 3l3 3-3 3"]
    };
    for (const d of paths[kind]) {
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", d);
      svg.append(path);
    }
    button.append(svg);
  };
  const play = make("button", "music-play");
  const next = make("button", "music-next");
  playerIcon(play, "play", "播放音乐");
  playerIcon(next, "shuffle", "随机下一首");
  play.type = next.type = "button";
  play.disabled = next.disabled = true;
  controls.append(play, next);
  const volumeRow = make("label", "music-volume");
  volumeRow.append(make("span", "", "音量"));
  const volume = make("input");
  volume.type = "range";
  volume.min = "0";
  volume.max = "100";
  volume.value = "35";
  volume.setAttribute("aria-label", "音乐音量");
  const volumeValue = make("span", "music-volume-value", "35%");
  volumeRow.append(volume, volumeValue);
  trackInfo.append(nowPlaying, artist);
  musicBody.append(cover, trackInfo, controls, volumeRow, musicStatus);
  music.append(musicTop, musicBody);
  document.body.append(music);
  const audio = new Audio();
  audio.preload = "none";
  audio.volume = .35;
  let tracks = [];
  let current = -1;
  let bag = [];
  let playbackRequest = 0;
  try {
    const saved = Number(localStorage.getItem("v1vy-music-volume"));
    if (localStorage.getItem("v1vy-music-volume") !== null && Number.isFinite(saved)) {
      audio.volume = Math.max(0, Math.min(1, saved));
    }
  } catch {}
  volume.value = String(Math.round(audio.volume * 100));
  volumeValue.textContent = volume.value + "%";
  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value) / 100;
    volumeValue.textContent = volume.value + "%";
    try { localStorage.setItem("v1vy-music-volume", String(audio.volume)); } catch {}
  });
  const startMusic = async () => {
    const request = ++playbackRequest;
    musicStatus.textContent = "正在载入音乐…";
    try {
      await audio.play();
      if (request === playbackRequest) musicStatus.textContent = "随机播放中";
    } catch (error) {
      if (request !== playbackRequest || error.name === "AbortError") return;
      musicStatus.textContent = error.name === "NotAllowedError" ? "点击播放即可开始。" : "暂时无法播放，请尝试下一首。";
    }
  };
  const chooseTrack = (start = true) => {
    ++playbackRequest;
    if (!bag.length) {
      bag = tracks.map((_, i) => i);
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag.length > 1 && bag[bag.length - 1] === current) [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    current = bag.pop();
    const track = tracks[current];
    audio.src = track.url;
    nowPlaying.textContent = track.title;
    artist.textContent = track.artist;
    nowPlaying.title = track.title;
    artist.title = track.artist;
    cover.hidden = !track.cover;
    if (track.cover) { cover.src = track.cover; cover.alt = track.title + " · 唱片封面"; }
    else { cover.removeAttribute("src"); cover.alt = ""; }
    if (start) startMusic();
  };
  play.addEventListener("click", () => {
    if (audio.paused) startMusic();
    else { ++playbackRequest; audio.pause(); }
  });
  next.addEventListener("click", () => chooseTrack());
  audio.addEventListener("play", () => { playerIcon(play, "pause", "暂停音乐"); });
  audio.addEventListener("pause", () => { playerIcon(play, "play", "播放音乐"); musicStatus.textContent = "已暂停"; });
  audio.addEventListener("ended", () => chooseTrack());
  audio.addEventListener("error", () => { musicStatus.textContent = "暂时无法播放，请尝试下一首。"; });
  const libraryUrl = new URL(document.querySelector("#postBody") ? "../assets/music/library.json" : "assets/music/library.json", document.baseURI);
  fetch(libraryUrl).then(response => {
    if (!response.ok) throw new Error("Music library unavailable");
    return response.json();
  }).then(library => {
    tracks = library.tracks.filter(track => track.title && track.file).map(track => ({
      title: track.title, artist: track.artist || "", url: new URL(track.file, libraryUrl).href,
      cover: track.cover ? new URL(track.cover, libraryUrl).href : ""
    }));
    if (!tracks.length) throw new Error("Empty library");
    chooseTrack(false);
    play.disabled = next.disabled = false;
  }).catch(() => { nowPlaying.textContent = "音乐库暂时无法加载"; musicStatus.textContent = "请稍后刷新页面。"; });

  const setCategoryTitle = () => {
    const tagTitle = document.querySelector(".tagTitle");
    if (!tagTitle) return;
    const category = categories.find(item => item.label === decodeURIComponent(location.hash.slice(1)));
    if (category && tagTitle.textContent.startsWith("Tag #")) {
      tagTitle.textContent = category.label;
      document.title = category.label + " - V1VY的作品集";
    }
  };
  setCategoryTitle();
  if (document.querySelector(".tagTitle")) {
    new MutationObserver(setCategoryTitle).observe(document.querySelector(".tagTitle"), {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
});
