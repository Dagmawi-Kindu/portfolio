"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import Image from "next/image";
import {
  SiJavascript,
  SiTypescript,
  SiDart,
  SiNestjs,
  SiDotnet,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiHandlebarsdotjs,
  SiMysql,
  SiMongodb,
  SiFlutter,
  SiDocker,
  SiGithubactions,
  SiNginx,
  SiRedis,
} from "react-icons/si";
import { FaDatabase, FaLinkedin } from "react-icons/fa";

const RESUME_URL = "/Dagmawi-Kindu-Resume.pdf";

// Icon mapping for skills
const skillIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "C#": SiDotnet, // Using .NET icon for C#
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Dart: SiDart,
  NestJS: SiNestjs,
  ".NET Core": SiDotnet,
  ".NET Core 8": SiDotnet,
  NodeJS: SiNodedotjs,
  ReactJS: SiReact,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  Handlebars: SiHandlebarsdotjs,
  "Vanilla JS": SiJavascript,
  MySQL: SiMysql,
  PostgreSQL: FaDatabase, // Using generic database icon for PostgreSQL
  MongoDB: SiMongodb,
  MSSQL: FaDatabase, // Using generic database icon for MSSQL
  Flutter: SiFlutter,
  Docker: SiDocker,
  "CI/CD": SiGithubactions,
  Nginx: SiNginx,
  Redis: SiRedis,
};

