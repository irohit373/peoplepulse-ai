import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { UserProvider } from "@/providers/UserProvider";
import NavbarWrapper from "@/components/NavbarWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "VELOCITY H - AI Recruitment & Scheduling Platform",
  description:
    "AI Recruitment SaaS with resume screening, candidate matching, and fast interview scheduling.",
};

// Force dynamic rendering for all pages that use cookies
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body
        className="font-sans bg-white text-black transition-colors duration-240 dark:bg-black dark:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <UserProvider user={user}>
            <NavbarWrapper />
            <main className="min-h-screen">
              {children}
            </main>
          </UserProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
