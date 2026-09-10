import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/utils/formatters';
import { Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: '1',
      title: 'Provider Application',
      description: 'David Chen submitted a proposal ($450) for React Refactoring.',
      time: '2026-09-10T15:20:00Z',
    },
    {
      id: '2',
      title: 'Status Update',
      description: 'Alex Rivera updated PAX Wardrobe Assembly status to In Progress.',
      time: '2026-09-09T14:20:00Z',
    },
    {
      id: '3',
      title: 'Task Created',
      description: 'You posted "Modern Brand Identity & Vector Logo Design".',
      time: '2026-09-10T11:00:00Z',
    },
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900">
          <Activity className="w-4 h-4 text-sky-600" />
          Recent Marketplace Activity
        </CardTitle>
        <Link
          to="/customer/tasks"
          className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-0.5"
        >
          View all <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="space-y-4 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-3 relative pl-6">
              <span className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-sky-600 ring-4 ring-white" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <span className="text-slate-400 font-medium">{formatRelativeTime(item.time)}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