// Admin dashboard gallery images (public/assets)
const ADMIN_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/assets/admin${i + 1}.png`,
);

// TMS gallery images (public/assets)
const TMS_IMAGES = Array.from(
  { length: 5 },
  (_, i) => `/assets/tms${i + 1}.png`,
);

// Arts Plus gallery images (public/assets)
const ARTS_IMAGES = Array.from(
  { length: 6 },
  (_, i) => `/assets/arts${i + 1}.png`,
);

// Arif FM gallery images (public/assets – mix of png and jpg)
const FM_IMAGES = [
  "/assets/fm1.png",
  "/assets/fm2.png",
  "/assets/fm3.png",
  "/assets/fm4.png",
  "/assets/fm5.jpg",
  "/assets/fm6.jpg",
  "/assets/fm7.jpg",
  "/assets/fm8.jpg",
  "/assets/fm9.jpg",
];

// Project descriptions for popups
const PROJECT_DESCRIPTIONS = {
  artsPlus:
    "Arts Plus is a subscription-based video streaming platform delivering premium arts and cultural content through web, mobile, and an admin dashboard. Built with .NET Core 8, the platform supports scalable video streaming, user management, and subscription services, using Bunny CDN for efficient content delivery alongside Redis and AWS S3 for caching and storage. I led the backend development, collaborated with frontend and mobile teams to ensure smooth performance, and coordinated project execution to meet key milestones.",
  arifFm:
    "Arif FM is a modern podcast and live audio streaming platform designed to deliver an engaging listening experience across mobile and web. The platform supports live and recorded sessions, creator-managed episodes, community interaction through comments and reactions, and listener tipping to support creators. I developed the Arif FM mobile application using Flutter, implementing smooth live streaming, subscription-based access, and a responsive user interface to ensure seamless audio playback and overall app reliability.",
  adminDashboard:
    "The Arifpay Admin Dashboard is a unified management platform designed to give both Arifpay administrators and merchants a complete overview of accounts, products, and payment activities. It enables efficient merchant management, transaction tracking, real-time monitoring, and advanced reporting through customizable dashboards. Built with .NET Core 8 and PostgreSQL, I developed and maintained scalable backend services and secure APIs to ensure reliable data processing for large-scale payment operations, while collaborating closely with the React.js frontend team to deliver seamless system performance.",
  tms: "The ArifPay Terminal Management System (TMS) is a centralized platform for monitoring and managing payment transactions processed through ArifPay POS devices, providing banks and operational teams with real-time visibility, reconciliation, and device oversight. The system supports transaction tracking, terminal onboarding and configuration, health and performance monitoring, geolocation tracking, automated settlement workflows, user and role management, and advanced reporting analytics. I developed the first version of the frontend using Vanilla JS and Handlebars for IoT integration, while building and maintaining the backend with NestJS and MySQL. I also implemented background processing services using Redis and BullMQ, delivering key features such as remote POS control, transaction management, and proactive device monitoring, while supporting security compliance and the transition to a Next.js-based frontend.",
};

// Terms to highlight in descriptions: [phrase, color class] — longer phrases first
const DESCRIPTION_HIGHLIGHTS: [string, string][] = [
  ["I also implemented", "text-syntax-green font-semibold"],
  ["I developed", "text-syntax-green font-semibold"],
  ["I led", "text-syntax-green font-semibold"],
  [".NET Core 8", "text-syntax-blue"],
  ["Bunny CDN", "text-syntax-purple"],
  ["AWS S3", "text-syntax-yellow"],
  ["PostgreSQL", "text-syntax-cyan"],
  ["React.js", "text-syntax-cyan"],
  ["Vanilla JS", "text-syntax-yellow"],
  ["Handlebars", "text-syntax-orange"],
  ["NestJS", "text-syntax-orange"],
  ["Next.js", "text-syntax-cyan"],
  ["Redis", "text-syntax-purple"],
  ["BullMQ", "text-syntax-orange"],
  ["Flutter", "text-syntax-cyan"],
  ["MySQL", "text-syntax-blue"],
  ["IoT", "text-syntax-cyan"],
  ["Built with", "text-syntax-yellow"],
  ["collaborated", "text-syntax-green"],
  ["coordinated", "text-syntax-green"],
  ["collaborating", "text-syntax-green"],
  ["implementing", "text-syntax-green"],
  ["maintained", "text-syntax-green"],
  ["building", "text-syntax-green"],
  ["real-time", "text-syntax-blue"],
  ["scalable", "text-syntax-cyan"],
];

const EXPERIENCE = [
  {
    role: "Full Stack Software Developer",
    company: "Arifpay Financial Technologies",
    location: "Addis Ababa, Ethiopia",
    period: "Jul 2023 — Present",
    badge: {
      label: "Current",
      className: "bg-syntax-green/15 text-syntax-green border-syntax-green/30",
    },
    summary:
      "Full-stack delivery across fintech, streaming, and media products — from APIs and dashboards to mobile apps.",
    highlights: [
      {
        name: "TMS",
        color: "text-syntax-cyan",
        description:
          "Terminal Management System for POS — NestJS backend, MySQL, Redis & BullMQ jobs, IoT frontend.",
      },
      {
        name: "Admin Dashboard",
        color: "text-syntax-purple",
        description:
          ".NET Core & PostgreSQL services for merchants, payments, and reporting; partnered with React team.",
      },
      {
        name: "Arif FM",
        color: "text-syntax-green",
        description:
          "Flutter app for podcast & live audio — subscriptions, community, and listener tipping.",
      },
      {
        name: "Arts Plus",
        color: "text-syntax-orange",
        description:
          "Led streaming backend (.NET, Bunny CDN, Redis, S3) and coordinated web & mobile delivery.",
      },
    ],
    technologies: [
      "NestJS",
      ".NET Core",
      "Flutter",
      "PostgreSQL",
      "React.js",
      "Next.js",
      "Redis",
    ],
  },
  {
    role: "Backend Software Developer",
    company: "Awra Delivery",
    location: "Addis Ababa, Ethiopia",
    period: "May 2023 — Jul 2023",
    badge: {
      label: "Internship",
      className: "bg-syntax-blue/15 text-syntax-blue border-syntax-blue/30",
    },
    summary:
      "Backend intern on e-commerce and real-time chat — APIs, integrations, and cross-team delivery.",
    bullets: [
      "Built and extended REST APIs for the e-commerce platform.",
      "Shipped real-time chat features wired into existing services.",
      "Aligned API contracts with frontend and mobile teams.",
    ],
    technologies: ["NestJS", "React", "Flutter"],
  },
] as const;

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    accent: "text-syntax-yellow",
    skills: [
      {
        name: "C#",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
      {
        name: "JavaScript",
        color:
          "text-syntax-yellow border-syntax-yellow/40 hover:bg-syntax-yellow/10",
      },
      {
        name: "TypeScript",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
      {
        name: "Dart",
        color: "text-syntax-cyan border-syntax-cyan/40 hover:bg-syntax-cyan/10",
      },
    ],
  },
  {
    title: "Frameworks & Libraries",
    accent: "text-syntax-cyan",
    skills: [
      {
        name: "NestJS",
        color:
          "text-syntax-orange border-syntax-orange/40 hover:bg-syntax-orange/10",
      },
      {
        name: ".NET Core",
        color:
          "text-syntax-purple border-syntax-purple/40 hover:bg-syntax-purple/10",
      },
      {
        name: "NodeJS",
        color:
          "text-syntax-green border-syntax-green/40 hover:bg-syntax-green/10",
      },
      {
        name: "ReactJS",
        color: "text-syntax-cyan border-syntax-cyan/40 hover:bg-syntax-cyan/10",
      },
      {
        name: "Next.js",
        color: "text-[#c9d1d9] border-[#484f58] hover:bg-white/5",
      },
      {
        name: "Flutter",
        color: "text-syntax-cyan border-syntax-cyan/40 hover:bg-syntax-cyan/10",
      },
      {
        name: "Handlebars",
        color:
          "text-syntax-orange border-syntax-orange/40 hover:bg-syntax-orange/10",
      },
      {
        name: "Vanilla JS",
        color:
          "text-syntax-yellow border-syntax-yellow/40 hover:bg-syntax-yellow/10",
      },
    ],
  },
  {
    title: "Databases",
    accent: "text-syntax-blue",
    skills: [
      {
        name: "MySQL",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
      {
        name: "PostgreSQL",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
      {
        name: "MongoDB",
        color:
          "text-syntax-green border-syntax-green/40 hover:bg-syntax-green/10",
      },
      {
        name: "MSSQL",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    accent: "text-syntax-green",
    skills: [
      {
        name: "Docker",
        color: "text-syntax-blue border-syntax-blue/40 hover:bg-syntax-blue/10",
      },
      {
        name: "CI/CD",
        color:
          "text-syntax-purple border-syntax-purple/40 hover:bg-syntax-purple/10",
      },
      {
        name: "Nginx",
        color:
          "text-syntax-green border-syntax-green/40 hover:bg-syntax-green/10",
      },
      {
        name: "Redis",
        color:
          "text-syntax-orange border-syntax-orange/40 hover:bg-syntax-orange/10",
      },
    ],
  },
] as const;

const ABOUT_DETAILS = {
  tagline:
    "3+ years shipping backends, dashboards, and mobile apps — with a focus on clear architecture and reliable delivery.",
  education: [
    {
      degree: "B.Sc. Computer Science",
      school: "HiLCoE School of Computer Science",
      period: "Feb 2023",
      highlight: true,
    },
    {
      degree: "High School Diploma",
      school: "One Planet International School",
      period: "Jul 2018",
      highlight: false,
    },
  ],
  languages: ["English", "Amharic"],
  certifications: ["Marketable software development 101 training"],
} as const;

function highlightDescription(text: string): ReactNode {
  const escaped = DESCRIPTION_HIGHLIGHTS.map(([p]) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  ).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);
  const map = new Map(
    DESCRIPTION_HIGHLIGHTS.map(([p, c]) => [p.toLowerCase(), c]),
  );
  return (
    <>
      {parts.map((segment, i) => {
        const key = segment.toLowerCase();
        const className = map.get(key);
        if (className)
          return (
            <span key={i} className={className}>
              {segment}
            </span>
          );
        return segment;
      })}
    </>
  );
}

// Reusable styled description panel for popups
function ProjectDescriptionPanel({
  accentBorder,
  accentLabel,
  accentGlow,
  children,
}: {
  accentBorder: string;
  accentLabel: string;
  accentGlow: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-t border-[#21262d] px-4 py-4 sm:px-5 sm:py-5 relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 opacity-[0.03] ${accentGlow}`}
        aria-hidden
      />
      <div
        className={`relative rounded-lg border-l-4 ${accentBorder} bg-[#161b22]/60 backdrop-blur-sm shadow-inner`}
        style={{
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)",
        }}
      >
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <div
            className={`mono text-xs font-semibold tracking-wider mb-3 flex items-center gap-2 ${accentLabel}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {"// About this project"}
          </div>
          <div className="font-sans text-sm text-[#b1bac4] leading-relaxed overflow-y-auto max-h-[22vh] pr-2 [&_span]:break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for tech tags with icons
const TechTag = ({
  tech,
  colorClass,
}: {
  tech: string;
  colorClass: string;
}) => {
  const Icon = skillIcons[tech];
  return (
    <span
      className={`mono text-xs px-3 py-1 bg-[#21262d] border rounded-full flex items-center gap-1.5 ${colorClass}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {tech}
    </span>
  );
};

