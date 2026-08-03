"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sectionLinks = [
  { href: "#capabilities", label: "What I do" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-active" : ""}`}
    >
      <Link className="brand" href="/#top" aria-label="Joe Walls, home">
        <span className="brand-symbol" aria-hidden="true">JW</span>
        <span className="brand-name">Joe Walls</span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`primary-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
      >
        {sectionLinks.map((link) => (
          <Link
            className={activeSection === link.href ? "is-active" : undefined}
            href={`/${link.href}`}
            key={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <a href="https://github.com/joewalls3" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <Link className="nav-button" href="/sign-in" onClick={() => setMenuOpen(false)}>
          Sign in <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  );
}
