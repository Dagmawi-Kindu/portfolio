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
      (i) => (index + ADMIN_IMAGES.length) % ADMIN_IMAGES.length,
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
    setTmsSlideIndex(
      (i) => (index + TMS_IMAGES.length) % TMS_IMAGES.length,
    );
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
    setArtsSlideIndex(
      (i) => (index + ARTS_IMAGES.length) % ARTS_IMAGES.length,
    );
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
    setFmSlideIndex(
      (i) => (index + FM_IMAGES.length) % FM_IMAGES.length,
    );
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
                href="#contact"
                className="mono text-sm text-[#8b949e] hover:text-syntax-cyan transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(88,166,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(57,197,207,0.1),transparent_50%)]"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="mono text-syntax-green text-lg">
                  Hi, my name is
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="font-sans">Dagmawi Kindu</span>
                  <br />
                  <span className="mono text-syntax-cyan">Mekonnen</span>
                </h1>
                <div className="mono text-2xl sm:text-3xl text-syntax-blue">
                  Full-Stack Developer
                </div>
              </div>

              <p className="text-lg text-[#8b949e] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Building scalable systems and architectures with modern
                technologies. Passionate about problem-solving and delivering
                high-performance solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-8 py-3 bg-syntax-blue text-white rounded-lg mono font-semibold hover:bg-[#4493f8] transition-all glow-blue inline-block text-center"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 border-2 border-syntax-cyan text-syntax-cyan rounded-lg mono font-semibold hover:bg-syntax-cyan/10 transition-all inline-block text-center"
                >
                  Get In Touch
                </a>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#21262d]">
                <div className="text-center lg:text-left">
                  <div className="mono text-3xl font-bold text-syntax-green">
                    3+
                  </div>
                  <div className="text-sm text-[#8b949e]">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="mono text-3xl font-bold text-syntax-purple">
                    10+
                  </div>
                  <div className="text-sm text-[#8b949e]">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="mono text-3xl font-bold text-syntax-cyan">
                    Full
                  </div>
                  <div className="text-sm text-[#8b949e]">Stack</div>
                </div>
              </div>
            </div>

            {/* Right side - Profile Image */}
            <div className="relative flex justify-center lg:justify-end animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-syntax-cyan rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative rounded-2xl border-2 border-syntax-cyan p-2 glow-cyan">
                  <Image
                    src="/profile-placeholder.svg"
                    alt="Dagmawi Kindu Mekonnen"
                    width={400}
                    height={400}
                    className="rounded-xl"
                    priority
                  />
                </div>
                {/* Floating code snippets */}
                <div className="absolute -top-4 -left-4 terminal-window p-3 mono text-xs hidden lg:block">
                  <div className="text-syntax-yellow">const</div>
                  <div className="text-syntax-blue">developer</div>
                  <div className="text-syntax-purple">=</div>
                  <div className="text-syntax-green">
                    &apos;Full-Stack&apos;
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 terminal-window p-3 mono text-xs hidden lg:block">
                  <div className="text-syntax-blue">function</div>
                  <div className="text-syntax-cyan">build()</div>
                  <div className="text-syntax-purple">{`{`}</div>
                  <div className="text-syntax-green pl-2">return awesome;</div>
                  <div className="text-syntax-purple">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="mono text-syntax-blue text-sm">↓ scroll</div>
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
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-cyan transition-all duration-300 glow-cyan cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/assets/tms1.png"
                  alt="Terminal Management System"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="terminal-window px-3 py-1 mono text-xs text-syntax-green">
                    Team Lead
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mono text-syntax-cyan text-2xl font-bold mb-2">
                  Terminal Management System
                </h3>
                <p className="text-[#8b949e] mb-4 line-clamp-2">
                  IoT-based terminal management system with remote POS control,
                  transaction management, and device monitoring.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                  <span className="mono text-xs px-3 py-1 bg-[#21262d] text-syntax-orange border border-syntax-orange/50 rounded-full">
                    BullMQ
                  </span>
                </div>
                <div className="mono text-sm text-syntax-blue hover:text-syntax-cyan transition-colors">
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
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-purple transition-all duration-300 glow-blue cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/assets/admin1.png"
                  alt="Arifpay Admin Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="mono text-syntax-purple text-2xl font-bold mb-2">
                  Arifpay Admin Dashboard
                </h3>
                <p className="text-[#8b949e] mb-4 line-clamp-2">
                  Comprehensive admin dashboard for merchant management, account
                  monitoring, and transaction tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                <div className="mono text-sm text-syntax-blue hover:text-syntax-purple transition-colors">
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
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-green transition-all duration-300 glow-green cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/assets/fm3.png"
                  alt="Arif FM"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="mono text-syntax-green text-2xl font-bold mb-2">
                  Arif FM
                </h3>
                <p className="text-[#8b949e] mb-4 line-clamp-2">
                  Audio streaming platform for radio stations with live
                  streaming, news features, and subscription management.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <TechTag
                    tech="Flutter"
                    colorClass="text-syntax-green border-syntax-green/50"
                  />
                  <TechTag
                    tech="Dart"
                    colorClass="text-syntax-blue border-syntax-blue/50"
                  />
                </div>
                <div className="mono text-sm text-syntax-blue hover:text-syntax-green transition-colors">
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
              className="group relative overflow-hidden rounded-xl border-2 border-[#21262d] bg-[#0d1117] hover:border-syntax-orange transition-all duration-300 glow-blue cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/assets/arts1.png"
                  alt="Arts Plus"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="terminal-window px-3 py-1 mono text-xs text-syntax-green">
                    Team Lead
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mono text-syntax-orange text-2xl font-bold mb-2">
                  Arts Plus
                </h3>
                <p className="text-[#8b949e] mb-4 line-clamp-2">
                  Video streaming platform with web, mobile app, and admin
                  dashboard. Integrated with Bunny CDN, Redis, and AWS S3.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <TechTag
                    tech=".NET Core 8"
                    colorClass="text-syntax-blue border-syntax-blue/50"
                  />
                  <span className="mono text-xs px-3 py-1 bg-[#21262d] text-syntax-purple border border-syntax-purple/50 rounded-full">
                    Bunny CDN
                  </span>
                  <TechTag
                    tech="Redis"
                    colorClass="text-syntax-cyan border-syntax-cyan/50"
                  />
                  <span className="mono text-xs px-3 py-1 bg-[#21262d] text-syntax-green border border-syntax-green/50 rounded-full">
                    AWS S3
                  </span>
                </div>
                <div className="mono text-sm text-syntax-blue hover:text-syntax-orange transition-colors">
                  View Details →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Work Experience"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Where I&apos;ve</span>
              <span className="mono text-syntax-cyan"> Worked</span>
            </h2>
          </div>

          <div className="space-y-8">
            {/* Current Position */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-syntax-green to-syntax-cyan"></div>
              <div className="ml-8 terminal-window border-l-4 border-syntax-green">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="mono text-syntax-green text-2xl font-bold">
                        Full Stack Software Developer
                      </h3>
                      <span className="mono text-xs px-2 py-1 bg-syntax-green/20 text-syntax-green rounded-full">
                        Current
                      </span>
                    </div>
                    <div className="mono text-syntax-cyan text-lg mb-1">
                      Arifpay Financial Technologies
                    </div>
                    <div className="mono text-syntax-yellow text-sm">
                      Addis Ababa, Ethiopia
                    </div>
                  </div>
                  <div className="mono text-syntax-cyan text-sm mt-2 sm:mt-0">
                    07/2023 → Present
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <div className="mono text-syntax-blue text-sm font-semibold mb-2">
                      Key Achievements:
                    </div>
                    <ul className="space-y-2 text-sm text-[#c9d1d9]">
                      <li className="flex items-start gap-2">
                        <span className="text-terminal-green mono mt-1">▸</span>
                        <span>
                          Led Terminal Management System development (Team Lead)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terminal-green mono mt-1">▸</span>
                        <span>
                          Built Arifpay Admin Dashboard backend with .NET Core 8
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terminal-green mono mt-1">▸</span>
                        <span>
                          Developed Arif FM Flutter app for audio streaming
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="mono text-syntax-blue text-sm font-semibold mb-2">
                      Technologies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-cyan rounded">
                        NestJS
                      </span>
                      <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-blue rounded">
                        .NET Core
                      </span>
                      <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-green rounded">
                        Flutter
                      </span>
                      <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-purple rounded">
                        PostgreSQL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Position */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-syntax-blue/50"></div>
              <div className="ml-8 terminal-window border-l-4 border-syntax-blue">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className="mono text-syntax-blue text-2xl font-bold mb-2">
                      Backend Software Developer
                    </h3>
                    <div className="mono text-syntax-cyan text-lg mb-1">
                      Awra Delivery
                    </div>
                    <div className="mono text-syntax-yellow text-sm">
                      Addis Ababa, Ethiopia
                    </div>
                  </div>
                  <div className="mono text-syntax-cyan text-sm mt-2 sm:mt-0">
                    05/2023 → 07/2023
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[#c9d1d9]">
                  <p className="mb-3">
                    Software development intern contributing to e-commerce and
                    chat applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-cyan rounded">
                      NestJS
                    </span>
                    <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-green rounded">
                      React
                    </span>
                    <span className="mono text-xs px-2 py-1 bg-[#21262d] text-syntax-blue rounded">
                      Flutter
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#161b22]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// Technical Skills"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">Technologies</span>
              <span className="mono text-syntax-cyan"> I Use</span>
            </h2>
          </div>

          {/* All skills in a unified grid */}
          <div className="terminal-window p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[
                {
                  name: "C#",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "JavaScript",
                  color:
                    "text-syntax-yellow border-syntax-yellow/50 hover:bg-syntax-yellow/10",
                },
                {
                  name: "TypeScript",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "Dart",
                  color:
                    "text-syntax-cyan border-syntax-cyan/50 hover:bg-syntax-cyan/10",
                },
                {
                  name: "NestJS",
                  color:
                    "text-syntax-orange border-syntax-orange/50 hover:bg-syntax-orange/10",
                },
                {
                  name: ".NET Core",
                  color:
                    "text-syntax-purple border-syntax-purple/50 hover:bg-syntax-purple/10",
                },
                {
                  name: "NodeJS",
                  color:
                    "text-syntax-green border-syntax-green/50 hover:bg-syntax-green/10",
                },
                {
                  name: "ReactJS",
                  color:
                    "text-syntax-cyan border-syntax-cyan/50 hover:bg-syntax-cyan/10",
                },
                {
                  name: "Handlebars",
                  color:
                    "text-syntax-orange border-syntax-orange/50 hover:bg-syntax-orange/10",
                },
                {
                  name: "Vanilla JS",
                  color:
                    "text-syntax-yellow border-syntax-yellow/50 hover:bg-syntax-yellow/10",
                },
                {
                  name: "MySQL",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "PostgreSQL",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "MongoDB",
                  color:
                    "text-syntax-green border-syntax-green/50 hover:bg-syntax-green/10",
                },
                {
                  name: "MSSQL",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "Flutter",
                  color:
                    "text-syntax-cyan border-syntax-cyan/50 hover:bg-syntax-cyan/10",
                },
                {
                  name: "Docker",
                  color:
                    "text-syntax-blue border-syntax-blue/50 hover:bg-syntax-blue/10",
                },
                {
                  name: "CI/CD",
                  color:
                    "text-syntax-purple border-syntax-purple/50 hover:bg-syntax-purple/10",
                },
                {
                  name: "Nginx",
                  color:
                    "text-syntax-green border-syntax-green/50 hover:bg-syntax-green/10",
                },
                {
                  name: "Redis",
                  color:
                    "text-syntax-orange border-syntax-orange/50 hover:bg-syntax-orange/10",
                },
              ].map(({ name, color }) => {
                const Icon = skillIcons[name];
                return (
                  <div
                    key={name}
                    className={`mono text-sm px-4 py-3 bg-[#21262d] border rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 glow-cyan ${color}`}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="text-center">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-syntax-yellow text-sm mb-4">
              {"// About Me"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-sans">A Bit</span>
              <span className="mono text-syntax-cyan"> About Me</span>
            </h2>
          </div>

          {/* About Text */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="code-block p-8 space-y-6">
              <div className="mono text-syntax-yellow text-sm mb-6 opacity-70">
                {"// Professional Summary"}
              </div>
              <div className="space-y-5">
                <p className="text-xl leading-relaxed text-[#c9d1d9] font-sans">
                  I&apos;m a{" "}
                  <span className="text-syntax-blue font-bold">
                    full-stack software developer
                  </span>{" "}
                  with{" "}
                  <span className="text-syntax-green font-bold">3+ years</span>{" "}
                  of experience building scalable systems and architectures.
                </p>
                <p className="text-lg leading-relaxed text-[#b1bac4] font-sans">
                  I focus on{" "}
                  <span className="text-syntax-cyan">problem solving</span>,
                  designing{" "}
                  <span className="text-syntax-purple">
                    robust applications
                  </span>
                  , and delivering{" "}
                  <span className="text-syntax-green">
                    reliable, high-performance solutions
                  </span>{" "}
                  using modern technologies, while adapting quickly to any work
                  or responsibilities assigned.
                </p>
              </div>
            </div>
          </div>

          {/* Education, Languages & Certifications */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Education */}
            <div className="terminal-window p-6">
              <div className="mono text-syntax-cyan text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🎓</span>
                <span>Education</span>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-syntax-green pl-4">
                  <div className="mono text-syntax-green text-sm font-semibold mb-1">
                    Bachelor of Science
                  </div>
                  <div className="mono text-xs text-[#8b949e] mb-1">
                    Computer Science
                  </div>
                  <div className="mono text-xs text-syntax-yellow">
                    HiLCoE School of Computer Science
                  </div>
                  <div className="mono text-xs text-syntax-purple mt-1">
                    02/2023
                  </div>
                </div>
                <div className="border-l-2 border-syntax-blue pl-4">
                  <div className="mono text-syntax-blue text-sm font-semibold mb-1">
                    High School Diploma
                  </div>
                  <div className="mono text-xs text-[#8b949e] mb-1">
                    One Planet International School
                  </div>
                  <div className="mono text-xs text-syntax-purple">07/2018</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="terminal-window p-6">
              <div className="mono text-syntax-purple text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🌐</span>
                <span>Languages</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-syntax-green"></div>
                  <span className="mono text-sm text-[#c9d1d9]">English</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-syntax-cyan"></div>
                  <span className="mono text-sm text-[#c9d1d9]">Amharic</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="terminal-window p-6">
              <div className="mono text-syntax-orange text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🏆</span>
                <span>Certifications</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terminal-green mono mt-0.5">▸</span>
                  <span className="mono text-sm text-[#c9d1d9]">
                    Marketable software development 101 training
                  </span>
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
      <footer className="py-16 px-4 border-t border-[#21262d] bg-[#0d1117]">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-window p-6 mb-6">
            <div className="mono text-xs text-syntax-yellow mb-2">
              {"// Programming Joke of the Day"}
            </div>
            <div className="mono text-sm text-[#c9d1d9]">
              <span className="text-syntax-blue">const</span> joke ={" "}
              <span className="text-syntax-green">
                &apos;Why do programmers prefer dark mode?&apos;
              </span>
              ;<br />
              <span className="text-syntax-blue">console</span>.
              <span className="text-syntax-cyan">log</span>(
              <span className="text-syntax-green">
                &apos;Because light attracts bugs! 🐛&apos;
              </span>
              );
            </div>
          </div>

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
