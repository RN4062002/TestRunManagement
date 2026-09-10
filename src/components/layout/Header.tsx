import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, PlusCircle, Menu, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserMenu } from './UserMenu';
import { mockNotifications } from '@/services/mockData';

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 md:px-6 backdrop-blur-md">
      {/* Mobile Toggle & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/customer/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-sky-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            T
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight hidden sm:inline">
            Task<span className="text-sky-600">Hub</span>
          </span>
        </Link>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search tasks, categories, or providers..."
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
          />
        </div>
      </div>

      {/* Actions & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/customer/tasks/new" className="hidden sm:block">
          <Button size="sm" className="gap-1.5 bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
            <PlusCircle className="w-4 h-4" />
            <span>Post a Task</span>
          </Button>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-sky-600 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-sky-600 hover:underline font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.isRead ? 'bg-white text-slate-600' : 'bg-sky-50/70 text-slate-900 font-medium'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">{n.title}</p>
                    <p className="text-slate-500 mt-0.5">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};
