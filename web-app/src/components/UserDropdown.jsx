'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Briefcase, Calendar, Settings, LogOut } from 'lucide-react';

export default function UserDropdown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-black text-[10px] font-black uppercase tracking-wider dark:border-white"
      >
        {getInitials(user.name, user.email)}
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content right-0 z-50 mt-2 w-56 border-2 border-black bg-white p-2 shadow-lg dark:border-white dark:bg-black"
      >
        {/* User Info Header */}
        <li className="menu-title px-3 py-2">
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-wider">
              {user.name || 'User'}
            </p>
            <p className="text-[10px] opacity-60">{user.email}</p>
          </div>
        </li>

        <div className="my-1 border-t border-black/10 dark:border-white/10" />

        <li>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/recruitment" className="flex items-center gap-3 px-3 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10">
            <Briefcase size={16} />
            Recruitment
          </Link>
        </li>
        <li>
          <Link href="/dashboard/scheduling" className="flex items-center gap-3 px-3 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10">
            <Calendar size={16} />
            Scheduling
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10">
            <Settings size={16} />
            Settings
          </Link>
        </li>

        <div className="my-1 border-t border-black/10 dark:border-white/10" />

        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <LogOut size={16} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
