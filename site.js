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
    copy.append(make("p", "portfolio-kicker", "月夜档案 / MIDNIGHT WORKS"));
    const title = make("h1", "portfolio-title");
    title.append(document.createTextNode("把脑海里的东西，"));
    const accent = make("em", "", "把想象带到现实。");
    title.append(accent);
    copy.append(title);
    const intro = make("p", "portfolio-note", description.textContent.trim());
    copy.append(intro);
    const actions = make("div", "portfolio-actions");
    const browse = make("a", "portfolio-action", "浏览全部文章 ↗");
    browse.href = "tag.html#All";
    actions.append(browse);
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
    description.before(hero, heading, grid, archive);
    description.hidden = true;
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
    footer.append(credits, tools);
  }

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
