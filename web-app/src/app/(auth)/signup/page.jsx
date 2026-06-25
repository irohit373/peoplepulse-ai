'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      window.location.href = '/dashboard';
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-6xl items-center justify-center px-4">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Branding */}
          <div className="hidden flex-col justify-center lg:flex">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-purple-600 dark:text-purple-400">
              AI Recruitment Platform
            </p>
            <h1 className="gradient-text text-5xl font-black uppercase leading-[0.86] tracking-tighter md:text-6xl lg:text-7xl">
              Start Hiring
              <br />
              Smarter
            </h1>
            <p className="mt-4 text-sm font-bold leading-loose opacity-70">
              Create your free account. No credit card required. Set up your first job posting in minutes.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Free plan — forever',
                'AI-powered resume scoring',
                'Google Calendar integration',
                'Enterprise-grade security',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="section-card w-full border-2 border-black p-8 dark:border-white">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-black bg-white dark:border-white dark:bg-black">
                <User size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Create Account</h2>
              <p className="mt-1 text-sm opacity-60">Get started for free</p>
            </div>

            {error && (
              <div className="mb-4 border-2 border-red-500 bg-red-50 p-3 text-center text-sm font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-[11px] font-black uppercase tracking-widest">
                  Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User size={18} className="opacity-40" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-black/20 bg-transparent px-4 py-3 pl-12 text-sm font-bold transition-colors focus:border-black focus:outline-none dark:border-white/20 dark:focus:border-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-black uppercase tracking-widest">
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail size={18} className="opacity-40" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-black/20 bg-transparent px-4 py-3 pl-12 text-sm font-bold transition-colors focus:border-black focus:outline-none dark:border-white/20 dark:focus:border-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-black uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={18} className="opacity-40" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-black/20 bg-transparent px-4 py-3 pl-12 text-sm font-bold transition-colors focus:border-black focus:outline-none dark:border-white/20 dark:focus:border-white"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                {loading ? (
                  <span>Creating account...</span>
                ) : (
                  <span>
                    Create Account <ArrowRight size={14} className="ml-1 inline" />
                  </span>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-[10px] font-black uppercase tracking-wider opacity-50 dark:bg-black">
                  Or
                </span>
              </div>
            </div>

            <p className="text-center text-sm font-bold">
              Already have an account?{' '}
              <Link href="/signin" className="text-purple-600 underline dark:text-purple-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
