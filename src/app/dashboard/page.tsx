import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { AgentPanel } from "@/components/agent/agent-panel";
import { isClerkConfigured, isOwner } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function SetupRequired() {
  return (
    <main className="dashboard-state">
      <div className="dashboard-state-card">
        <span className="brand-symbol" aria-hidden="true">JW</span>
        <p className="section-label"><span>Setup</span>Authentication</p>
        <h1>OAuth isn’t connected yet.</h1>
        <p>Install Clerk in Vercel and add the generated environment variables before this private route can open.</p>
        <Link className="button button-accent" href="/sign-in">View sign-in setup</Link>
      </div>
    </main>
  );
}

export default async function DashboardPage() {
  if (!isClerkConfigured()) return <SetupRequired />;

  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: "/dashboard" });

  if (!process.env.OWNER_CLERK_USER_ID) {
    return (
      <main className="dashboard-state">
        <div className="dashboard-state-card">
          <span className="brand-symbol" aria-hidden="true">JW</span>
          <p className="section-label"><span>Final step</span>Owner lock</p>
          <h1>Lock this dashboard to your account.</h1>
          <p>Add this signed-in user ID as <code>OWNER_CLERK_USER_ID</code> in Vercel:</p>
          <code className="owner-id">{userId}</code>
          <p className="dashboard-note">Until that value is configured, no private dashboard content is exposed.</p>
        </div>
      </main>
    );
  }

  if (!isOwner(userId)) {
    return (
      <main className="dashboard-state">
        <div className="dashboard-state-card">
          <span className="brand-symbol" aria-hidden="true">JW</span>
          <p className="section-label"><span>403</span>Access restricted</p>
          <h1>This workspace is private.</h1>
          <p>You’re signed in, but this account is not authorized to access Joe’s dashboard.</p>
          <Link className="button button-outline" href="/">Return home</Link>
        </div>
      </main>
    );
  }

  const user = await currentUser();
  const firstName = user?.firstName ?? "Joe";

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="brand" href="/">
          <span className="brand-symbol" aria-hidden="true">JW</span>
          <span className="brand-name">Joe Walls</span>
        </Link>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="is-active" href="#overview">Overview</a>
          <a href="#agent">Agent</a>
          <a href="#projects">Projects</a>
          <a href="#server">Server</a>
        </nav>
        <div className="dashboard-user"><UserButton /><span>{firstName}</span></div>
      </aside>

      <section className="dashboard-main" id="overview">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow"><span className="availability-dot" aria-hidden="true" />Owner workspace</p>
            <h1>Welcome back, {firstName}.</h1>
          </div>
          <span className="dashboard-secure">Secure session</span>
        </header>

        <AgentPanel />

        <div className="dashboard-grid" id="projects">
          <article className="dashboard-card dashboard-card-wide">
            <p className="dashboard-card-label">Projects</p>
            <h2>Your build control center.</h2>
            <p>RackStack, Freddy Tracker, the Floor Timer, and future projects will connect here without changing the auth foundation.</p>
            <div className="dashboard-links">
              <a href="https://github.com/joewalls3/rackstack" target="_blank" rel="noreferrer">RackStack ↗</a>
              <a href="https://github.com/joewalls3/Freddy-tracker" target="_blank" rel="noreferrer">Freddy Tracker ↗</a>
            </div>
          </article>
          <article className="dashboard-card" id="server">
            <div className="server-status"><span />Awaiting connection</div>
            <p className="dashboard-card-label">Server</p>
            <h2>Server controls</h2>
            <p>The secure route is ready. Live status and safe control actions can be connected next.</p>
          </article>
          <article className="dashboard-card">
            <p className="dashboard-card-label">Security</p>
            <h2>OAuth + passkeys</h2>
            <p>Clerk handles the identity layer; this app separately enforces your owner user ID for authorization.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
