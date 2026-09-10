import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/avatar';
import { User, LogOut, Settings, ChevronDown, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '@/app/config/constants';
import { UserRole } from '@/types';

export const UserMenu: React.FC = () => {
  const { user, role, signOut, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setIsOpen(false);
    if (newRole === ROLES.CUSTOMER) {
      navigate('/customer/dashboard');
    }
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
      >
        <Avatar src={user.avatarUrl} fallback={user.name} size="sm" />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-900 leading-tight">
            {user.name}
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-sky-600 uppercase">
            {role}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-2.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-semibold">
              <UserCheck className="w-3 h-3" /> Active Role: {role}
            </div>
          </div>

          {/* Role Switcher Demo Control */}
          <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70 rounded-lg my-1">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Role Switcher (Demo)
            </p>
            <div className="grid grid-cols-3 gap-1">
              {(['CUSTOMER', 'PROVIDER', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`text-[10px] font-bold py-1 px-1 rounded transition-colors ${
                    role === r
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="py-1">
            <Link
              to="/customer/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <User className="w-4 h-4 text-slate-500" />
              Customer Profile
            </Link>
            <Link
              to="/customer/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              Account Settings
            </Link>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
