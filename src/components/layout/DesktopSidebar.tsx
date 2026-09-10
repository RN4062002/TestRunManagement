import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  User,
  Settings,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/app/config/constants';

export const DesktopSidebar: React.FC = () => {
  const navItems = [
    {
      name: 'Dashboard',
      path: ROUTES.CUSTOMER.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'My Tasks',
      path: ROUTES.CUSTOMER.TASKS,
      icon: ClipboardList,
      badge: '5',
    },
    {
      name: 'Create Task',
      path: ROUTES.CUSTOMER.NEW_TASK,
      icon: PlusCircle,
      highlight: true,
    },
    {
      name: 'Customer Profile',
      path: ROUTES.CUSTOMER.PROFILE,
      icon: User,
    },
    {
      name: 'Account Settings',
      path: ROUTES.CUSTOMER.SETTINGS,
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
        Customer Navigation
      </div>

      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group',
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : item.highlight
                    ? 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-transform group-hover:scale-110',
                        isActive
                          ? 'text-white'
                          : item.highlight
                          ? 'text-sky-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full font-bold',
                        isActive
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <ChevronRight className="w-4 h-4 text-sky-500" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Promo Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg mt-auto">
        <div className="flex items-center gap-2 text-amber-400 mb-1.5">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-extrabold uppercase tracking-wide">
            Need Help Fast?
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Top-rated service providers are online and ready to accept your task.
        </p>
        <NavLink
          to={ROUTES.CUSTOMER.NEW_TASK}
          className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-600 py-1.5 text-xs font-bold text-white transition-colors"
        >
          Post Task Now
        </NavLink>
      </div>
    </aside>
  );
};
