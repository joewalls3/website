import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joewalls.com"),
  title: {
    default: "Joe Walls — Built for Live",
    template: "%s — Joe Walls",
  },
  description:
    "Joe Walls is a New York-based student technologist building live production systems, software, and ambitious technical projects.",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Joe Walls — Built for Live",
    description:
      "Live production, engineering, automation, and technology—built to work when it counts.",
    type: "website",
    url: "/",
    images: ["/assets/joe-waterfall.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = (
    <html lang="en">
      <body>{children}</body>
    </html>
  );

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return content;
  }

  return <ClerkProvider>{content}</ClerkProvider>;
}
