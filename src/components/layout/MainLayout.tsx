import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileNav } from './MobileNav';
import { Breadcrumbs } from './Breadcrumbs';

export const MainLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <DesktopSidebar />

        <MobileNav
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full overflow-hidden">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
