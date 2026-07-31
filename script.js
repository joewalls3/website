const projects = [
  {
    type: "Product design · AV systems",
    title: "RackStack",
    description:
      "A smarter workspace for planning AV racks, tracing every connection, and turning complex systems into clean, field-ready documentation.",
    status: "In development",
    visual: "rack",
  },
  {
    type: "Web app · Live events",
    title: "The Floor Timer",
    description:
      "A browser-based two-team competition timer with remote control and a display built to be read from across the room.",
    status: "Public project",
    link: "https://github.com/joewalls3/thefloor-timer",
    visual: "timer",
  },
  {
    type: "Video · Network production",
    title: "NDI Camera App",
    description:
      "An experiment in flexible network video—turning everyday devices into useful camera sources for lightweight production workflows.",
    status: "Public project",
    link: "https://github.com/joewalls3/ndicameraapp",
    visual: "ndi",
  },
  {
    type: "Web app · Travel tracker",
    title: "Where’s Freddy?",
    description:
      "A public, map-based tracker following Freddy’s World Cup road trip through verified social updates, location history, and a filterable timeline.",
    status: "Live project",
    link: "https://joewalls3.github.io/Freddy-tracker/",
    visual: "signal",
  },
];

const visuals = {
  rack: `
    <div class="rack-visual" aria-hidden="true">
      <span class="rack-unit"></span>
      <span class="rack-unit active"></span>
      <span class="rack-unit"></span>
      <span class="rack-unit"></span>
      <span class="rack-unit active"></span>
      <span class="rack-unit"></span>
      <span class="rack-unit"></span>
    </div>
  `,
  timer: `
    <div class="timer-visual" aria-hidden="true">
      <div class="team-timer active">
        <span>Team blue</span>
        <strong>12:43</strong>
      </div>
      <div class="team-timer">
        <span>Team gold</span>
        <strong>09:16</strong>
      </div>
      <div class="timer-controls"><i></i><i></i><i></i></div>
    </div>
  `,
  ndi: `
    <div class="ndi-visual" aria-hidden="true">
      <div class="camera-tile program"><span>CAM 01 · PGM</span></div>
      <div class="camera-tile"><span>CAM 02</span></div>
      <div class="camera-tile"><span>CAM 03</span></div>
      <div class="camera-tile"><span>GFX · NDI</span></div>
    </div>
  `,
  signal: `
    <div class="signal-visual" aria-hidden="true">
      <span class="signal-path one"></span>
      <span class="signal-path two"></span>
      <span class="signal-path three"></span>
      <span class="signal-node camera">START</span>
      <span class="signal-node switcher">POST</span>
      <span class="signal-node audio">NOW</span>
      <span class="signal-node graphics">ROUTE</span>
    </div>
  `,
};

const projectList = document.querySelector("[data-project-list]");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const clock = document.querySelector("[data-clock]");
const year = document.querySelector("[data-year]");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card reveal";

  const action = project.link
    ? `<a class="project-action" href="${project.link}" target="_blank" rel="noreferrer" aria-label="Open ${project.title}">↗</a>`
    : `<span class="project-status">${project.status}</span>`;

  article.innerHTML = `
    <div class="project-visual">${visuals[project.visual]}</div>
    <div class="project-copy">
      <div>
        <p class="project-meta">${project.type}</p>
        <h3>${project.title}</h3>
      </div>
      ${action}
      <p class="project-description">${project.description}</p>
    </div>
  `;

  return article;
}

projects.forEach((project) => projectList?.append(createProjectCard(project)));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -35px" },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 65}ms`;
  revealObserver.observe(element);
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function setMenu(open) {
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation?.classList.toggle("is-open", open);
  header?.classList.toggle("menu-active", open);
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.primary-navigation a[href^="#"]')];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50%", threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) setMenu(false);
});

if (year) year.textContent = new Date().getFullYear();
updateHeader();
updateClock();
window.setInterval(updateClock, 1000);