export default function Home() {
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [adminSlideIndex, setAdminSlideIndex] = useState(0);
  const [tmsPopupOpen, setTmsPopupOpen] = useState(false);
  const [tmsSlideIndex, setTmsSlideIndex] = useState(0);
  const [artsPopupOpen, setArtsPopupOpen] = useState(false);
  const [artsSlideIndex, setArtsSlideIndex] = useState(0);
  const [fmPopupOpen, setFmPopupOpen] = useState(false);
  const [fmSlideIndex, setFmSlideIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setAdminSlideIndex(
      () => (index + ADMIN_IMAGES.length) % ADMIN_IMAGES.length,
    );
  }, []);

  const goPrev = useCallback(
    () => goToSlide(adminSlideIndex - 1),
    [adminSlideIndex, goToSlide],
  );
  const goNext = useCallback(
    () => goToSlide(adminSlideIndex + 1),
    [adminSlideIndex, goToSlide],
  );

  const goToSlideTms = useCallback((index: number) => {
    setTmsSlideIndex(() => (index + TMS_IMAGES.length) % TMS_IMAGES.length);
  }, []);
  const goPrevTms = useCallback(
    () => goToSlideTms(tmsSlideIndex - 1),
    [tmsSlideIndex, goToSlideTms],
  );
  const goNextTms = useCallback(
    () => goToSlideTms(tmsSlideIndex + 1),
    [tmsSlideIndex, goToSlideTms],
  );

  const goToSlideArts = useCallback((index: number) => {
    setArtsSlideIndex(() => (index + ARTS_IMAGES.length) % ARTS_IMAGES.length);
  }, []);
  const goPrevArts = useCallback(
    () => goToSlideArts(artsSlideIndex - 1),
    [artsSlideIndex, goToSlideArts],
  );
  const goNextArts = useCallback(
    () => goToSlideArts(artsSlideIndex + 1),
    [artsSlideIndex, goToSlideArts],
  );

  const goToSlideFm = useCallback((index: number) => {
    setFmSlideIndex(() => (index + FM_IMAGES.length) % FM_IMAGES.length);
  }, []);
  const goPrevFm = useCallback(
    () => goToSlideFm(fmSlideIndex - 1),
    [fmSlideIndex, goToSlideFm],
  );
  const goNextFm = useCallback(
    () => goToSlideFm(fmSlideIndex + 1),
    [fmSlideIndex, goToSlideFm],
  );

  useEffect(() => {
    if (!adminPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAdminPopupOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adminPopupOpen, goPrev, goNext]);

  useEffect(() => {
    if (!tmsPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTmsPopupOpen(false);
      if (e.key === "ArrowLeft") goPrevTms();
      if (e.key === "ArrowRight") goNextTms();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tmsPopupOpen, goPrevTms, goNextTms]);

  useEffect(() => {
    if (!artsPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setArtsPopupOpen(false);
      if (e.key === "ArrowLeft") goPrevArts();
      if (e.key === "ArrowRight") goNextArts();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [artsPopupOpen, goPrevArts, goNextArts]);

  useEffect(() => {
    if (!fmPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFmPopupOpen(false);
      if (e.key === "ArrowLeft") goPrevFm();
      if (e.key === "ArrowRight") goNextFm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fmPopupOpen, goPrevFm, goNextFm]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#about" className="flex items-center gap-2 group">
              <div className="mono text-syntax-cyan text-xl font-bold group-hover:text-terminal-green transition-colors">
                &lt;DKM /&gt;
              </div>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#projects"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Experience
              </a>
              <a
                href="#skills"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Skills
              </a>
              <a
                href="#resume"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Resume
              </a>
              <a
                href="#contact"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Contact
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mono text-xs font-semibold px-3 py-2 rounded-lg border border-syntax-cyan/40 bg-syntax-cyan/10 text-syntax-cyan hover:bg-syntax-cyan/15 hover:border-syntax-cyan/60 transition-colors"
              >
                <span aria-hidden className="text-base leading-none">
                  ⤓
                </span>
                Download
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#121820] to-[#0d1117]" />
        <div className="hero-grid absolute inset-0" />
        <div className="absolute top-0 right-0 w-[min(560px,70vw)] h-[min(560px,70vw)] translate-x-1/4 -translate-y-1/4 rounded-full bg-[#bc8cff]/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[min(480px,60vw)] h-[min(480px,60vw)] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#58a6ff]/15 blur-[90px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 xl:gap-20 items-center">
            {/* Intro */}
            <div className="order-2 lg:order-1 space-y-7 animate-fade-in text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="inline-flex items-center gap-2 mono text-xs px-3 py-1.5 rounded-full border border-syntax-green/40 bg-syntax-green/10 text-syntax-green">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-syntax-green opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-syntax-green" />
                  </span>
                  Available for work
                </span>
                <span className="mono text-xs text-[#8b949e]">
                  Full-Stack Developer · Ethiopia
                </span>
              </div>

              <div className="space-y-3">
                <p className="mono text-syntax-green text-base sm:text-lg">
                  Hi, I&apos;m
                </p>
                <h1 className="text-[2.75rem] sm:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-tight">
                  <span className="font-sans bg-gradient-to-r from-white via-[#e6edf3] to-[#58a6ff] bg-clip-text text-transparent">
                    Dagmawi Kindu
                  </span>
                  <br />
                  <span className="mono text-syntax-cyan">Mekonnen</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#8b949e] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  I build{" "}
                  <span className="text-syntax-blue font-medium">
                    production-grade
                  </span>{" "}
                  backends, dashboards, and mobile apps for fintech and media
                  platforms.
                </p>
              </div>

              <div className="terminal-window p-5 sm:p-6 text-left max-w-xl mx-auto lg:mx-0 border-[#30363d]/80 shadow-lg shadow-black/20">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="mono text-xs text-[#8b949e] ml-2">
                    developer.ts
                  </span>
                </div>
                <div className="mono text-sm sm:text-base leading-relaxed space-y-1">
                  <p>
                    <span className="text-syntax-purple">const</span>{" "}
                    <span className="text-syntax-blue">focus</span>{" "}
                    <span className="text-[#8b949e]">=</span>{" "}
                    <span className="text-syntax-green">
                      &apos;scalable systems&apos;
                    </span>
                    <span className="text-[#8b949e]">;</span>
                  </p>
                  <p>
                    <span className="text-syntax-purple">const</span>{" "}
                    <span className="text-syntax-blue">stack</span>{" "}
                    <span className="text-[#8b949e]">=</span>{" "}
                    <span className="text-syntax-cyan">
                      [&apos;.NET&apos;, &apos;NestJS&apos;,
                      &apos;Next.js&apos;, &apos;Flutter&apos;]
                    </span>
                    <span className="text-[#8b949e]">;</span>
                  </p>
                </div>
              </div>

              <div className="max-w-xl mx-auto lg:mx-0">
                <div className="rounded-2xl border border-[#21262d] bg-[#0d1117]/35 backdrop-blur-sm p-3 sm:p-3.5 shadow-lg shadow-black/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl mono font-semibold bg-syntax-blue text-white hover:bg-[#4493f8] transition-all glow-blue w-full"
                    >
                      <span aria-hidden className="text-base leading-none">
                        ✦
                      </span>
                      See my work
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl mono font-semibold border border-[#30363d] bg-[#161b22]/60 text-[#c9d1d9] hover:border-syntax-cyan/60 hover:text-syntax-cyan transition-colors w-full"
                    >
                      Get in touch
                      <span aria-hidden className="text-base leading-none">
                        →
                      </span>
                    </a>

                    <div className="sm:col-span-2 rounded-xl border border-[#30363d] bg-gradient-to-r from-[#bc8cff0f] via-[#58a6ff0a] to-[#39c5cf0f] p-3 overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="min-w-0">
                          <div className="mono text-[11px] uppercase tracking-wider text-syntax-yellow">
                            Resume
                          </div>
                          <div className="text-sm text-[#c9d1d9] mt-1">
                            Open the PDF or download a copy.
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl mono font-semibold border border-[#30363d] bg-[#0d1117]/45 text-[#c9d1d9] hover:border-syntax-purple/60 hover:text-syntax-purple hover:bg-[#0d1117]/65 transition-colors"
                          >
                            View
                            <span
                              aria-hidden
                              className="text-base leading-none"
                            >
                              ↗
                            </span>
                          </a>
                          <a
                            href={RESUME_URL}
                            download
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl mono font-semibold border border-[#30363d] bg-[#0d1117]/45 text-[#c9d1d9] hover:border-syntax-cyan/60 hover:text-syntax-cyan hover:bg-[#0d1117]/65 transition-colors"
                          >
                            Download
                            <span
                              aria-hidden
                              className="text-base leading-none"
                            >
                              ⤓
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    title: "Fintech & APIs",
                    desc: "Payments, admin dashboards, secure backends",
                    border: "border-syntax-purple",
                    text: "text-syntax-purple",
                  },
                  {
                    title: "Streaming",
                    desc: "Live audio, video platforms, subscriptions",
                    border: "border-syntax-cyan",
                    text: "text-syntax-cyan",
                  },
                  {
                    title: "Mobile",
                    desc: "Flutter apps with polished UX",
                    border: "border-syntax-green",
                    text: "text-syntax-green",
                  },
                ].map(({ title, desc, border, text }) => (
                  <div
                    key={title}
                    className={`terminal-window p-4 border-t-2 ${border} hover:bg-[#1c2128] transition-colors text-left`}
                  >
                    <div
                      className={`mono text-sm font-semibold mb-1.5 ${text}`}
                    >
                      {title}
                    </div>
                    <p className="text-xs text-[#8b949e] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portrait */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-up w-full">
              <div className="relative hero-float w-full max-w-[520px] lg:max-w-none">
                <div className="absolute -inset-6 sm:-inset-8 rounded-[2rem] bg-gradient-to-br from-[#bc8cff]/35 via-[#58a6ff]/10 to-transparent blur-2xl" />
                <div className="relative w-full max-w-[440px] sm:max-w-none sm:w-[500px] mx-auto lg:mx-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-[#bc8cff]/10 bg-gradient-to-b from-[#2a2438] via-[#1a1525] to-[#161b22]">
                    <Image
                      src="/profile-pic.png"
                      alt="Dagmawi Kindu Mekonnen"
                      fill
                      className="object-cover object-[center_18%] scale-[1.02]"
                      sizes="(max-width: 640px) 90vw, 500px"
                      priority
                    />
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:-bottom-5 sm:left-0 sm:translate-x-0 sm:-left-8 w-[calc(100%-1.25rem)] sm:w-56 terminal-window px-4 py-3 shadow-xl border-syntax-cyan/30">
                    <div className="mono text-[10px] uppercase tracking-wider text-syntax-yellow mb-1">
                      Approach
                    </div>
                    <div className="mono text-sm text-[#c9d1d9]">
                      <span className="text-syntax-cyan">Design</span>
                      <span className="text-[#8b949e]"> → </span>
                      <span className="text-syntax-blue">Build</span>
                      <span className="text-[#8b949e]"> → </span>
                      <span className="text-syntax-green">Ship</span>
                    </div>
                  </div>

                  <div className="absolute -top-3 -right-3 sm:-right-6 hidden sm:block terminal-window px-3 py-2 shadow-lg">
                    <div className="mono text-xs text-syntax-green font-semibold">
                      3+ yrs
                    </div>
                    <div className="mono text-[10px] text-[#8b949e]">
                      production software
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14 lg:mt-16">
            <a
              href="#projects"
              className="group flex flex-col items-center gap-2 text-[#8b949e] hover:text-syntax-cyan transition-colors"
            >
              <span className="mono text-xs tracking-widest uppercase">
                Explore
              </span>
              <span className="text-syntax-cyan group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section - Main Focus */}
      <section
        id="projects"
        className="py-32 px-4 sm:px-6 lg:px-8 bg-[#161b22]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Featured Projects"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Projects</span>
              <span className="mono text-syntax-cyan"> I&apos;ve Built</span>
            </h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">
              A collection of projects showcasing my skills in full-stack
              development, system architecture, and modern web technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Terminal Management System */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setTmsPopupOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setTmsPopupOpen(true)}
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-cyan transition-all duration-300 glow-cyan cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src="/assets/tms1.png"
                  alt="Terminal Management System"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="mono text-[10px] font-semibold px-2.5 py-1 rounded-md bg-syntax-cyan/20 text-syntax-cyan border border-syntax-cyan/40">
                    Team Lead
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="mono text-syntax-cyan text-xl font-bold drop-shadow-lg">
                    Terminal Management System
                  </h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col border-t border-[#21262d] border-l-4 border-l-syntax-cyan bg-[#0d1117]/50">
                <p className="text-[#8b949e] text-sm mb-4 line-clamp-2 flex-1">
                  IoT-based terminal management with remote POS control,
                  transaction management, and device monitoring.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <TechTag
                    tech="NestJS"
                    colorClass="text-syntax-cyan border-syntax-cyan/50"
                  />
                  <TechTag
                    tech="MySQL"
                    colorClass="text-syntax-green border-syntax-green/50"
                  />
                  <TechTag
                    tech="Redis"
                    colorClass="text-syntax-purple border-syntax-purple/50"
                  />
                  <span className="mono text-xs px-2.5 py-1 bg-[#21262d] text-syntax-orange border border-syntax-orange/50 rounded-full">
                    BullMQ
                  </span>
                </div>
                <div className="mono text-xs font-medium text-syntax-cyan group-hover:underline">
                  View Details →
                </div>
              </div>
            </div>

            {/* Arifpay Admin Dashboard */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setAdminPopupOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setAdminPopupOpen(true)}
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-purple transition-all duration-300 glow-purple cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src="/assets/admin1.png"
                  alt="Arifpay Admin Dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="mono text-syntax-purple text-xl font-bold drop-shadow-lg">
                    Arifpay Admin Dashboard
                  </h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col border-t border-[#21262d] border-l-4 border-l-syntax-purple bg-[#0d1117]/50">
                <p className="text-[#8b949e] text-sm mb-4 line-clamp-2 flex-1">
                  Unified management platform for accounts, products, and
                  payment activities with real-time monitoring and reporting.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <TechTag
                    tech=".NET Core 8"
                    colorClass="text-syntax-blue border-syntax-blue/50"
                  />
                  <TechTag
                    tech="PostgreSQL"
                    colorClass="text-syntax-green border-syntax-green/50"
                  />
                  <TechTag
                    tech="React.js"
                    colorClass="text-syntax-cyan border-syntax-cyan/50"
                  />
                </div>
                <div className="mono text-xs font-medium text-syntax-purple group-hover:underline">
                  View Details →
                </div>
              </div>
            </div>

            {/* Arif FM */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setFmPopupOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setFmPopupOpen(true)}
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-green transition-all duration-300 glow-green cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src="/assets/fm3.png"
                  alt="Arif FM"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="mono text-syntax-green text-xl font-bold drop-shadow-lg">
                    Arif FM
                  </h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col border-t border-[#21262d] border-l-4 border-l-syntax-green bg-[#0d1117]/50">
                <p className="text-[#8b949e] text-sm mb-4 line-clamp-2 flex-1">
                  Podcast and live audio streaming with creator episodes,
                  community interaction, and listener tipping.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <TechTag
                    tech="Flutter"
                    colorClass="text-syntax-green border-syntax-green/50"
                  />
                  <TechTag
                    tech="Dart"
                    colorClass="text-syntax-blue border-syntax-blue/50"
                  />
                </div>
                <div className="mono text-xs font-medium text-syntax-green group-hover:underline">
                  View Details →
                </div>
              </div>
            </div>

            {/* Arts Plus */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setArtsPopupOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setArtsPopupOpen(true)}
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-orange transition-all duration-300 glow-orange cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src="/assets/arts1.png"
                  alt="Arts Plus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="mono text-[10px] font-semibold px-2.5 py-1 rounded-md bg-syntax-orange/20 text-syntax-orange border border-syntax-orange/40">
                    Team Lead
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="mono text-syntax-orange text-xl font-bold drop-shadow-lg">
                    Arts Plus
                  </h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col border-t border-[#21262d] border-l-4 border-l-syntax-orange bg-[#0d1117]/50">
                <p className="text-[#8b949e] text-sm mb-4 line-clamp-2 flex-1">
                  Subscription video streaming for arts and cultural content
                  with Bunny CDN, Redis, and AWS S3.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <TechTag
                    tech=".NET Core 8"
                    colorClass="text-syntax-blue border-syntax-blue/50"
                  />
                  <span className="mono text-xs px-2.5 py-1 bg-[#21262d] text-syntax-purple border border-syntax-purple/50 rounded-full">
                    Bunny CDN
                  </span>
                  <TechTag
                    tech="Redis"
                    colorClass="text-syntax-cyan border-syntax-cyan/50"
                  />
                  <span className="mono text-xs px-2.5 py-1 bg-[#21262d] text-syntax-green border border-syntax-green/50 rounded-full">
                    AWS S3
                  </span>
                </div>
                <div className="mono text-xs font-medium text-syntax-orange group-hover:underline">
                  View Details →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Work Experience"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Where I&apos;ve</span>
              <span className="mono text-syntax-cyan"> Worked</span>
            </h2>
          </div>

          <div className="relative space-y-10 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-px before:bg-[#30363d]">
            {EXPERIENCE.map((job, index) => (
              <article key={job.company} className="relative pl-10 sm:pl-12">
                <span
                  className={`absolute left-0 top-6 z-10 h-[22px] w-[22px] rounded-full border-2 bg-[#0d1117] ${
                    index === 0
                      ? "border-syntax-green shadow-[0_0_12px_rgba(63,185,80,0.35)]"
                      : "border-syntax-blue"
                  }`}
                />

                <div className="terminal-window p-6 sm:p-8 space-y-5">
                  <header className="space-y-3 pb-5 border-b border-[#21262d]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={`mono text-[11px] px-2.5 py-1 rounded-full border ${job.badge.className}`}
                      >
                        {job.badge.label}
                      </span>
                      <span className="mono text-xs text-[#8b949e]">
                        {job.period}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#e6edf3] mb-1">
                        {job.role}
                      </h3>
                      <p className="mono text-syntax-cyan text-base sm:text-lg">
                        {job.company}
                      </p>
                      <p className="mono text-xs text-[#8b949e] mt-1.5">
                        {job.location}
                      </p>
                    </div>
                    <p className="text-sm text-[#8b949e] leading-relaxed">
                      {job.summary}
                    </p>
                  </header>

                  {"highlights" in job && job.highlights && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {job.highlights.map((item) => (
                        <div
                          key={item.name}
                          className="rounded-lg border border-[#30363d]/80 bg-[#0d1117]/60 p-4 hover:border-[#484f58] transition-colors"
                        >
                          <div
                            className={`mono text-sm font-semibold ${item.color}`}
                          >
                            {item.name}
                          </div>
                          <p className="text-xs text-[#8b949e] mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {"bullets" in job && job.bullets && (
                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm text-[#c9d1d9] leading-relaxed"
                        >
                          <span className="text-syntax-blue mono shrink-0 mt-0.5">
                            ›
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="mono text-[11px] px-2.5 py-1 rounded-md border border-[#30363d] bg-[#21262d]/80 text-[#8b949e] hover:text-syntax-cyan hover:border-syntax-cyan/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#161b22]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Technical Skills"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Technologies</span>
              <span className="mono text-syntax-cyan"> I Use</span>
            </h2>
          </div>

          <div className="space-y-6">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className="terminal-window p-5 sm:p-6">
                <h3
                  className={`mono text-sm font-semibold mb-4 ${category.accent}`}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(({ name, color }) => {
                    const Icon = skillIcons[name];
                    return (
                      <span
                        key={name}
                        className={`mono text-xs sm:text-sm inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-[#0d1117]/50 transition-colors ${color}`}
                      >
                        {Icon && <Icon className="w-4 h-4 shrink-0" />}
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// About Me"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              <span className="font-sans">A Bit</span>
              <span className="mono text-syntax-cyan"> About Me</span>
            </h2>
            <p className="text-[#8b949e] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {ABOUT_DETAILS.tagline}
            </p>
          </div>

          <div className="terminal-window overflow-hidden">
            <div className="grid md:grid-cols-3 md:divide-x divide-[#21262d]">
              <div className="p-6 sm:p-7 md:col-span-2 border-b md:border-b-0 border-[#21262d]">
                <h3 className="mono text-xs uppercase tracking-wider text-syntax-cyan mb-4">
                  Education
                </h3>
                <ul className="space-y-4">
                  {ABOUT_DETAILS.education.map((item) => (
                    <li
                      key={item.degree}
                      className="flex justify-between gap-4 items-baseline"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#e6edf3]">
                          {item.degree}
                        </p>
                        <p className="mono text-xs text-[#8b949e] mt-0.5 truncate">
                          {item.school}
                        </p>
                      </div>
                      <span className="mono text-[11px] text-[#8b949e] shrink-0">
                        {item.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-7 space-y-6">
                <div>
                  <h3 className="mono text-xs uppercase tracking-wider text-syntax-purple mb-3">
                    Languages
                  </h3>
                  <p className="text-sm text-[#c9d1d9]">
                    {ABOUT_DETAILS.languages.join(" · ")}
                  </p>
                </div>
                <div>
                  <h3 className="mono text-xs uppercase tracking-wider text-syntax-orange mb-3">
                    Certification
                  </h3>
                  <p className="text-sm text-[#8b949e] leading-relaxed">
                    {ABOUT_DETAILS.certifications[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#161b22]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Resume"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">My</span>
              <span className="mono text-syntax-cyan"> Resume</span>
            </h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">
              Prefer a PDF? Grab the latest version, or open it in a new tab.
            </p>
          </div>

          <div className="terminal-window overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#21262d]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mono text-xs uppercase tracking-wider text-syntax-cyan mb-2">
                      PDF
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#e6edf3] truncate">
                      Dagmawi Kindu Mekonnen
                    </div>
                    <div className="mono text-xs text-[#8b949e] mt-2 break-all">
                      {RESUME_URL}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <span className="mono text-[11px] px-2.5 py-1 rounded-full border bg-syntax-cyan/10 text-syntax-cyan border-syntax-cyan/30">
                      Updated
                    </span>
                    <span className="mono text-[11px] px-2.5 py-1 rounded-full border bg-[#0d1117]/40 text-[#8b949e] border-[#30363d]">
                      ATS-friendly
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-[#30363d] bg-[#0d1117]/40 px-4 py-4 hover:border-syntax-purple/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="mono text-sm font-semibold text-syntax-purple">
                          View in new tab
                        </div>
                        <div className="text-xs text-[#8b949e] mt-1">
                          Quick preview in browser
                        </div>
                      </div>
                      <span
                        className="mono text-syntax-purple text-lg group-hover:translate-x-0.5 transition-transform"
                        aria-hidden
                      >
                        ↗
                      </span>
                    </div>
                  </a>

                  <a
                    href={RESUME_URL}
                    download
                    className="group rounded-lg border border-[#30363d] bg-[#0d1117]/40 px-4 py-4 hover:border-syntax-cyan/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="mono text-sm font-semibold text-syntax-cyan">
                          Download PDF
                        </div>
                        <div className="text-xs text-[#8b949e] mt-1">
                          Save it to your device
                        </div>
                      </div>
                      <span
                        className="mono text-syntax-cyan text-lg group-hover:translate-y-0.5 transition-transform"
                        aria-hidden
                      >
                        ⤓
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mono text-xs uppercase tracking-wider text-syntax-yellow mb-4">
                  Recruiter notes
                </div>
                <ul className="space-y-3 text-sm text-[#c9d1d9] leading-relaxed">
                  <li className="flex gap-3">
                    <span className="mono text-syntax-blue shrink-0 mt-0.5">
                      ›
                    </span>
                    <span>
                      Full-stack focus:{" "}
                      <span className="text-syntax-cyan">.NET</span>,{" "}
                      <span className="text-syntax-orange">NestJS</span>,{" "}
                      <span className="text-syntax-blue">Next.js</span>,{" "}
                      <span className="text-syntax-green">Flutter</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mono text-syntax-blue shrink-0 mt-0.5">
                      ›
                    </span>
                    <span>Fintech, streaming, and admin dashboards</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mono text-syntax-blue shrink-0 mt-0.5">
                      ›
                    </span>
                    <span>
                      Clean APIs, scalable systems, and reliable delivery
                    </span>
                  </li>
                </ul>

                <div className="mt-6 rounded-lg border border-[#30363d] bg-[#0d1117]/35 p-4">
                  <div className="mono text-[11px] text-[#8b949e]">
                    Tip: link this directly in applications
                  </div>
                  <div className="mono text-xs text-syntax-cyan mt-2 break-all">
                    {RESUME_URL}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#161b22]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Get In Touch"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Let&apos;s</span>
              <span className="mono text-syntax-cyan"> Connect</span>
            </h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your visions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:dagim16Kindu@gmail.com"
              className="terminal-window text-center p-6 hover:border-syntax-cyan transition-all glow-cyan group"
            >
              <div className="mono text-syntax-cyan text-3xl mb-3 group-hover:scale-110 transition-transform">
                ✉
              </div>
              <div className="mono text-syntax-blue text-sm mb-2">Email</div>
              <div className="mono text-xs text-[#8b949e] break-all">
                dagim16Kindu@gmail.com
              </div>
            </a>

            <a
              href="tel:+251970513180"
              className="terminal-window text-center p-6 hover:border-syntax-green transition-all glow-green group"
            >
              <div className="mono text-syntax-green text-3xl mb-3 group-hover:scale-110 transition-transform">
                📞
              </div>
              <div className="mono text-syntax-blue text-sm mb-2">Phone</div>
              <div className="mono text-xs text-[#8b949e]">+251970513180</div>
            </a>

            <a
              href="https://www.linkedin.com/in/dag-kin"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-window text-center p-6 hover:border-syntax-blue transition-all glow-blue group"
            >
              <FaLinkedin className="w-8 h-8 mx-auto mb-3 text-syntax-blue group-hover:scale-110 transition-transform" />
              <div className="mono text-syntax-blue text-sm mb-2">LinkedIn</div>
              <div className="mono text-xs text-[#8b949e]">dag-kin</div>
            </a>

            <div className="terminal-window text-center p-6">
              <div className="mono text-syntax-purple text-3xl mb-3">📍</div>
              <div className="mono text-syntax-blue text-sm mb-2">Location</div>
              <div className="mono text-xs text-[#8b949e]">
                Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TMS Popup / Slider */}
      {tmsPopupOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setTmsPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Terminal Management System gallery"
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border-2 border-syntax-cyan rounded-xl overflow-hidden shadow-2xl ring-4 ring-syntax-cyan/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#161b22] bg-gradient-to-r from-[#39c5cf08] to-transparent">
              <h3 className="mono text-syntax-cyan font-bold text-lg">
                Terminal Management System
              </h3>
              <button
                type="button"
                onClick={() => setTmsPopupOpen(false)}
                className="mono text-[#8b949e] hover:text-white p-2 rounded transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video max-h-[50vh] bg-[#161b22] flex items-center justify-center">
              <Image
                src={TMS_IMAGES[tmsSlideIndex]}
                alt={`TMS screenshot ${tmsSlideIndex + 1}`}
                width={1200}
                height={675}
                className="object-contain w-full h-full"
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrevTms();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-cyan text-syntax-cyan hover:bg-syntax-cyan/20 flex items-center justify-center mono text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNextTms();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-cyan text-syntax-cyan hover:bg-syntax-cyan/20 flex items-center justify-center mono text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 border-t border-[#21262d] bg-[#161b22]">
              {TMS_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlideTms(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === tmsSlideIndex ? "bg-syntax-cyan scale-125" : "bg-[#21262d] hover:bg-[#30363d]"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="mono text-center text-xs text-[#8b949e]">
              {tmsSlideIndex + 1} / {TMS_IMAGES.length}
            </div>
            <ProjectDescriptionPanel
              accentBorder="border-syntax-cyan"
              accentLabel="text-syntax-cyan"
              accentGlow="bg-syntax-cyan"
            >
              {highlightDescription(PROJECT_DESCRIPTIONS.tms)}
            </ProjectDescriptionPanel>
          </div>
        </div>
      )}

      {/* Arif FM Popup / Slider */}
      {fmPopupOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setFmPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Arif FM gallery"
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border-2 border-syntax-green rounded-xl overflow-hidden shadow-2xl ring-4 ring-syntax-green/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#161b22] bg-gradient-to-r from-[#3fb95008] to-transparent">
              <h3 className="mono text-syntax-green font-bold text-lg">
                Arif FM
              </h3>
              <button
                type="button"
                onClick={() => setFmPopupOpen(false)}
                className="mono text-[#8b949e] hover:text-white p-2 rounded transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video max-h-[50vh] bg-[#161b22] flex items-center justify-center">
              <Image
                src={FM_IMAGES[fmSlideIndex]}
                alt={`Arif FM screenshot ${fmSlideIndex + 1}`}
                width={1200}
                height={675}
                className="object-contain w-full h-full"
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrevFm();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-green text-syntax-green hover:bg-syntax-green/20 flex items-center justify-center mono text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNextFm();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-green text-syntax-green hover:bg-syntax-green/20 flex items-center justify-center mono text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 border-t border-[#21262d] bg-[#161b22]">
              {FM_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlideFm(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === fmSlideIndex ? "bg-syntax-green scale-125" : "bg-[#21262d] hover:bg-[#30363d]"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="mono text-center text-xs text-[#8b949e]">
              {fmSlideIndex + 1} / {FM_IMAGES.length}
            </div>
            <ProjectDescriptionPanel
              accentBorder="border-syntax-green"
              accentLabel="text-syntax-green"
              accentGlow="bg-syntax-green"
            >
              {highlightDescription(PROJECT_DESCRIPTIONS.arifFm)}
            </ProjectDescriptionPanel>
          </div>
        </div>
      )}

      {/* Arts Plus Popup / Slider */}
      {artsPopupOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setArtsPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Arts Plus gallery"
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border-2 border-syntax-orange rounded-xl overflow-hidden shadow-2xl ring-4 ring-syntax-orange/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#161b22] bg-gradient-to-r from-[#ff7b7208] to-transparent">
              <h3 className="mono text-syntax-orange font-bold text-lg">
                Arts Plus
              </h3>
              <button
                type="button"
                onClick={() => setArtsPopupOpen(false)}
                className="mono text-[#8b949e] hover:text-white p-2 rounded transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video max-h-[50vh] bg-[#161b22] flex items-center justify-center">
              <Image
                src={ARTS_IMAGES[artsSlideIndex]}
                alt={`Arts Plus screenshot ${artsSlideIndex + 1}`}
                width={1200}
                height={675}
                className="object-contain w-full h-full"
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrevArts();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-orange text-syntax-orange hover:bg-syntax-orange/20 flex items-center justify-center mono text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNextArts();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-orange text-syntax-orange hover:bg-syntax-orange/20 flex items-center justify-center mono text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 border-t border-[#21262d] bg-[#161b22]">
              {ARTS_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlideArts(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === artsSlideIndex ? "bg-syntax-orange scale-125" : "bg-[#21262d] hover:bg-[#30363d]"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="mono text-center text-xs text-[#8b949e]">
              {artsSlideIndex + 1} / {ARTS_IMAGES.length}
            </div>
            <ProjectDescriptionPanel
              accentBorder="border-syntax-orange"
              accentLabel="text-syntax-orange"
              accentGlow="bg-syntax-orange"
            >
              {highlightDescription(PROJECT_DESCRIPTIONS.artsPlus)}
            </ProjectDescriptionPanel>
          </div>
        </div>
      )}

      {/* Admin Dashboard Popup / Slider */}
      {adminPopupOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setAdminPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Arifpay Admin Dashboard gallery"
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border-2 border-syntax-purple rounded-xl overflow-hidden shadow-2xl ring-4 ring-syntax-purple/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#161b22] bg-gradient-to-r from-[#bc8cff08] to-transparent">
              <h3 className="mono text-syntax-purple font-bold text-lg">
                Arifpay Admin Dashboard
              </h3>
              <button
                type="button"
                onClick={() => setAdminPopupOpen(false)}
                className="mono text-[#8b949e] hover:text-white p-2 rounded transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video max-h-[50vh] bg-[#161b22] flex items-center justify-center">
              <Image
                src={ADMIN_IMAGES[adminSlideIndex]}
                alt={`Admin dashboard screenshot ${adminSlideIndex + 1}`}
                width={1200}
                height={675}
                className="object-contain w-full h-full"
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-purple text-syntax-purple hover:bg-syntax-purple/20 flex items-center justify-center mono text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#21262d] border border-syntax-purple text-syntax-purple hover:bg-syntax-purple/20 flex items-center justify-center mono text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 border-t border-[#21262d] bg-[#161b22]">
              {ADMIN_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === adminSlideIndex ? "bg-syntax-purple scale-125" : "bg-[#21262d] hover:bg-[#30363d]"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="mono text-center text-xs text-[#8b949e]">
              {adminSlideIndex + 1} / {ADMIN_IMAGES.length}
            </div>
            <ProjectDescriptionPanel
              accentBorder="border-syntax-purple"
              accentLabel="text-syntax-purple"
              accentGlow="bg-syntax-purple"
            >
              {highlightDescription(PROJECT_DESCRIPTIONS.adminDashboard)}
            </ProjectDescriptionPanel>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#21262d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="mono text-xs text-[#8b949e]">
              <span className="text-syntax-blue">$</span>{" "}
              <span className="text-syntax-cyan">whoami</span>
              <span className="text-terminal-green ml-2">
                → Dagmawi Kindu Mekonnen
              </span>
            </div>
            <div className="mono text-xs text-[#8b949e]">
              <span className="text-syntax-purple">{`//`}</span>{" "}
              <span className="text-syntax-yellow">Always</span>{" "}
              <span className="text-syntax-green">learning</span>,{" "}
              <span className="text-syntax-cyan">always</span>{" "}
              <span className="text-syntax-blue">coding</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
