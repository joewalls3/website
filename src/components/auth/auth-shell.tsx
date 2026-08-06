import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-shell">
      <div className="auth-grid" aria-hidden="true" />
      <div className="auth-glow" aria-hidden="true" />

      <section className="auth-intro">
        <Link className="brand auth-brand" href="/" aria-label="Joe Walls, home">
          <span className="brand-symbol" aria-hidden="true">JW</span>
          <span className="brand-name">Joe Walls</span>
        </Link>
        <div className="auth-copy">
          <p className="eyebrow"><span className="availability-dot" aria-hidden="true" />Private workspace</p>
          <h1>One login.<em>Your whole control room.</em></h1>
          <p>
            Sign in to access projects, server tools, and the systems I’m building behind the scenes.
          </p>
          <div className="auth-signal" aria-label="Security status">
            <span className="auth-signal-dot" />
            <div><small>Connection</small><strong>Encrypted and owner-restricted</strong></div>
          </div>
        </div>
        <Link className="auth-back" href="/">← Back to joewalls.com</Link>
      </section>

      <section className="auth-panel" aria-label="Sign in">
        {children}
      </section>
    </main>
  );
}
