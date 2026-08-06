import Image from "next/image";
import Link from "next/link";
import { LiveClock } from "@/components/home/live-clock";
import { ProjectGrid, SignalMeter } from "@/components/home/project-grid";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteHeader } from "@/components/home/site-header";

const capabilities = [
  {
    title: "Live production",
    description: "Directing, switching, audio, graphics, cameras, streaming, and show workflows.",
    icon: (
      <svg viewBox="0 0 48 48">
        <rect x="5" y="8" width="38" height="28" rx="4" />
        <path d="M12 29l7-8 6 6 5-4 6 6M18 42h12M24 36v6" />
      </svg>
    ),
  },
  {
    title: "Engineering",
    description: "Prototypes that connect hardware, software, and real human needs.",
    icon: (
      <svg viewBox="0 0 48 48">
        <path d="M14 8h20v32H14zM8 16h6m-6 8h6m-6 8h6m20-16h6m-6 8h6m-6 8h6" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
  },
  {
    title: "Systems + automation",
    description: "Scalable workflows that remove repetitive work and keep complexity under control.",
    icon: (
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="5" />
        <path d="M24 4v8m0 24v8M4 24h8m24 0h8M9.9 9.9l5.7 5.7m16.8 16.8 5.7 5.7m0-28.2-5.7 5.7M15.6 32.4l-5.7 5.7" />
      </svg>
    ),
  },
  {
    title: "Aviation + travel",
    description: "Airline operations, ATC, trip planning, and the systems that move people.",
    icon: (
      <svg viewBox="0 0 48 48">
        <path d="M5 27l38-13-13 29-7-12zM23 31L43 14M23 31l-2 8" />
      </svg>
    ),
  },
];

const tools = [
  "ATEM",
  "Behringer X32",
  "PTZOptics",
  "OBS",
  "Livestream Studio",
  "Stream Deck",
  "Bitfocus Companion",
  "NDI",
  "Sportzcast",
  "Titler Live",
  "grandMA3",
  "Raspberry Pi",
  "Python",
  "JavaScript",
  "GitHub",
  "n8n",
];

export default function HomePage() {
  return (
    <>
      <RevealController />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow reveal">
                <span className="availability-dot" aria-hidden="true" />
                New York · Student technologist
              </p>
              <h1 className="reveal">
                Technically minded.
                <em>Built for live.</em>
              </h1>
              <p className="hero-lede reveal">
                I’m Joe. I build the systems behind broadcasts, events, and ambitious
                ideas—then make sure they still work when the pressure is on.
              </p>
              <div className="hero-actions reveal">
                <a className="button button-light" href="#work">
                  See what I’m building <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="button button-outline"
                  href="https://github.com/joewalls3"
                  target="_blank"
                  rel="noreferrer"
                >
                  My GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-fields reveal" aria-label="Areas of focus">
                <span>Live production</span><span>Engineering</span><span>Automation</span>
              </div>
            </div>

            <div className="portrait-stage reveal">
              <div className="portrait-backdrop" aria-hidden="true">
                <span className="signal-ring signal-ring-one" />
                <span className="signal-ring signal-ring-two" />
                <span className="signal-line" />
              </div>
              <div className="portrait-frame">
                <Image
                  className="portrait-photo"
                  src="/assets/joe-waterfall.jpeg"
                  alt="Joe standing in front of a waterfall in Yosemite"
                  fill
                  priority
                  sizes="(max-width: 1000px) 82vw, 480px"
                />
                <div className="portrait-shade" aria-hidden="true" />
                <div className="portrait-label">
                  <span>Joseph “Joe” Walls</span>
                  <small>Builder · Operator · Problem solver</small>
                </div>
              </div>
              <div className="floating-card floating-card-live" aria-hidden="true">
                <span className="live-dot" />
                <div><small>Program</small><strong>ON AIR</strong></div>
                <LiveClock />
              </div>
              <div className="floating-card floating-card-signal" aria-hidden="true">
                <SignalMeter />
                <div><small>Signal path</small><strong>All systems nominal</strong></div>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <span>Scroll to explore</span>
            <span className="hero-footer-line" aria-hidden="true" />
            <span>40.7° N · 74.0° W</span>
          </div>
        </section>

        <div className="ticker" aria-label="Areas of interest">
          <div className="ticker-track">
            {[...tools.slice(0, 6), ...tools.slice(0, 6)].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`} aria-hidden={index >= 6 || undefined}>
                {item}<i aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        <section className="section capabilities" id="capabilities">
          <div className="section-heading">
            <div>
              <div className="section-label reveal"><span>01</span>What I do</div>
              <h2 className="display-heading reveal">Creative thinking.<em>Technical control.</em></h2>
            </div>
            <p className="section-intro reveal">
              I work best where creative decisions and technical systems have to meet in the middle.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <article className="capability-card reveal" key={capability.title}>
                <span className="capability-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="capability-icon" aria-hidden="true">{capability.icon}</div>
                <div><h3>{capability.title}</h3><p>{capability.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section">
            <div className="section-heading">
              <div>
                <div className="section-label reveal"><span>02</span>Selected work</div>
                <h2 className="display-heading reveal">Things I’m<em>building.</em></h2>
              </div>
              <p className="section-intro reveal">
                Products, experiments, and real production systems—designed around problems worth solving.
              </p>
            </div>
            <ProjectGrid />
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-label reveal"><span>03</span>About me</div>
          <div className="about-grid">
            <h2 className="display-heading reveal">I like the part<em>nobody sees.</em></h2>
            <div className="about-body reveal">
              <p className="lead">
                The signal routing. The cue that fires at exactly the right time. The interface that makes a complicated system feel obvious.
              </p>
              <p>
                I’m a New York-based student technologist focused on live production, broadcast engineering, robotics, software, aviation, and automation. Different interests, same obsession: understanding how the whole system works and making it better.
              </p>
            </div>
          </div>
          <div className="about-strip reveal">
            <div><strong>Live</strong><span>production mindset</span></div>
            <div><strong>Hands-on</strong><span>builder and operator</span></div>
            <div><strong>Always</strong><span>learning the next system</span></div>
          </div>
        </section>

        <section className="process-section">
          <div className="section process">
            <div className="process-copy">
              <div className="section-label reveal"><span>04</span>How I work</div>
              <h2 className="display-heading reveal">Built for showtime,<em>not demo time.</em></h2>
              <p className="reveal">
                A cool idea is only useful if it survives the real world. I design around the operator, the edge cases, and the moment the pressure is on.
              </p>
            </div>
            <ol className="process-list">
              <li className="reveal"><span>01</span><div><h3>See the whole system</h3><p>Map the people, gear, signals, constraints, and actual goal.</p></div></li>
              <li className="reveal"><span>02</span><div><h3>Make complexity clear</h3><p>Turn the moving parts into a workflow a normal person can follow.</p></div></li>
              <li className="reveal"><span>03</span><div><h3>Test like it’s live</h3><p>Find the weak points, fix them, document them, then run the show.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section toolkit">
          <div className="section-label reveal"><span>05</span>The toolkit</div>
          <div className="tool-layout">
            <h2 className="display-heading reveal">Gear, code,<em>and controls.</em></h2>
            <div className="tool-cloud reveal" aria-label="Tools and technologies">
              {tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-grid" aria-hidden="true" />
          <div className="contact-content">
            <p className="eyebrow reveal"><span className="availability-dot" aria-hidden="true" />Open to interesting ideas</p>
            <h2 className="reveal">Have a complicated idea? <em>Good.</em></h2>
            <p className="reveal">I’m always interested in ambitious production, engineering, automation, and technology projects.</p>
            <div className="contact-actions reveal">
              <a className="button button-accent" href="mailto:joe@joewalls.com">Email me <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#top">Back to top <span aria-hidden="true">↑</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Link className="brand" href="/#top" aria-label="Back to the top">
          <span className="brand-symbol" aria-hidden="true">JW</span>
          <span className="brand-name">Joe Walls</span>
        </Link>
        <p>Built with curiosity and a slightly unreasonable love of signal flow.</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
