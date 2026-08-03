"use client";

import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -35px" },
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 65}ms`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
