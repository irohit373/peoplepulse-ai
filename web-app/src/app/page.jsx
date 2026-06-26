"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { useTheme } from "next-themes";
import {
  Briefcase, Users, Sparkles, Star, Target, CheckCircle,
  ArrowRight, Rocket, Brain, Zap, BarChart3, Clock, Shield,
  ChevronRight, Award, Calendar, Mail, Search, Filter,
  TrendingUp
} from "lucide-react";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

const quickStats = [
  { label: "Jobs Posted", value: "10K+" },
  { label: "Happy Candidates", value: "5K+" },
  { label: "Time Saved", value: "80%" },
  { label: "Success Rate", value: "95%" },
];

const highlights = [
  "Built AI-first products that reduced time-to-hire by nearly 60%.",
  "ML-powered resume scoring with top candidate match accuracy.",
  "Automated interview scheduling with Google Calendar sync.",
];

const features = [
  {
    icon: Brain,
    title: "AI Candidate Scoring",
    desc: "ML-powered analysis ranks applicants by fit. No more manual resume screening.",
    color: "#7c3aed",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc: "Auto-schedule interviews with Google Calendar. Candidates pick their slot.",
    color: "#06b6d4",
  },
  {
    icon: BarChart3,
    title: "Analytics Pipeline",
    desc: "Real-time recruitment funnel insights. Know exactly where every candidate is.",
    color: "#10b981",
  },
  {
    icon: Mail,
    title: "Email Automation",
    desc: "Automated candidate communications from application to offer letter.",
    color: "#f59e0b",
  },
  {
    icon: Search,
    title: "Resume Parser",
    desc: "Extract skills, experience, and education from any PDF resume automatically.",
    color: "#7c3aed",
  },
  {
    icon: Filter,
    title: "Job Matching",
    desc: "Intelligent matching algorithm surfaces the best candidates for every role.",
    color: "#06b6d4",
  },
];

