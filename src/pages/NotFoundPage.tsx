import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md mb-6">
        The requested route does not exist or has been moved.
      </p>
      <Link to="/customer/dashboard">
        <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
          <ArrowLeft className="w-4 h-4" /> Return to Customer Dashboard
        </Button>
      </Link>
    </div>
  );
};
