"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function LiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return <time suppressHydrationWarning>{time}</time>;
}
