import React from 'react';
import { Task } from '@/types';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { ClipboardList, Clock, CheckCircle2, DollarSign } from 'lucide-react';

interface CustomerStatsProps {
  tasks: Task[];
}

export const CustomerStats: React.FC<CustomerStatsProps> = ({ tasks }) => {
  const total = tasks.length;
  const active = tasks.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const totalSpent = tasks
    .filter((t) => t.status === 'COMPLETED' || t.status === 'IN_PROGRESS')
    .reduce((sum, t) => sum + t.budget, 0);

  const stats = [
    {
      title: 'Total Tasks',
      value: total,
      icon: ClipboardList,
      color: 'text-sky-600 bg-sky-50',
    },
    {
      title: 'Active Tasks',
      value: active,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Completed Tasks',
      value: completed,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Total Spent',
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="p-4 border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">{item.title}</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {item.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
