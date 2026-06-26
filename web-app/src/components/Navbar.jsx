"use client";

import Link from "next/link";
import { useUser } from "@/providers/UserProvider";
import UserDropdown from "./UserDropdown";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isThemeReady = typeof resolvedTheme === "string";

  const toggleTheme = () => {
    if (!isThemeReady) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-black/10 bg-white/85 px-4 py-2 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-black/85 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
              velocity h
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/jobs"
              className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black/60 transition-colors hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Jobs
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border-2 border-black bg-white px-2.5 py-1 text-sm leading-none transition-transform hover:-translate-y-0.5 dark:border-white dark:bg-black"
              aria-label="Toggle dark mode"
              disabled={!isThemeReady}
            >
              {isThemeReady ? (resolvedTheme === "dark" ? "☀️" : "🌙") : "◐"}
            </button>

            {user ? (
              <UserDropdown user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signup"
                  className="rounded-full border-2 border-black px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="rounded-full border-2 border-black bg-black px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-black md:hidden">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 dark:border-white/10">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
              velocity h
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-2 p-6">
            <Link
              href="/jobs"
              className="block rounded-lg px-4 py-3 font-black uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>

            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-black uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isThemeReady && (resolvedTheme === "dark" ? "☀️" : "🌙")}
              <span>{isThemeReady && (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode")}</span>
            </button>

            {user ? (
              <>
                <div className="border-t border-black/10 pt-6 dark:border-white/10">
                  <p className="px-4 text-[10px] font-black uppercase tracking-widest opacity-50">
                    Account
                  </p>
                </div>

                <div className="mx-4 mt-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
                  <p className="font-bold">{user.name || "User"}</p>
                  <p className="text-sm opacity-60">{user.email}</p>
                </div>

                <Link
                  href="/dashboard"
                  className="block rounded-lg px-4 py-3 font-bold hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/recruitment"
                  className="block rounded-lg px-4 py-3 font-bold hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recruitment
                </Link>
                <Link
                  href="/dashboard/scheduling"
                  className="block rounded-lg px-4 py-3 font-bold hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Scheduling
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-4 block w-full rounded-lg px-4 py-3 text-left font-black uppercase tracking-wider text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-6 space-y-3">
                <Link
                  href="/signup"
                  className="block rounded-lg border-2 border-black px-4 py-3 text-center font-black uppercase tracking-wider dark:border-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="block rounded-lg border-2 border-black bg-black px-4 py-3 text-center font-black uppercase tracking-wider text-white dark:border-white dark:bg-white dark:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
