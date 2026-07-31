const projects = [
  {
    number: "01",
    type: "Product design · AV systems",
    title: "RackStack",
    description:
      "A smarter platform for planning professional AV racks, tracing every connection, and turning complex systems into clean, field-ready documentation.",
    status: "In development",
  },
  {
    number: "02",
    type: "Web app · Live events",
    title: "The Floor Timer",
    description:
      "A browser-based two-team competition timer with remote control, operator-friendly controls, and a display built to be read from across the room.",
    status: "Public project",
    link: "https://github.com/joewalls3/thefloor-timer",
  },
  {
    number: "03",
    type: "Video · Network production",
    title: "NDI Camera App",
    description:
      "An experiment in flexible network video—exploring how phones and computers can become useful camera sources in lightweight production workflows.",
    status: "Public project",
    link: "https://github.com/joewalls3/ndicameraapp",
  },
  {
    number: "04",
    type: "Systems design · Broadcasting",
    title: "School Broadcast Systems",
    description:
      "Designing reliable multi-room sports production workflows around ATEM switchers, PTZ cameras, X32 audio, live graphics, and remote operators.",
    status: "Ongoing",
  },
];

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
    ? `<a class="project-link" href="${project.link}" target="_blank" rel="noreferrer" aria-label="Open ${project.title} on GitHub">↗</a>`
    : `<span class="project-status">${project.status}</span>`;

  article.innerHTML = `
    <span class="project-index">${project.number}</span>
    <span class="project-type">${project.type}</span>
    <div class="project-main">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
    ${action}
  `;

  return article;
}

projects.forEach((project) => {
  projectList?.append(createProjectCard(project));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
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

year.textContent = new Date().getFullYear();
updateHeader();
updateClock();
window.setInterval(updateClock, 1000);
