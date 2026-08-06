import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";
import { isClerkConfigured } from "@/lib/auth-config";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Joe Walls' private project workspace.",
};

export default function SignInPage() {
  return (
    <AuthShell>
      {isClerkConfigured() ? (
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            variables: {
              colorPrimary: "#d7ff5f",
              colorPrimaryForeground: "#080a0d",
              colorBackground: "#11141a",
              colorForeground: "#f7f7f2",
              colorMutedForeground: "#a3abb8",
              colorInput: "#171b22",
              colorInputForeground: "#f7f7f2",
              colorBorder: "rgba(255, 255, 255, 0.18)",
              borderRadius: "1rem",
              fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif",
            },
            elements: {
              rootBox: "clerk-root",
              cardBox: "clerk-card-box",
              card: "clerk-card",
              headerTitle: "clerk-title",
              headerSubtitle: "clerk-subtitle",
              socialButtonsBlockButton: "clerk-social-button",
              formButtonPrimary: "clerk-primary-button",
              footer: "clerk-footer",
            },
          }}
        />
      ) : (
        <div className="auth-setup-card">
          <p className="auth-setup-label">Authentication setup</p>
          <h2>Connect Clerk to finish OAuth.</h2>
          <p>
            The page and security boundary are ready. Add Clerk through the Vercel Marketplace, then enable Google or GitHub sign-in and passkeys in Clerk.
          </p>
          <div className="auth-setup-status"><span />Waiting for environment keys</div>
        </div>
      )}
    </AuthShell>
  );
}
