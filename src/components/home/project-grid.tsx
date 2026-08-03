import type { CSSProperties, ReactNode } from "react";

type Project = {
  type: string;
  title: string;
  description: string;
  status: string;
  link?: string;
  visual: ReactNode;
};

const meterStyle = (level: string) => ({ "--level": level }) as CSSProperties;

const projects: Project[] = [
  {
    type: "Product design · AV systems",
    title: "RackStack",
    description:
      "A smarter workspace for planning AV racks, tracing every connection, and turning complex systems into clean, field-ready documentation.",
    status: "In development",
    visual: (
      <div className="rack-visual" aria-hidden="true">
        <span className="rack-unit" />
        <span className="rack-unit active" />
        <span className="rack-unit" />
        <span className="rack-unit" />
        <span className="rack-unit active" />
        <span className="rack-unit" />
        <span className="rack-unit" />
      </div>
    ),
  },
  {
    type: "Web app · Live events",
    title: "The Floor Timer",
    description:
      "A browser-based two-team competition timer with remote control and a display built to be read from across the room.",
    status: "Public project",
    link: "https://github.com/joewalls3/thefloor-timer",
    visual: (
      <div className="timer-visual" aria-hidden="true">
        <div className="team-timer active"><span>Team blue</span><strong>12:43</strong></div>
        <div className="team-timer"><span>Team gold</span><strong>09:16</strong></div>
        <div className="timer-controls"><i /><i /><i /></div>
      </div>
    ),
  },
  {
    type: "Video · Network production",
    title: "NDI Camera App",
    description:
      "An experiment in flexible network video—turning everyday devices into useful camera sources for lightweight production workflows.",
    status: "Public project",
    link: "https://github.com/joewalls3/ndicameraapp",
    visual: (
      <div className="ndi-visual" aria-hidden="true">
        <div className="camera-tile program"><span>CAM 01 · PGM</span></div>
        <div className="camera-tile"><span>CAM 02</span></div>
        <div className="camera-tile"><span>CAM 03</span></div>
        <div className="camera-tile"><span>GFX · NDI</span></div>
      </div>
    ),
  },
  {
    type: "Web app · Travel tracker",
    title: "Where’s Freddy?",
    description:
      "A public, map-based tracker following Freddy’s World Cup road trip through verified social updates, location history, and a filterable timeline.",
    status: "Live project",
    link: "https://joewalls3.github.io/Freddy-tracker/",
    visual: (
      <div className="signal-visual" aria-hidden="true">
        <span className="signal-path one" />
        <span className="signal-path two" />
        <span className="signal-path three" />
        <span className="signal-node camera">START</span>
        <span className="signal-node switcher">POST</span>
        <span className="signal-node audio">NOW</span>
        <span className="signal-node graphics">ROUTE</span>
      </div>
    ),
  },
];

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card reveal" key={project.title}>
          <div className="project-visual">{project.visual}</div>
          <div className="project-copy">
            <div>
              <p className="project-meta">{project.type}</p>
              <h3>{project.title}</h3>
            </div>
            {project.link ? (
              <a
                className="project-action"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
              >
                ↗
              </a>
            ) : (
              <span className="project-status">{project.status}</span>
            )}
            <p className="project-description">{project.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SignalMeter() {
  return (
    <div className="mini-meter">
      <i style={meterStyle("68%")} />
      <i style={meterStyle("84%")} />
      <i style={meterStyle("52%")} />
      <i style={meterStyle("74%")} />
    </div>
  );
}
