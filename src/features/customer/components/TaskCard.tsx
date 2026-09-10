import React from 'react';
import { Task } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { MapPin, Calendar, Users, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface TaskCardProps {
  task: Task;
  onSelect?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect }) => {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow group border-slate-200">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            {task.categoryName}
          </span>
          <StatusBadge status={task.status} />
        </div>
        <CardTitle className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
          {task.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {task.description}
        </p>

        {/* Assigned Provider preview if matched */}
        {task.providerName && (
          <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Avatar src={task.providerAvatar} fallback={task.providerName} size="sm" />
              <div>
                <p className="font-bold text-slate-900">{task.providerName}</p>
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Assigned Provider
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Meta details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 font-medium py-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{task.isRemote ? 'Remote Work' : task.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Due {formatDate(task.dueDate)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Budget</span>
          <span className="text-lg font-extrabold text-slate-900">
            {formatCurrency(task.budget)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.applicantsCount > 0 && (
            <span className="text-xs text-sky-600 font-semibold flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {task.applicantsCount} proposals
            </span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSelect?.(task)}
            className="gap-1 border-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