const steps = [
  {
    icon: Target,
    title: "Post Jobs",
    desc: "Create detailed job postings with AI-generated descriptions and requirements.",
    step: "01",
  },
  {
    icon: Zap,
    title: "Screen Automatically",
    desc: "AI scores every resume against your criteria. Top matches surface first.",
    step: "02",
  },
  {
    icon: Rocket,
    title: "Hire Faster",
    desc: "Schedule interviews, collaborate with your team, and extend offers — all in one place.",
    step: "03",
  },
];

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const isThemeReady = typeof resolvedTheme === "string";
  const [activeSection, setActiveSection] = useState("#home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef(null);

  // Track scroll for progress bar and sticky nav state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active nav section
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href);
    const sectionElements = sectionIds
      .map((href) => document.querySelector(href))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const topMost = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        if (topMost?.target?.id) {
          setActiveSection(`#${topMost.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.18, 0.32, 0.5],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(Math.max(nextProgress, 0), 1));
    };

    handleScrollProgress();
    window.addEventListener("scroll", handleScrollProgress, { passive: true });
    window.addEventListener("resize", handleScrollProgress);

    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
      window.removeEventListener("resize", handleScrollProgress);
    };
  }, []);

  // Reveal animations
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.78,
      wheelMultiplier: 1.08,
      touchMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const toggleTheme = () => {
    if (!isThemeReady) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleSmoothNav = (event, href) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setActiveSection(href);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 0.62, offset: -88 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", href);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 text-black transition-colors dark:text-white md:px-6 md:py-10">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Sticky Nav */}
      <div className="sticky top-3 z-40 mb-5 flex flex-col gap-3 border border-black/10 bg-white/65 px-3 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/45 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <Link
          href="/"
          className="inline-flex w-fit border border-black/20 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur dark:border-white/30 dark:bg-black/40"
        >
          velocity h
        </Link>
        <div className="sticky-nav flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleSmoothNav(event, item.href)}
              aria-current={activeSection === item.href ? "page" : undefined}
              className={activeSection === item.href ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/jobs"
            className="ml-1 border border-black/20 bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black dark:border-white/40 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
          >
            Browse Jobs
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 border-2 border-black bg-white px-3 py-1 text-lg leading-none transition-transform hover:-translate-y-0.5 dark:border-white dark:bg-black"
            aria-label="Toggle dark mode"
            disabled={!isThemeReady}
          >
            {isThemeReady ? (resolvedTheme === "dark" ? "☀️" : "🌙") : "◐"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="section-card reveal relative overflow-hidden border-2 border-black px-6 py-10 transition-colors dark:border-white md:px-10 md:py-16 lg:min-h-[86vh] lg:py-20"
      >
        {/* Background Glows */}
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-purple-300/40 blur-3xl dark:bg-purple-400/20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl dark:bg-cyan-500/20"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div>
            <p className="fade-up mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-purple-600 dark:text-purple-400">
              AI Recruitment Platform
            </p>
            <h1 className="fade-up gradient-text text-5xl font-black uppercase leading-[0.86] tracking-tighter md:text-7xl lg:text-8xl">
              Hire Smarter
              <br />
              Ship Faster
            </h1>
            <p className="fade-up mt-4 text-sm font-bold leading-loose md:text-base">
              AI-powered recruitment SaaS that screens candidates, scores resumes, and schedules
              interviews — cutting your hiring cycle by up to 60%.
            </p>

            <div className="fade-up mt-6 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="border-2 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                Get Started Free
                <ArrowRight size={14} className="ml-1 inline" />
              </Link>
              <Link
                href="/jobs"
                className="border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
              >
                Browse Openings
                <Briefcase size={14} className="ml-1 inline" />
              </Link>
            </div>

            {/* Stats */}
            <div className="fade-up mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-black/10 p-3 text-center dark:border-white/10"
                >
                  <p className="gradient-text text-2xl font-black md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest opacity-60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Panel */}
          <div className="highlight-panel">
            {highlights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section
        id="platform"
        className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8"
      >
        <p className="section-label">Platform</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">
          Complete Recruitment SaaS
        </h2>
        <p className="font-bold leading-loose">
          From posting jobs to extending offers — a single platform for the entire hiring pipeline.
          Built with AI at the core to eliminate busywork and surface the best candidates.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Briefcase, label: "Job Posting", desc: "AI-assisted job descriptions with smart tagging" },
            { icon: Users, label: "Applicant Tracking", desc: "Full pipeline management with drag-and-drop stages" },
            { icon: Brain, label: "AI Scoring", desc: "ML resume analysis with match percentage" },
            { icon: Calendar, label: "Scheduling", desc: "Auto-sync interviews via Google Calendar" },
          ].map((item) => (
            <div key={item.label} className="zed-card">
              <item.icon size={24} className="mb-3 text-purple-600 dark:text-purple-400" />
              <h3 className="text-base font-black uppercase tracking-tight">{item.label}</h3>
              <p className="mt-2 text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8"
      >
        <p className="section-label">Features</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">
          Everything You Need
        </h2>
        <p className="mb-8 font-bold leading-loose">
          No more switching between spreadsheets, email, and calendar apps. Everything lives here.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="project-card reveal border-2 border-black/10 p-5 transition-colors dark:border-white/10"
              style={{ "--accent-color": feature.color }}
            >
              <feature.icon size={28} className="mb-3" style={{ color: feature.color }} />
              <h3 className="text-base font-black uppercase tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8"
      >
        <p className="section-label">How It Works</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">
          3 Steps to Faster Hiring
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.step} className="zed-card">
              <p className="mb-2 text-4xl font-black text-purple-600/30 dark:text-purple-400/30">
                {step.step}
              </p>
              <step.icon size={28} className="mb-3 text-cyan-500" />
              <h3 className="text-xl font-black uppercase tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8"
      >
        <p className="section-label">Get Started</p>
        <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">
          Ready to Ship Faster?
        </h2>
        <p className="font-bold leading-loose">
          Join 500+ companies using Velocity H to streamline their recruitment. Free to start,
          no credit card required.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="contact-link-gradient border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            Create Free Account
            <ArrowRight size={14} className="ml-1 inline" />
          </Link>
          <Link
            href="/signin"
            className="border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle size={14} />
            Free plan available
          </span>
          <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
            <Shield size={14} />
            Enterprise-grade security
          </span>
          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
            <Star size={14} />
            4.9/5 from HR teams
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.24em]">velocity h</p>
          <p>© 2026 Velocity H. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-wider">
            <a href="https://github.com/irohit373/Velocity-HR" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:deshmukhrohit373@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
