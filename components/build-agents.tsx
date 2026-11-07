"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Bot, Sparkles, Route } from "lucide-react";

const AGENTS = [
  { name: "Scout", color: "#ff6258" },
  { name: "Layout", color: "#53a8ff" },
  { name: "Typeset", color: "#c084fc" },
  { name: "Motion", color: "#f6ad55" },
  { name: "QA", color: "#43d9a3" },
  { name: "Deploy", color: "#f472b6" },
  { name: "Copy", color: "#a3e635" },
  { name: "Lint", color: "#facc15" },
  { name: "Index", color: "#67e8f9" },
  { name: "Render", color: "#fb923c" },
  { name: "Palette", color: "#e879f9" },
  { name: "Review", color: "#94a3b8" }
];

type Job = { el: HTMLElement; agent: number; start: number; fromX: number; fromY: number; toX: number; toY: number; revealed: boolean };
type Cursor = { x: number; y: number; visible: boolean; label: string; color: string };

export default function BuildAgents() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [ready, setReady] = useState(false);
  const enabledRef = useRef(false);
  const pausedRef = useRef(false);
  const tourRef = useRef(false);
  const stopTourRef = useRef<() => void>(() => {});
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const stopTour = useCallback(() => {
    tourRef.current = false;
    setTourActive(false);
  }, []);

  useEffect(() => {
    stopTourRef.current = stopTour;
  }, [stopTour]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const on = params.get("agents") === "on" || (params.get("agents") !== "off" && localStorage.getItem("melvin-agents") !== "off" && !reduced);
    enabledRef.current = on;
    setEnabled(on);
    setReady(true);
    if (!on) document.documentElement.classList.remove("build-mode");
    else document.documentElement.classList.add("build-mode");
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!enabled) {
      document.documentElement.classList.remove("build-mode");
      document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => el.classList.add("built"));
      setCursors([]);
      return;
    }
    document.documentElement.classList.add("build-mode");
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const count = mobile ? 6 : 12;
    const agents = AGENTS.slice(0, count);
    setCursors(agents.map((a) => ({ x: -100, y: -100, visible: false, label: a.name, color: a.color })));

    const queue: HTMLElement[] = [];
    const jobs: Job[] = [];
    const positions = agents.map(() => ({ x: -100, y: -100 }));
    let raf = 0;
    let last = 0;
    let tourStart = 0;
    let tourFrom = 0;
    let tourDistance = 0;
    let tourDuration = 0;
    let tourRunning = false;
    let userInterrupted = false;

    const reveal = (el: HTMLElement) => {
      el.classList.add("built");
      el.classList.remove("building");
    };

    const enqueue = (el: HTMLElement) => {
      if (el.classList.contains("built") || el.classList.contains("building") || queue.includes(el) || jobs.some((j) => j.el === el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) { reveal(el); return; }
      queue.push(el);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) enqueue(entry.target as HTMLElement);
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.02 });

    document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => observer.observe(el));

    const beginJobs = (now: number) => {
      for (let i = 0; i < agents.length && jobs.length < 6 && queue.length; i++) {
        if (jobs.some((j) => j.agent === i)) continue;
        const el = queue.shift()!;
        if (el.classList.contains("built")) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0) { reveal(el); continue; }
        const from = positions[i];
        el.classList.add("building");
        jobs.push({
          el, agent: i, start: now,
          fromX: from.x < 0 ? window.innerWidth * (0.18 + (i % 4) * 0.2) : from.x,
          fromY: from.y < 0 ? window.innerHeight + 40 : from.y,
          toX: rect.left + Math.min(rect.width * 0.55, 150),
          toY: rect.top + Math.min(rect.height * 0.5, 45),
          revealed: false
        });
      }
    };

    const onUserScroll = () => {
      if (tourRunning) {
        userInterrupted = true;
        tourRunning = false;
        tourRef.current = false;
        setTourActive(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tourRunning) {
        userInterrupted = true;
        tourRunning = false;
        tourRef.current = false;
        setTourActive(false);
      }
    };
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    const params = new URLSearchParams(window.location.search);
    if (params.get("tour") === "1") {
      tourRunning = true;
      tourRef.current = true;
      setTourActive(true);
      window.history.replaceState({}, "", window.location.pathname + (params.get("agents") ? `?agents=${params.get("agents")}` : ""));
    }

    const frame = (now: number) => {
      if (!pausedRef.current) {
        beginJobs(now);
        for (let k = jobs.length - 1; k >= 0; k--) {
          const job = jobs[k];
          const rect = job.el.getBoundingClientRect();
          if (rect.bottom < 0) {
            reveal(job.el);
            positions[job.agent] = { x: job.toX, y: job.toY };
            jobs.splice(k, 1);
            continue;
          }
          job.toX = rect.left + Math.min(rect.width * 0.55, 150);
          job.toY = rect.top + Math.min(rect.height * 0.5, 45);
          const raw = Math.min(1, (now - job.start) / 1050);
          const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
          const x = job.fromX + (job.toX - job.fromX) * eased;
          const y = job.fromY + (job.toY - job.fromY) * eased;
          positions[job.agent] = { x, y };
          if (raw > 0.58 && !job.revealed) {
            job.revealed = true;
            job.el.classList.add("built");
          }
          if (raw >= 1) {
            reveal(job.el);
            jobs.splice(k, 1);
          }
        }
        setCursors((old) => old.map((c, i) => {
          const job = jobs.find((j) => j.agent === i);
          return { ...c, x: positions[i].x, y: positions[i].y, visible: !!job };
        }));
      }

      if (tourRunning && !userInterrupted) {
        if (!tourStart) {
          tourStart = now + 2400;
          tourFrom = window.scrollY;
          tourDistance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - tourFrom);
          tourDuration = Math.max(14000, Math.min(28000, tourDistance * 13));
        } else if (now > tourStart) {
          const p = Math.min(1, (now - tourStart) / tourDuration);
          const ease = p < 0.12 ? 0.5 * Math.pow(p / 0.12, 2) * 0.12 : p > 0.88 ? 0.88 + 0.12 * (1 - Math.pow(1 - (p - 0.88) / 0.12, 2)) : p;
          window.scrollTo(0, tourFrom + tourDistance * ease);
          if (p >= 1) {
            tourRunning = false;
            tourRef.current = false;
            setTourActive(false);
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled, ready]);

  const toggleAgents = () => {
    const next = !enabled;
    localStorage.setItem("melvin-agents", next ? "on" : "off");
    const url = new URL(window.location.href);
    url.searchParams.set("agents", next ? "on" : "off");
    url.searchParams.delete("tour");
    window.location.href = url.toString();
  };
  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };
  const startTour = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("tour", "1");
    if (enabled) url.searchParams.set("agents", "on");
    window.location.href = url.toString();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key.toLowerCase() === "p") togglePause();
      if (e.key.toLowerCase() === "a") toggleAgents();
      if (e.key.toLowerCase() === "t") startTour();
      if (e.key === "Escape") stopTourRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <div className="agent-layer" aria-hidden="true">
        {cursors.map((c, i) => (
          <div key={c.label} className={`agent-cursor ${c.visible && enabled ? "cursor-visible" : ""}`} style={{ transform: `translate3d(${c.x}px, ${c.y}px, 0)`, ["--agent-color" as string]: c.color }}>
            <span className="cursor-arrow">➤</span>
            <span className="robot-tag"><span className="robot"><i /><i /><b /></span>{c.label}</span>
          </div>
        ))}
      </div>
      <div className="build-dock" aria-label="Portfolio animation controls">
        <button onClick={togglePause} className="dock-button" aria-label={paused ? "Resume animation" : "Pause animation"}>
          {paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "Resume" : "Pause"}</span>
        </button>
        <button onClick={toggleAgents} className={`dock-button ${enabled ? "dock-active" : ""}`} aria-label="Toggle build agents">
          <Bot size={15} /><span>Agents {enabled ? "On" : "Off"}</span>
        </button>
        <button onClick={startTour} className={`dock-button ${tourActive ? "dock-active" : ""}`} aria-label="Start site tour">
          <Route size={14} /><span>Tour</span>
        </button>
        <span className="dock-hint"><Sparkles size={12} /> T / A / P</span>
      </div>
    </>
  );
}
