import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  User,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/app/config/constants';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { user, role } = useAuth();

  if (!isOpen) return null;

  const navItems = [
    { name: 'Dashboard', path: ROUTES.CUSTOMER.DASHBOARD, icon: LayoutDashboard },
    { name: 'My Tasks', path: ROUTES.CUSTOMER.TASKS, icon: ClipboardList },
    { name: 'Create Task', path: ROUTES.CUSTOMER.NEW_TASK, icon: PlusCircle },
    { name: 'Customer Profile', path: ROUTES.CUSTOMER.PROFILE, icon: User },
    { name: 'Account Settings', path: ROUTES.CUSTOMER.SETTINGS, icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white p-6 shadow-2xl animate-in slide-in-from-left duration-200 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="font-extrabold text-slate-900 text-lg">TaskHub</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User preview */}
        {user && (
          <div className="my-4 p-3 bg-slate-50 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-sky-600 font-semibold uppercase">{role} Role</p>
            </div>
          </div>
        )}

        {/* Links */}
        <nav className="space-y-1 mt-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
